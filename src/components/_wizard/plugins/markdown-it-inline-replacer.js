import classNames from 'classnames'
import formatVaritext, { getVaritextValue } from './varitextUtilities'

/*
   New format:
   !!!replace({ "form": "FORM_ID", "key": "VARITEXT_KEY", "format": "optional", "repeatArgs": "" })

    form: The name of the form as defined in the question repository. This allows us to group multiple VARITEXT on a single form.
    key: The name of the VARITEXT KEY, also in the question repository. Should be all CAPS by convention.
    FormatStyle: One of the below values to format the result as specified. Formatting currency with a dollar sign and commas is a common pattern. Available FormatStyles include:
    currency
    decimal
    integer
    percent
    uppercase
    array
    repeatable

    Additional Notes:
    - form and key properties are required in every varitext,
    - format is always optional,
      - use array format if you want the user to supply multiple answers and list them separated by commas.
      - use repeatable for a replacer within a !!!repeat(KEY) section so we can iterate over the answers.
    - repeatArgs is required if format is repeatable.
*/

// Regex to start with !!!replace(object)
var REPLACE_REGEX = new RegExp(/^!{3}\s*replace\s*\((.+?)\)/)

const inlineReplacer_plugin = (md, options) => {
  let replaceRegEx = REPLACE_REGEX

  if (options) {
    if (typeof options !== 'string') {
      replaceRegEx = options.replaceRegEx || replaceRegEx
    }
  }

  function _inlineReplace(state, silent) {
    let { varitext } = state.md.options

    let src = state.src.slice(state.pos, state.posMax)
    let reResults = replaceRegEx.exec(src)

    // No results, return false
    if (reResults == null) return false
    // If silent mode we can return now
    if (silent) return true

    // The 1st parameterized result defines this replacer in json
    let params = reResults[1]
    let json
    try {
      json = JSON.parse(params)
    } catch (error) {
      console.log('Attempt to parse for json: ', params)
      return false
    }

    // We only want to display VARITEXT_KEY
    let { form, key, format, repeatArgs } = json

    // we may format this below (currency, decimal, integer, uppercase, etc...)
    let varitextValue = getVaritextValue(varitext, key)
    varitextValue = formatVaritext(varitextValue, format, repeatArgs)

    let token = state.push('replacer_open', '', 1)
    token.markup = '!!!replace('

    token.meta = {
      formId: form,
      varitextKey: key,
      varitextValue,
      userReplaced: varitextValue ? true : false,
    }

    /* Send this to tokenize so it gets processed, allowing users to add Markdown and VARITEXT codes in their responses. */
    const oSrc = state.src,
      oPos = state.pos,
      oPosMax = state.posMax,
      oLevel = state.level++
    state.src = varitextValue || key
    state.pos = 0 // our new src starts here
    state.posMax = state.src.length

    // Now run rules against this content, creating tokens as necessary.
    state.md.inline.tokenize(state)

    // restore state upon completion
    state.src = oSrc
    state.posMax = oPosMax
    state.level = oLevel
    state.pos = oPos + reResults[0].length // move past our work

    token = state.push('replacer_close', '', -1)
    token.markup = ')'

    return true
  }

  md.inline.ruler.push('inlineReplace', _inlineReplace)

  md.renderer.rules['replacer_open'] = function(
    tokens,
    idx,
    options /*env, renderer*/
  ) {
    const token = tokens[idx]
    return handleReplacerOpen(token.meta, options)
  }

  /* Available parameters (in order): tokens, idx, options, env, renderer */
  md.renderer.rules['replacer_close'] = function() {
    return '</span>'
  }
}

function handleReplacerOpen(meta, options) {
  let { editMode } = options
  let { formId, varitextKey, userReplaced } = meta

  const replacerClass = classNames({
    userAnswered: userReplaced,
    userNotAnswered: !userReplaced,
    replacerEditMode: editMode,
    replacerPreview: !editMode,
  })

  const promptClass = classNames({
    far: true,
    userNotAnsweredPrompt: !userReplaced,
    'fa-edit': !userReplaced,
    userAnsweredPrompt: userReplaced,
    'fa-check-square': userReplaced,
  })

  const id = formId ? `${formId}:${varitextKey}` : `${varitextKey}`
  const promptIndicator = `<i data-replacer=${id} class='${promptClass}' title=${id}></i>&nbsp;`
  const replacerTag = `<span data-replacer=${id} title=${varitextKey} class='${replacerClass}'>`

  if (editMode === true) {
    return promptIndicator + replacerTag
  } else {
    return replacerTag
  }
}

export default inlineReplacer_plugin

import classNames from 'classnames'
import { getVaritextValue } from './varitextUtilities'

/*
   New format:
   !!!keep({ "form": "FORM_ID", "key": "VARITEXT_KEY", "condition": true, "enabled": true, "content": "stuff to keep or remove" })

    form: The name of the form as defined in the question repository.
    key: The name of the VARITEXT KEY, also in the question repository. Should be all CAPS by convention.
    condition: The value to compare for equality. If equal, this content is kept, otherwise it is removed.
      - Can be true, false, a number, or a string (such as "LONWORKS")
    enabled: Defaults to true. If false, the user cannot edit this question.
    content: The text content to keep or remove.
    Additional Notes:
    - form is required if enabled is true
    - key is always required
    - enabled is optional, defaults to true
    - condition is compared to VARITEXT value for equality.
      - Content kept if equal.
      - Defaults to true.
*/

/*
  Regex to start with !!!keep(json object)
  - Non-greedy to ensure that a closing parenthesis in content doesn't match prematurely
  - Must start with !!!keep (^!{3}keep)
  - Followed by details wrapped in parenthesis \((.+)\)
  - The (.+) defines a parameterized substring match that will be converted to json.
    - these define our remover properties.
*/
var REMOVER_REGEX = new RegExp(/^!{3}keep\((.+)\)/)

const inlineRemover_plugin = (md, options) => {
  let removerRegEx = REMOVER_REGEX

  if (options) {
    if (typeof options !== 'string') {
      removerRegEx = options.removerRegEx || removerRegEx
    }
  }

  function _inlineRemove(state, silent) {
    let { varitext } = state.md.options

    let src = state.src.slice(state.pos, state.posMax)
    let reResults = removerRegEx.exec(src)

    // No results, return false
    if (reResults == null) return false
    // If silent mode we can return now
    if (silent) return true

    // The 1st parameterized result defines this remover in json
    let params = reResults[1]
    let json
    try {
      json = JSON.parse(params)
    } catch (error) {
      console.log('Remover: attempted to parse for json: ', params)
      return false
    }

    // We only want to display VARITEXT_KEY
    let { form = '', key, enabled = true, content, condition = true } = json

    let varitextValue = getVaritextValue(varitext, key)

    const { editMode } = state.md.options

    if (editMode || (!editMode && varitextValue)) {
      let token = state.push('remover_inline_open', 'span', 1)
      token.markup = '!!!keep('
      token.content = ''

      let meta = {
        formId: form,
        varitextKey: key,
        varitextValue,
        remove: varitextValue !== condition && varitextValue !== null,
        defaultValue: false,
        userEnabled: enabled,
        userAnswered: varitextValue !== null && varitextValue !== undefined,
      }
      token.meta = meta

      /* Process the remover content to allow other inline, nested syntaxes (like replacers).
         Use updated state for only this content (pos, posMax, and level) and restore upon completion.
      */

      // Save current state
      let oPos = state.pos,
        oPosMax = state.posMax,
        oLevel = state.level,
        oSrc = state.src.slice()

      // update state to handle nested content
      state.src = content
      state.pos = 0
      state.posMax = content.length
      state.level++

      // Now run rules against this content, creating tokens as necessary.
      state.md.inline.tokenize(state)

      // restore state upon completion
      state.src = oSrc
      state.pos = oPos
      state.posMax = oPosMax
      state.level = oLevel

      // close-out tag for the remover
      token = state.push('remover_inline_close', 'span', -1)
      token.markup = ')'
    }

    // Move past our remover so processing can continue
    state.pos += reResults[0].length
    return true
  }

  md.inline.ruler.push('inlineRemove2', _inlineRemove)

  md.renderer.rules['remover_inline_open'] = function(
    tokens,
    idx,
    options /*env, renderer*/
  ) {
    const token = tokens[idx]
    return handleInlineRemoverOpen(token.meta, options)
  }

  md.renderer.rules[
    'remover_inline_close'
  ] = function(/*tokens, idx, options, env, renderer*/) {
    return '</remover>'
  }
}

function handleInlineRemoverOpen(meta, options) {
  let { editMode } = options
  let {
    formId,
    varitextKey,
    varitextValue,
    remove,
    userAnswered,
    userEnabled,
  } = meta

  const promptClass = classNames({
    // notUserEnabled: !userEnabled,
    userAnswered: userEnabled && userAnswered,
    userNotAnswered: userEnabled && !userAnswered,
  })

  // only used if in edit mode
  const promptIconClass = classNames({
    fas: true,
    notUserEnabledPrompt: !userEnabled,
    'fa-asterisk': !userEnabled,
    userAnsweredPrompt: userEnabled && userAnswered,
    'fa-thumbtack': userEnabled && userAnswered && !remove,
    'fa-trash-alt': userEnabled && userAnswered && remove,
    userNotAnsweredPrompt: userEnabled && !userAnswered,
    'fa-question-circle': userEnabled && !userAnswered,
  })

  let removerClass = classNames({
    removedPreview: remove && !editMode,
    removedEditMode: remove && editMode,
    removerEditMode: !remove && editMode,
    removerPreview: !remove && !editMode,
    userAnswered: userAnswered,
    userNotAnswered: !userAnswered,
  })

  let explanationTitle = `This section is kept if 'true' is selected for ${varitextKey}. \n\n`
  if (userEnabled) {
    explanationTitle += `'${varitextValue}' is currently selected.`
  } else if (remove) {
    // It's not user enabled and will be removed.
    explanationTitle =
      'This option is not user enabled and will be removed in preview and final versions.'
  } else {
    explanationTitle =
      'This option is not editable. It could be a system setting or project configuration.'
  }

  const id = formId ? `${formId}:${varitextKey}` : `${varitextKey}`

  const promptIndicator = `
      <span class="${promptClass}" title="${explanationTitle}">
        <i data-remover=${id} data-userenabled=${userEnabled} title="${varitextKey}" class="${promptIconClass}"></i>
        <!--
          <span data-remover=${id} class="removerEditMode">
            ${userEnabled ? varitextKey : ''}
          </span>
        -->
      </span>`
  let removerTag = `<remover data-remover=${id} data-userenabled=${userEnabled} title="${explanationTitle}" class="${removerClass}">`

  if (editMode === true) {
    return promptIndicator + removerTag
  } else {
    return removerTag
  }
}

export default inlineRemover_plugin

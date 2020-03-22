import classNames from 'classnames'
import { getVaritextValue } from './varitextUtilities'

/*
  - Does not check for code blocks as it expects it to be disabled.
  This allows us to indent liberally in our markdown.

  Use:

  !!!keepBlock({ "form": "FORM_ID", "key": "VARITEXT_KEY", "condition": true, "enabled": true })
  All the content goes in here. It can have one or more lines.

  Conditional content written between start and end markers. A remover
  block begins with an open marker consisting of exactly 3 exclamation
  points followed by keepBlock, then a JSON object as a parameter.
  The content begins on the next line. The remover block concludes
  with only 3 exclamation points on a line by itself.

   !!!keepBlock({ json-props })
    The content can include multiple paragraphs, replacers, and
    nested remover content.

    You must INDENT nested removers!
      Each nested block must be indended one more than the previous block.
    The outer most block is 0, and each time you include a remover in another
    remover you increase N by 1. This ensures that each block is properly
    identified and closed.

    In this example, this block is indented exactly 1 more than the previous.
   !!!

  condition is optional and defaults to true. It can be a boolean or if
  the option is a choice (like dropdown) then it's comparing
  values enum or enum values if present.

  enabled is optional and defaults to true. Used, for example,
  for content that depends on system configuration or state. A simple
  example is VER to display the template version. This is only
  shown during edit mode. The system knows to remove this
  during preview mode - users don't pick this.
  !!!
*/

/*
  This finds the block on the given line. Different REGEX are used after this
  to find the full block.

  Note that the position within state.src is always after any indent (tShift).

  - Must start with 3 exclamation points followed by keepBlock (^!{3,}keepBlock)
  - Followed by details wrapped in parenthesis \((.+?)\)
  - The (.+?) defines a non-greedy parameterized substring match that will be converted to json.
    - Once converted, this defines our remover properties.
  - Content, because it can be multiline, follows starting on the next line.
  - The block is closed with 3!, no indents.
*/
const BLOCK_BEGIN_REGEX = new RegExp(/^!{3}keepBlock\((.+?)\)/)

// This REGEX finds the full block, expecting closing marker to be indented equal to nested level.
const FULLBLOCK_REGEX_STR = `(^!{3}keepBlock([^]*?)$\n[^]*?)^[ ]{NEST_LEVEL}!{3}$`

const blockRemover = (md, options) => {
  let beginBlock_RE = BLOCK_BEGIN_REGEX

  function remover_def(state, startLine, endLine, silent) {
    let nextLine, token
    let pos = state.bMarks[startLine] + state.tShift[startLine]
    let max = state.eMarks[startLine]

    // Does this start with our marker syntax BLOCK_BEGIN_REGEX?
    let src = state.src.slice(pos, max)
    let reResults = beginBlock_RE.exec(src)

    // No results, return false
    if (reResults == null) return false

    // If silent mode we can return now
    if (silent) return true

    // Our substring group is everything within the parenthesis
    const params = reResults[1]

    let json
    try {
      json = JSON.parse(params)
    } catch (error) {
      console.log('Remover: attempted to parse for json: ', params)
      return false
    }

    let {
      form: formId = '',
      key: varitextKey = '',
      enabled: userEnabled = true,
      condition: keepCondition = true,
    } = json

    // Now REGEX from this point to find *our* closing marker, not just any closing marker.
    let nestLevel = options.nestLevel ? options.nestLevel : 0
    let block_re_str = FULLBLOCK_REGEX_STR.replace('NEST_LEVEL', nestLevel)
    let fullBlock_RE = new RegExp(block_re_str, 'm')

    // Expand our src to be from here to the end.
    src = state.src.slice(pos)

    // Now search for the complete block
    let blockMatch = fullBlock_RE.exec(src)

    if (!blockMatch) return false

    /*
      Move pos to the end of the first sub-string match (before the closing !!!)
      so we can tell our parser to process that separately.
    */
    try {
      pos += blockMatch[1].length
    } catch {
      console.log(
        `-->ERROR<-- searching for ${fullBlock_RE.source} in\n ${src}`
      )
      return false
    }

    nextLine = startLine + 1

    // We know the pos (index) but need to figure out what line that is to tokenize.
    while (state.bMarks[nextLine] < pos && nextLine <= endLine) {
      nextLine++
    }

    // Only add tokens if preview || remove === false
    let { varitext } = state.md.options
    let { editMode } = state.md.options

    const varitextValue = getVaritextValue(varitext, varitextKey)
    const shouldBeRemoved = varitextValue !== keepCondition

    // Show this remover if we're in edit mode or if we shouldn't be removed
    if (editMode === true || !shouldBeRemoved) {
      // Hold on to some state information for this block, restore after we handle it.
      // this will prevent lazy continuations from ever going past our end marker
      const oldLineMax = state.lineMax,
        oldParentType = state.parentType
      state.lineMax = nextLine
      state.parentType = 'remover_block'

      // Push open token, tokenized content, then push close token
      token = state.push('remover_open', '', state.level++)
      token.meta = {
        formId,
        varitextKey,
        varitextValue,
        keepCondition,
        shouldBeRemoved,
        userEnabled: userEnabled,
        userAnswered: varitextValue != null,
        nestLevel: options.nestLevel++,
      }

      state.md.block.tokenize(state, startLine + 1, nextLine, true)

      token = state.push('remover_close', '', --state.level)

      // Return state so it can continue where we left off.
      state.parentType = oldParentType
      state.lineMax = oldLineMax

      // Nesting level of this remover.
      options.nestLevel--
    }

    // Tell parser where to continue from end of our block
    state.line = nextLine + 1

    return true
  }

  md.block.ruler.before('table', 'remover_block', remover_def)

  md.renderer.rules['remover_open'] = function(
    tokens,
    idx,
    options /* env, renderer*/
  ) {
    const token = tokens[idx]
    return handleRemoverOpen(token.meta, options)
  }

  md.renderer.rules[
    'remover_close'
  ] = function(/*tokens, idx, options, env, renderer*/) {
    // Reminder: this must match the opening tags
    return '</div>'
  }

  function handleRemoverOpen(meta, options) {
    let { editMode } = options
    let {
      formId,
      varitextKey,
      varitextValue,
      keepCondition,
      shouldBeRemoved,
      userEnabled,
      userAnswered,
      nestLevel,
    } = meta

    // This applies to the remover body, not the remover indicator
    let removerClass = classNames({
      [`removedEditMode${nestLevel}`]: shouldBeRemoved,
      [`removerEditMode${nestLevel}`]: !shouldBeRemoved && editMode,
      removerPreview: !shouldBeRemoved && !editMode,
      userNotAnswered: !userAnswered,
      userAnswered: userAnswered && editMode,
    })

    // This class applies to the remover indicator, which only appears in a edit mode
    const promptClass = classNames({
      notUserEnabled: !userEnabled,
      userAnswered: userEnabled && userAnswered,
      userNotAnswered: userEnabled && !userAnswered,
    })

    const promptIconClass = classNames({
      fas: true,
      notUserEnabledPrompt: !userEnabled,
      'fa-asterisk': !userEnabled,
      userAnsweredPrompt: userEnabled && userAnswered,
      'fa-thumbtack': userEnabled && userAnswered && !shouldBeRemoved,
      'fa-trash-alt': userEnabled && userAnswered && shouldBeRemoved,
      userNotAnsweredPrompt: userEnabled && !userAnswered,
      'fa-question-circle': userEnabled && !userAnswered,
    })

    let explanationTitle = `This section is kept if '${keepCondition}' is selected for ${varitextKey}. \n\n`
    if (userEnabled) {
      explanationTitle +=
        varitextValue === null || undefined
          ? `No selection has been made yet.`
          : `'${varitextValue}' is currently selected.`
    } else {
      if (!keepCondition) {
        explanationTitle =
          'This option is not user enabled and will be removed in preview and final versions.'
      } else {
        explanationTitle += 'This option is not user enabled.'
      }
    }
    const id = formId ? `${formId}:${varitextKey}` : `${varitextKey}`

    const promptIndicator = `
      <span class="${promptClass}" title="${explanationTitle}">
        <i data-remover=${id} data-userenabled=${userEnabled} title="${varitextKey}" class="${promptIconClass}"></i>
        <span data-remover=${id} class="removerEditMode">${varitextKey}</span>
      </span>`

    // The opening tag here and the closing tag in remover_close rule *must* match!
    let removerTag = `<div data-remover=${id} title="${explanationTitle}" class="${removerClass}">`

    if (editMode === true) {
      return promptIndicator + removerTag
    } else {
      return removerTag
    }
  }
}

blockRemover.defaults = {
  nestLevel: 0,
}

export default blockRemover

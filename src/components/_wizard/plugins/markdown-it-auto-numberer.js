/* code originally from block\fences.js and lib\renderer.js:fence
  use as:
  $$L where 'L' is the level, i.e. 1. is level 1, 1.1 is level 2.
  Start with $$1, which starts at 1.
  Then $$2 increments to 1.1, and another $$2 increments to 1.2
  Following that with $$1 will increment the Section to 2, giving 2.
  Then $$2 increments to 2.1, and another $$2 increments to 2.2

  Accepts $$=X to force numbering to start at specific level and number.
  For example, $$=3.1 will start numbering at 3.1.
*/

const autoNumber = (md, options) => {
  options = Object.assign({}, autoNumber.defaults, options)

  md.inline.ruler.push('autoNumber', function autoNumber(state) {
    let content,
      start = state.pos
    const autoNumber = options.autoNumber,
      autoNumberRegEx = options.autoNumberRegEx,
      forceRegEx = options.forceRegEx

    /* Test if we have a match
       We need to be global so we get the lastIndex below. Should be greater than start.
       We need "new" so index is reset since search string changes too.
    */
    let fregex = new RegExp(forceRegEx, 'g')
    let regex = new RegExp(autoNumberRegEx, 'g')

    const found = regex.test(state.src)
    const forceFound = fregex.test(state.src)

    if (!found && !forceFound) return false

    // Find end of the auto-number match
    let endAutoNumberingIndex = -1
    if (found) {
      endAutoNumberingIndex = regex.lastIndex // likely 3 from start, unlikely 4 ($$1 vs $$11)
    } else if (forceFound) {
      endAutoNumberingIndex = fregex.lastIndex
    }

    // Return if we don't find the end - nothing to number
    if (endAutoNumberingIndex <= start) return false

    /*
      If it's going to be removed we don't want to number it.
      Just skip ahead of this text.
    */
    let toBeRemoved = state.tokens.some(function(token) {
      return token.meta !== null && token.meta.remove === true
    })
    if (toBeRemoved) {
      // just skip ahead of this content
      state.pos = endAutoNumberingIndex
      return true
    }

    if (forceFound) {
      const newNumber = getForcedAutoNumber(
        state.src.slice(start + 3, endAutoNumberingIndex)
      )

      // Remember, autoNumber is a reference to options.autoNumber, don't reassign.
      autoNumber.splice(0, autoNumber.length, ...newNumber)
    } else {
      const newNumber = getAutoNumber(
        state.src.slice(start + 2, endAutoNumberingIndex),
        autoNumber
      )

      // Remember, autoNumber is a reference to options.autoNumber, don't reassign.
      autoNumber.splice(0, autoNumber.length, ...newNumber)
    }

    content = autoNumber.join('.') + options.autoNumberFormat
    // Add this content as a text token to maintain order.
    // Parsing causes text to get out of order if not first on line.
    let token = state.push('text', '', 0)
    token.content = content
    // above preferred over this
    // state.md.inline.parse(content, state.md, state.env, state.tokens)

    state.pos = endAutoNumberingIndex
    return true
  })
}

function getForcedAutoNumber(forceNumberString) {
  let newNumber = []
  let tempArray = forceNumberString.split('.')
  tempArray.forEach(x => {
    newNumber.push(Number(x))
  })
  return newNumber
}

function getAutoNumber(autoNumberString, autoNumberValue) {
  let autoNumber = autoNumberValue.slice(0)

  // Regex match tells us that 3rd character will be a number, maybe more.
  // This is the number of levels we should display
  let numLevels = Number(autoNumberString)

  // ensure we found at least 1 level of autonumbering
  if (numLevels <= 0) return false

  let numLevelsCurrent = autoNumber.length

  /*
    Should only ever increase format levels by 1, e.g. 3. -> 3.1, never
    straight 3. -> 3.1.1.
    But it's very possible to decrease level by 1 or more,
    e.g. 3.1.5. => 4, with no 3.2 between them.

    Desired endstate is numLevels == numLevelsCurrent
  */
  if (numLevels === numLevelsCurrent) {
    // If levels are the same then we need to increment current level
    autoNumber.push(autoNumber.pop() + 1)
  } else if (numLevels > numLevelsCurrent) {
    // should never realistically increase levels by more than 1
    autoNumber.push(1)
    numLevelsCurrent = autoNumber.length
  } else if (numLevels < numLevelsCurrent) {
    while (numLevels < numLevelsCurrent) {
      // go up a level
      autoNumber.pop()
      // increment next higher
      autoNumber.push(autoNumber.pop() + 1)
      numLevelsCurrent = autoNumber.length
    }
  }

  return autoNumber
}

autoNumber.defaults = {
  autoNumber: [0],
  autoNumberFormat: '. ',
}

export default autoNumber

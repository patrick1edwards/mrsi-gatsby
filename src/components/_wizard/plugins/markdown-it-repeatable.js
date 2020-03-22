import { getVaritextValue } from './varitextUtilities'

/*
  Look for
  !!!repeat(VARITEXTKEY)
  Followed by one or more lines of text,
  which most likely contains a replacer.
  !!!
  Parenthesized substring matches:
    1. VARITEXTKEY
    2. The body to repeat
*/
var REPEAT_RE = new RegExp(/!{3}\s*repeat\s*\((.+?)\s*\)\n*([^]*?)^!{3}/, 'mg')

export default function repeat_plugin(md, options) {
  let repeatRe = REPEAT_RE

  if (options) {
    if (typeof options !== 'string') {
      repeatRe = options.repeatRe || repeatRe
    }
  }

  function _repeatedContent(src, varitext) {
    let reResults,
      newSrc = src.slice()

    while ((reResults = repeatRe.exec(newSrc))) {
      const key = reResults[1] // 1st parenthesized substring match
      const body = reResults[2] // 2nd parenthesized substring match
      let varitextValue = getVaritextValue(varitext, key)

      if (Array.isArray(varitextValue)) {
        const nTimes = varitextValue.length
        let repeatedContent = ''

        /* Copy of the content within the repeat section, N times.
           If contains the VARITEXT Key specified, we also "crudely" replace some properties
           so we have the right index of the array.
           Replace the KEY name with the index to use, so we end up with
           "index, property" as the argument to the replacer.
        */
        for (let i = 0; i < nTimes; i++) {
          let indexedBody = body.slice()
          let keySearch = key + '[.]'
          let keyRegex = new RegExp(keySearch, 'g')
          indexedBody = indexedBody.replace(keyRegex, `${i}, `)
          repeatedContent += indexedBody
        }

        newSrc =
          newSrc.slice(0, reResults.index) +
          repeatedContent +
          newSrc.slice(reResults.index + reResults[0].length, newSrc.length)
      } else {
        // Just return the repeated section 1 time so users can see and click on it.
        /*
        TODO: Add a new TAG type that could indicate this is an Array. Maybe a plus sign appears.
        If supported, it should appear above as well.
      */
        newSrc =
          newSrc.slice(0, reResults.index) +
          body +
          newSrc.slice(reResults.index + reResults[0].length, newSrc.length)
      }
    }

    return newSrc
  }

  function _repeatContent(state) {
    let { varitext } = state.md.options
    state.src = _repeatedContent(state.src, varitext)
  }

  md.core.ruler.before('normalize', 'repeat', _repeatContent)
}

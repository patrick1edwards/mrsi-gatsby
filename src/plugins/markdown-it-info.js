/*
  Usage:
  !!!info
    This message is displayed to the user only in edit mode.
    It's useful to convey additional instructions to the user for something that follows.
    Editors can use in cases where it's more appropriate than on the form.
  !!!
*/

var INFO_RE = new RegExp(/!{3}\s*info\s*\n+([^]+?)\n+^!{3}/, 'mg')

const infoBlock_plugin = (md, options) => {
  let infoRe = INFO_RE

  if (options) {
    if (typeof options !== 'string') {
      infoRe = options.infoRe || infoRe
    }
  }

  function infoBlock_def(src, editMode) {
    let reResults,
      newSrc = src.slice()

    while ((reResults = infoRe.exec(newSrc))) {
      // Show this information block if we're in edit mode
      if (editMode === true) {
        const replacedSrc =
          '<div class="use-bootstrap"><div class="alert alert-info">' +
          '<span class="glyphicon glyphicon-info-sign"  aria-hidden="true">&nbsp;</span>' +
          reResults[1] +
          '</div></div>'
        newSrc =
          newSrc.slice(0, reResults.index) +
          replacedSrc +
          newSrc.slice(reResults.index + reResults[0].length, newSrc.length)
      } else {
        // otherwise, cut out the whole block
        newSrc =
          newSrc.slice(0, reResults.index) +
          newSrc.slice(reResults.index + reResults[0].length, newSrc.length)
      }
    }

    return newSrc
  }

  function _replaceInfoBlocks(state) {
    let { editMode } = state.md.options
    state.src = infoBlock_def(state.src, editMode)
  }

  md.core.ruler.before('normalize', 'infoBlock', _replaceInfoBlocks)
}

export default infoBlock_plugin

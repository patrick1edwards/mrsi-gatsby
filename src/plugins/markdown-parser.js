import MarkdownIt from 'markdown-it'
import blockRemover from './markdown-it-block-remover'
import autoNumber from './markdown-it-auto-numberer'
import inlineRemover from './markdown-it-inline-remover'
import inlineReplacer from './markdown-it-inline-replacer'
import anchor from 'markdown-it-anchor'
import tocPlugin from 'markdown-it-toc-done-right'
import centertext_plugin from 'markdown-it-center-text'
import repeat_plugin from './markdown-it-repeatable'
import infoBlock_plugin from './markdown-it-info'
import markdownItAttrs from 'markdown-it-attrs'

const defaultOptions = {
  // default values, should not change during life of the application
  html: true,
  breaks: true,
  xhtmlOut: true,
  typographer: true,
}

const anchorOpts = {
  level: 1,
  permalink: false,
  permalinkBefore: false,
}

const tocOpts = {
  listType: 'ul',
  linkClass: 'tocLink',
}

const autoNumberOpts = {
  // needed by block-remover and autoNumber
  autoNumberRegEx: /\$\$\d+/, // $$ followed by a number
  autoNumber: [0], // starting point for numbering
  forceRegEx: /\$\$=\d+(\.\d+)*/, // allow editor to force a number starting point
}

const blockRemoverOpts = {
  nestLevel: 0,
  autoNumberRegEx: autoNumberOpts.autoNumberRegEx,
}

class MarkdownParser {
  constructor() {
    this.md = MarkdownIt(defaultOptions)
    this.md
      .disable('code') // alternative 3-tick syntax still available. This allows us to indent content freely.
      .use(repeat_plugin)
      .use(infoBlock_plugin)
      .use(centertext_plugin)
      .use(markdownItAttrs)
      .use(anchor, anchorOpts)
      .use(tocPlugin, tocOpts)
      .use(blockRemover, blockRemoverOpts) // Needs autoNumberRegEx to strip out auto-numbering if content will be removed.
      .use(inlineRemover)
      .use(inlineReplacer)
      .use(autoNumber, autoNumberOpts)
  }

  parse(markdown, varitextValues, editMode) {
    this.md.options.varitext = varitextValues
    this.md.options.editMode = editMode

    let parsedMarkdown = { __html: this.md.render(markdown) }
    return parsedMarkdown
  }
}

const Parser = new MarkdownParser()
export default Parser

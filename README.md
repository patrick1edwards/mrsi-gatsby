# Web Wizard Client

Welcome to the README for the web wizard client. The project intends to replace and consolidate the existing 3 MRSI wizards (Model RFP, Small Projects RFP, and PDRS) and provide a platform that's easily extensible for additional wizards, allowing us to quickly take advantage of other opportunities as they arise. Since starting this project, we've already identified the Support Facility Annex (SFA) for the CRST, and an RFP builder for Customs and Border Patrol facilities as additional opportunities.

The client is built using React and features React Router, Material-UI, markdown-it, and React-jsonschema-form. Additional packages can be found in the package.json file.

The primary user interface for interacting with the user is a document-based component that uses [Markdown](https://daringfireball.net/projects/markdown/) to define templates for all the wizards. The Markdown is parsed by the Markdown-it package using both public and custom-developed plugins. These packages convert the Markdown to HTML, add TOC, and provide handling of our VARITEXT options.

VARITEXT is the term we use to describe the collection of Removers and Replacers that represent the codes within template files. These codes indicate where we need user input to fill in the blanks or to make a decision between two or more options.

In most cases, the presence of VARITEXT indicates a user option in the document. There are a few instances where it doesn't make sense for a user to edit a VARITEXT. For instance, we use the "VER" VARITEXT to display template version information when previewing the document and remove that information for the final documents. Other VARITEXT might be a property of the project and is edited at a higher level of the application, and therefore not editable in the document.

The user interacts with the document in a WYSIWYG interface. When they select a VARITEXT, a dynamically built form allows them to enter new data for the selected item. Upon submitting new data, the document is updated live and the new data is persisted on the server automatically.

The VARITEXT codes in templates must have corresponding values in the VARITEXT catalog. This VARITEXT catalog defines how we prompt the user for an appropriate response.

While previewing the document, users will see an on-screen indicator where they need to make a choice or enter text. The indicator icon and color will change depending on if the user has already answered the question.

In edit mode the fields are highlighted to show content that requires a user response. On-screen indicators are removed in preview modes, except when errors are present. This helps the user identify areas that still need work.

## RFP Wizard Development

### Removers and Replacers for Template Writers

#### Replacers

Replacers are fields within the template where the RFP writer can enter a response. The response is usually simple text entry or for larger sections, rich text. Some questions may ask to pick a choice from a list.

Replacers are identified in the template using the following syntax:

- {REPLACER_ID [ | formatStyle ]}, where:
  - square brackets [ ] indicate optional values. Do not include the brackets in the Varitext definition.
  - formatStyle is for styling content, like currency. If you use this, you must have a default value OR empty value. Again, ensure a vertical pipe character separates the default from the style information.
    - We currently support these formatting styles:
      - currency: adds dollar sign, thousand separators, and 2 decimal places.
      - decimal: plain number formatting, minimum 2 decimal places.
      - integer: plain integer formatting, no decimal places.
      - percent: percent formatting, minimum 2 decimal places.
      - uppercase: converts all text to upper case.
    - Example: { COST_HIGH | currency }, which results in $35,000,000.00

formatStyle currently only supports USD currency, but may support additional locals if requested.

#### Removers

There are two types of removers, depending on how they are used. In some cases the text to remove is within a sentence, while other times the need is to remove entire paragraphs. The first case is considered "inline" removers and the second case is "block" removers.

##### Block Removers

use as:
<pre>
{{{{REMOVER_ID | userEnabled

Conditional content written between remover markers. A remover block begins with an open marker consisting of at least 3 open curly braces followed by a remover identifier in all capitals. The content begins on the next line. The remover block concludes with the same number of closed curly braces on a line by itself.

  {{{REMOVER2_ID
  The content can include multiple paragraphs, replacers, and nested remover content.

  The outermost remover should contain *more* braces in the marker than the nested removers. This ensures that each block is identified and closed properly.
  }}}

  The REMOVER_ID must be at least 1 character. More descriptive is better.

  <em>userEnabled</em> - an option parameter that defaults to true. <em>If anything is specified</em>, then this remover isn't directly user configurable. For example, removers that depend on system configuration or state. A simple example is VER to display the template version. This is only shown during previews. The system knows to remove this during non-preview modes - users don't pick this.

  Another example: Facility type content should already be removed as necessary based on project choices. Users shouldn't have to select each one in the RFP document to remove.
}}}}
</pre>

##### Inline Removers

These are simpler but cannot span multiple lines (must be a single paragraph). To define one, use the double curly-brace syntax. For example:

- {{ REMOVER_ID | TEXT_THAT_MIGHT_BE_REMOVED }}
- {{ BN_HQ | BATTALION HEADQUARTERS | false }}

## Quick Steps

### setup

`yarn install`

### runs static http dev server

`yarn start`

### Create production build

`yarn build`

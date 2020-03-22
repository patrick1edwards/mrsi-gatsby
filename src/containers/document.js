import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Map } from 'immutable'
import Layout from 'components/layout'
import ModalPrompt from 'components/ModalPrompt'
import Papersheet from 'components/Papersheet'
import CONSTANTS from '../constants'
import Parser from '../plugins/markdown-parser'
import {
  getVaritextValuesFromFormData,
  loadFormData,
} from 'plugins/varitextUtilities'
import './document.css'

// custom hook to use local storage - temporary solution for server
const usePersistentMap = localStorageKey => {
  const savedValues = localStorage.getItem(localStorageKey) || '{"VER": false}'
  const [value, setValue] = React.useState(Map(JSON.parse(savedValues)))

  React.useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value))
  }, [localStorageKey, value])

  return [value, setValue]
}

const Document = props => {
  // varitextValues is a key, value pair of varitext key to user response value
  const [varitextValues, setVaritextValues] = usePersistentMap(
    props.match.params.id
  )
  // markdown is the markdown document we display
  const [markdown, setMarkdown] = useState('Loading...')
  // documentContent is our parsed document
  const [documentContent, setDocumentContent] = useState('')
  // questions is a json object of question schema suitable for react-json-schema
  const [questions, setQuestions] = useState({})
  // simple boolean that indicates if we're viewing in edit or preview modes
  const [editMode, setEditMode] = useState(true)
  // simple boolean to show question dialog to the user
  const [show, setShow] = useState(false)
  // the specific schemas and starting values for the current question (when clicked)
  const [promptObject, setPromptObject] = useState({})

  const id = props.match.params.id

  // On mount, load saved project state from the server for this project
  // useEffect(() => {
  //   const fetchVaritextValues = async () => {
  //     const result = await axios('varitext.json')

  //     console.log('Document => got varitext response data ')
  //     const map = varitextValues.merge(...result.data.varitext)
  //     setVaritextValues(map)
  //   }

  //   fetchVaritextValues()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
  /* For now...
     we really do want the above to only fire on mount, otherwise
     it will reload from network each time.
  */

  // On mount, load the markdown (templates) applicable to this project
  useEffect(() => {
    const fetchMarkdown = async () => {
      const result = await (await fetch('/Template_2.md')).text()
      console.log(result)
      // console.log('Document => got template data')
      setMarkdown(result)
    }

    fetchMarkdown()
  }, [id])

  // On mount, load the set of possible questions for this template. UI built from this.
  useEffect(() => {
    const fetchQuestions = async () => {
      const result = await (await fetch('/Questions.json')).json()
      console.log(result)
      setQuestions(result)
    }

    fetchQuestions()
  }, [])

  useEffect(() => {
    /* Handler function when a user clicks on a varitext.
       Determines which varitext was selected and presents the appropriate UI.
    */
    const handleClick = event => {
      const target = event.target
      const replacer = target.dataset.replacer
      const remover = target.dataset.remover
      const userEnabled = target.dataset.userenabled

      let varitextId = replacer || remover

      // Nothing to do if this isn't a varitext
      if (!varitextId) return

      /* Not all varitext are user enabled. For example, VER only displays when
         in edit mode. Nothing for the user to select on the varitext.
      */
      if (userEnabled === 'true' || userEnabled === undefined) {
        console.log('Document => clicked on varitext ', varitextId)

        /*
          Sometimes we group questions under a single form. The element at 0
          is the name of the form in either case. If grouped, element 1
          is the remover's key.
        */
        let varitextParts = varitextId.split(':')
        const formId = varitextParts[0]

        let filteredQuestion = questions[formId]
        if (filteredQuestion) {
          // console.log('  => filteredQuestion is ', filteredQuestion)

          /*
             Load saved values for each VARITEXT on the form, or if
              nothing is saved, use the defaults as defined in the JSON data.

              By our convention, all VARITEXT prompts should be in a properties object.
              Nested objects are allowed so related data (i.e. checkboxes) can be grouped.

              Loaded data is merge of json defined defaults and any saved values.
          */
          const loadedData = loadFormData(
            filteredQuestion.schema.properties,
            filteredQuestion.formData,
            varitextValues
          )

          /* NOTE:
             This causes render which forces parser to do its thing.
             Can we stop render and re-parse as they aren't necessary
             until after the form is submitted?
             Not yet seeing performance issue, so just monitor.
          */
          setPromptObject({
            ...filteredQuestion,
            formData: loadedData,
          })
          setShow(true)
        } else {
          // TODO: Tell the user to notify us.
          // Better yet, just notify us automagically.
          console.log('Oops, I could not find a question for this varitext.')
        }
      } else {
        console.log(`${varitextId} isn't editable by users.`)
      }
    }

    const parsedMarkdown = Parser.parse(markdown, varitextValues, editMode)
    const markup = (
      <div
        id="rfp_preview"
        onClick={handleClick}
        dangerouslySetInnerHTML={parsedMarkdown}
      />
    )
    setDocumentContent(markup)
  }, [markdown, questions, varitextValues, editMode])

  // Handler function that toggles editMode state
  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  // Handler function when user submits values for a varitext
  const handleModalSubmit = ({ formData }, e) => {
    const valueMap = getVaritextValuesFromFormData(formData)
    const newVaritextValues = varitextValues.merge(valueMap)

    // Note: useReducer might be better option to just change this key
    setVaritextValues(newVaritextValues)
    setShow(false)
  }

  // Handler function handles hiding dialog when not submitting
  const handleModalHide = buttonType => {
    // hide the dialog
    setShow(false)
  }

  return (
    <Layout {...props} editMode={editMode} toggleEditMode={toggleEditMode}>
      <div className="mdContainer">
        <ModalPrompt
          show={show}
          onHide={event => handleModalHide(event)}
          onSubmit={handleModalSubmit}
          promptObject={promptObject}
        />

        <Papersheet>{documentContent}</Papersheet>
      </div>
    </Layout>
  )
}

Document.propTypes = {
  match: PropTypes.object,
}

export default Document

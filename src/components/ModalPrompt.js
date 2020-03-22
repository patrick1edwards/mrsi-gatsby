import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import JsonForm from './JsonForm'

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 50000,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
  content: {
    border: '5px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '8px',
    outline: 'none',
    padding: '20px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '95%',
  },
}

Modal.setAppElement('#root')

function ModalPrompt(props) {
  const { promptObject } = props

  function onClose(type) {
    props.onHide(type)
  }

  return (
    <div>
      <Modal
        isOpen={props.show}
        onRequestClose={event => onClose(event)}
        contentLabel="Wizard Form"
        style={customStyles}
        aria={{
          labelledby: 'modal-dialog-title',
          describedby: 'root_description',
        }}
      >
        <div className="use-bootstrap">
          <JsonForm
            question={promptObject}
            onSubmit={props.onSubmit}
            onClose={event => onClose(event)}
          />
        </div>
      </Modal>
    </div>
  )
}

ModalPrompt.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  promptObject: PropTypes.object.isRequired,
}

export default ModalPrompt

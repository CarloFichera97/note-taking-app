import React from "react";
import Modal from "react-modal";

const OpenModal = (props) => {
  return (
    <div>
      <Modal isOpen={props.isOpenModal} className="modal">
        <h2 className="modal__title">Note {props.index + 1}</h2>
        <p>{props.currentNote}</p>
        <li className="modal__body">{props.currentNoteTime}</li>
        <li className="modal__body">
          <strong>Number Of Characters: </strong>
          {props.currentNoteLength}
        </li>
        <button className="button__modal" onClick={props.handleCloseModal}>
          {" "}
          Close Modal
        </button>
      </Modal>
    </div>
  );
};
export default OpenModal;

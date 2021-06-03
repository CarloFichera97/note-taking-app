import React from "react";
import Modal from "react-modal";

const OpenModal = (props) => {
  return (
    <div>
      <Modal isOpen={props.isOpenModal}>
        <h2>Note {props.index + 1}</h2>
        <p>{props.currentNote}</p>
        <li>
          <strong>Date: </strong> {props.currentNoteTime}
        </li>
        <li>
          <strong>Number Of Characters: </strong>
          {props.currentNoteLength}
        </li>
        <button onClick={props.handleCloseModal}> Close Modal</button>
      </Modal>
    </div>
  );
};
export default OpenModal;

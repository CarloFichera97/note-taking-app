import React from "react";
import OpenModal from "./OpenModal";

class Notes extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.handleDeleteNotes}>Remove All</button>
        {this.props.notes.map((i, note) => (
          <div>
            <strong>Note{note + 1}: </strong> {this.props.notes[note]}
            <button onClick={this.props.handleOpenModal}>Visualize Note</button>
            <OpenModal
              isOpenModal={this.props.isOpenModal}
              handleCloseModal={this.props.handleCloseModal}
              currentNote={this.props.notes[note]}
              currentNoteTime={this.props.notesTime[note]}
              currentNoteLength={this.props.notesLength[note]}
              index={note}
            />
            <button
              onClick={(e) =>
                this.props.handleDeleteNote(
                  this.props.notes[note],
                  this.props.notesTime[note],
                  this.props.notesLength[note]
                )
              }
            >
              Remove note
            </button>
            <li>
              <strong>Date: </strong> {this.props.notesTime[note]}
            </li>
            <li>
              <strong>Number Of Characters: </strong>
              {this.props.notesLength[note]}
            </li>
          </div>
        ))}
      </div>
    );
  }
}

export default Notes;

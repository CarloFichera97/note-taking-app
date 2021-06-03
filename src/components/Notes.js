import React from "react";
import OpenModal from "./OpenModal";

class Notes extends React.Component {
  render() {
    return (
      <div>
        <button
          className="button__remove"
          onClick={this.props.handleDeleteNotes}
          disabled={!this.props.notes.length}
        >
          Remove All
        </button>
        <div className="widget__title">
          {this.props.notes.length > 0 ? (
            <p className="widget__title__paragraph">Notes collection</p>
          ) : (
            <p className="widget__title__paragraph">Insert some notes!</p>
          )}
        </div>

        {this.props.notes.map((i, note) => (
          <div>
            <div className="widget__notes">
              <strong>{note + 1}.</strong> {this.props.notes[note]}
            </div>
            <div className="widget__buttons">
              <div className="widget__single_button_visualize">
                <button
                  className="button button--remove_visualize"
                  onClick={this.props.handleOpenModal}
                >
                  Visualize
                </button>
              </div>
              <div className="widget__single_button_remove">
                <button
                  className="button button--remove_visualize"
                  onClick={(e) =>
                    this.props.handleDeleteNote(
                      this.props.notes[note],
                      this.props.notesTime[note],
                      this.props.notesLength[note]
                    )
                  }
                >
                  Remove
                </button>
              </div>
            </div>

            <OpenModal
              isOpenModal={this.props.isOpenModal}
              handleCloseModal={this.props.handleCloseModal}
              currentNote={this.props.notes[note]}
              currentNoteTime={this.props.notesTime[note]}
              currentNoteLength={this.props.notesLength[note]}
              index={note}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default Notes;

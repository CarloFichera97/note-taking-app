import React from "react";
import AddNotes from "./AddNotes";
import Notes from "./Notes";
import Header from "./Header";
import OpenModal from "./OpenModal";

class NoteTakingApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteNotes = this.handleDeleteNotes.bind(this);
    this.handleDeleteNote = this.handleDeleteNote.bind(this);
    this.handleAddNote = this.handleAddNote.bind(this);
    this.capitalizeInput = this.capitalizeInput.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.state = {
      notes: [],
      notesLength: [],
      notesTime: [],
      isOpenModal: undefined,
      currentNote: 0,
      currentNoteTime: 0,
      currentNoteLength: 0,
      index: 0,
    };
  }

  //Stores variables in local storage everytime there is a component update
  componentDidUpdate(prevProps, prevState) {
    if (prevState.notes.length !== this.state.notes.length) {
      const jsonNotes = JSON.stringify(this.state.notes);
      const jsonNotesTime = JSON.stringify(this.state.notesTime);
      const jsonNotesLength = JSON.stringify(this.state.notesLength);
      localStorage.setItem("notes", jsonNotes);
      localStorage.setItem("notes_time", jsonNotesTime);
      localStorage.setItem("notes_length", jsonNotesLength);
    }
  }

  //Fetches in local storage values to display on screen first time the page gets mounted
  componentDidMount(prevProps, prevState) {
    try {
      const jsonNotes = localStorage.getItem("notes");
      const jsonNotesTime = localStorage.getItem("notes_time");
      const jsonNotesLength = localStorage.getItem("notes_length");

      const notes = JSON.parse(jsonNotes);
      const notesLength = JSON.parse(jsonNotesLength);
      const notesTime = JSON.parse(jsonNotesTime);

      if (notes) {
        this.setState(() => ({
          notes: notes,
          notesLength: notesLength,
          notesTime: notesTime,
        }));
      }
    } catch (e) {}
  }

  //Capitalize the function input
  capitalizeInput(input) {
    return input[0].toUpperCase() + input.slice(1);
  }
  handleOpenModal(currentNote, currentNoteTime, currentNoteLength, index) {
    this.setState(() => {
      return {
        isOpenModal: true,
        currentNote: currentNote,
        currentNoteTime: currentNoteTime,
        currentNoteLength: currentNoteLength,
        index: index,
      };
    });
  }

  handleCloseModal() {
    this.setState(() => {
      return {
        isOpenModal: undefined,
      };
    });
  }
  //Deletes all notes
  handleDeleteNotes() {
    this.setState(() => {
      return {
        notes: [],
        notesLength: [],
        notesTime: [],
      };
    });
  }

  //Delete Single Note
  handleDeleteNote(noteToRemove, timeToRemove, charactersToRemove) {
    this.setState((prevState) => {
      return {
        notes: prevState.notes.filter((note) => {
          return noteToRemove !== note;
        }),
        notesLength: prevState.notesLength.filter((note) => {
          return charactersToRemove !== note;
        }),
        notesTime: prevState.notesTime.filter((note) => {
          return timeToRemove !== note;
        }),
      };
    });
  }

  // Add a note with time and number of characters to screen
  handleAddNote(note) {
    if (!note) {
      return "Enter Valid Value to Add Item";
    } else if (this.state.notes.indexOf(this.capitalizeInput(note)) > -1) {
      return "This note already exists";
    }

    this.setState((prevState) => {
      let time = [new Date().toUTCString()];
      return {
        notes: prevState.notes.concat([this.capitalizeInput(note)]),
        notesLength: prevState.notesLength.concat([
          [...note.replace(/ /g, "")].length,
        ]),
        notesTime: prevState.notesTime.concat(time),
      };
    });
  }

  //Using this component only to render the other components
  render() {
    const title = "Note Taking App";
    const subtitle = "Save your notes down here!";

    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <div className="container">
          <Notes
            notes={this.state.notes}
            notesLength={this.state.notesLength}
            notesTime={this.state.notesTime}
            handleDeleteNotes={this.handleDeleteNotes}
            handleDeleteNote={this.handleDeleteNote}
            isOpenModal={this.state.isOpenModal}
            handleOpenModal={this.handleOpenModal}
          />
          <AddNotes
            handleAddNote={this.handleAddNote}
            capitalizeInput={this.capitalizeInput}
          />
          <OpenModal
            isOpenModal={this.state.isOpenModal}
            handleCloseModal={this.props.handleCloseModal}
            currentNote={this.state.currentNote}
            currentNoteTime={this.state.currentNoteTime}
            currentNoteLength={this.state.currentNoteLength}
            index={this.state.index}
            handleCloseModal={this.handleCloseModal}
          />
        </div>
      </div>
    );
  }
}

export default NoteTakingApp;

require("file-loader?name=[name].[ext]!./index.html");
import React from "react";
import ReactDOM from "react-dom";

class NoteTakingApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteNotes = this.handleDeleteNotes.bind(this);
    this.handleDeleteNote = this.handleDeleteNote.bind(this);
    this.handleAddNote = this.handleAddNote.bind(this);
    this.capitalizeInput = this.capitalizeInput.bind(this);
    this.state = {
      notes: [],
      notesLength: [],
      notesTime: [],
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
      //console.log(`Notes: ${jsonNotes}`);
      //console.log(`Notes -- Time: ${jsonNotesTime}`);
      //console.log(`Notes -- Lenght: ${jsonNotesLength}`);
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
    const title = "Note Making App";
    const subtitle = "Write Down Some Notes";

    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <Notes
          notes={this.state.notes}
          notesLength={this.state.notesLength}
          notesTime={this.state.notesTime}
          handleDeleteNotes={this.handleDeleteNotes}
          handleDeleteNote={this.handleDeleteNote}
        />
        <AddNotes
          handleAddNote={this.handleAddNote}
          capitalizeInput={this.capitalizeInput}
        />
      </div>
    );
  }
}

const Header = (props) => {
  return (
    <div>
      <h1> {props.title} </h1>
      <h2>{props.subtitle}</h2>
    </div>
  );
};

const Notes = (props) => {
  return (
    <div>
      <button onClick={props.handleDeleteNotes}>Remove All</button>
      {props.notes.map((i, note) => (
        <div>
          <strong>Note{note + 1}:</strong> {props.notes[note]}
          <button
            onClick={(e) =>
              props.handleDeleteNote(
                props.notes[note],
                props.notesTime[note],
                props.notesLength[note]
              )
            }
          >
            Remove note
          </button>
          <li key={`Date--${i + 1}`}>
            <strong>Date: </strong> {props.notesTime[note]}
            {}
          </li>
          <li key={`Note--${i + 1}`}>
            <strong>Number Of Characters: </strong>
            {props.notesLength[note]}
            {}
          </li>
        </div>
      ))}
    </div>
  );
};

class AddNotes extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = {
      error: undefined,
    };
  }
  submit(e) {
    e.preventDefault();
    let note = document.querySelector(".note").value.trim();
    const error = this.props.handleAddNote(note);
    document.querySelector(".note").value = "";

    this.setState(() => {
      return {
        error: error,
      };
    });
  }
  render() {
    return (
      <div>
        {" "}
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.submit}>
          <input type="text" className="note"></input>
          <button>Add Note</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<NoteTakingApp />, document.getElementById("app"));

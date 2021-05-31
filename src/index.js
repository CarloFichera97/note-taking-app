require("file-loader?name=[name].[ext]!./index.html");
import React from "react";
import ReactDOM from "react-dom";

// Implement:
//- Capitalize Note Functionality
//- Note Time
//- Total Characters Inserted

class NoteTakingApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteNotes = this.handleDeleteNotes.bind(this);
    this.handleAddNote = this.handleAddNote.bind(this);
    this.capitalizeInput = this.capitalizeInput.bind(this);
    this.state = {
      notes: [],
      notesLength: [],
      notesTime: [],
    };
  }

  capitalizeInput(input) {
    return input[0].toUpperCase() + input.slice(1);
  }

  handleDeleteNotes() {
    this.setState(() => {
      return {
        notes: [],
      };
    });
  }

  handleAddNote(note) {
    if (!note) {
      return "Enter Valid Value to Add Item";
    } else if (this.state.notes.indexOf(this.capitalizeInput(note)) > -1) {
      return "This note already exists";
    }

    this.setState((prevState) => {
      let time = [new Date().toUTCString()];
      console.log(time);
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
        />
        <AddNotes
          handleAddNote={this.handleAddNote}
          capitalizeInput={this.capitalizeInput}
        />
      </div>
    );
  }
}

class Header extends React.Component {
  //Method to define this react componen
  render() {
    return (
      <div>
        <h1> {this.props.title} </h1>
        <h2>{this.props.subtitle}</h2>
      </div>
    );
  }
}

class Notes extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.handleDeleteNotes}>Remove All</button>
        {this.props.notes.map((i, note) => (
          <div >
            <strong>Note{note + 1}:</strong> {this.props.notes[note]}
            <li key={`Date--${i + 1}`}>
              <strong >Date: </strong> {this.props.notesTime[note]}
              {}
            </li>
            <li key={`Note--${i + 1}`}>
              <strong>Number Of Characters: </strong>
              {this.props.notesLength[note]}
              {}
            </li>
          </div>
        ))}
      </div>
    );
  }
}

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
    console.log(error);
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

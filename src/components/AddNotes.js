import React from "react";

export default class AddNotes extends React.Component {
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
        {this.state.error && (
          <p className="add-note-error">{this.state.error}</p>
        )}
        <form className="add-note" onSubmit={this.submit}>
          <input type="text" className="note"></input>
          <button className="button button--add-note">Add Note</button>
        </form>
      </div>
    );
  }
}

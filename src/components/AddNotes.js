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
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.submit}>
          <input type="text" className="note"></input>
          <button>Add Note</button>
        </form>
      </div>
    );
  }
}

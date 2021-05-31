require("file-loader?name=[name].[ext]!./index.html");
import React from "react";
import ReactDOM from "react-dom";

const app = {
  title: "Note Taking App",
  options: [],
  note: [],
  noteTime: [],
};

const capitalizeInput = function (input) {
  const names = input.split(" ");
  const namesUpper = [];

  for (const n of names) {
    namesUpper.push(n[0].toUpperCase() + n.slice(1));
  }
  return namesUpper.join(" ");
};

const onFormSubmit = (e) => {
  e.preventDefault();
  const option = document.querySelector(".note");
  let existingNote = false;

  for (let i = 0; i < app.options.length; i++) {
    if (option.value === app.options[i]) {
      alert("This note already exists");
      option.value = "";
      existingNote = true;
    }
  }

  if (option.value && existingNote === false) {
    app.options.push(capitalizeInput(option.value));
    app.note.push([...option.value.replace(/ /g, "")].length);
    console.log(app.note);
    const time = new Date().toUTCString();
    app.noteTime.push(time);
    option.value = "";
    renderFunction();
  }
};

const removeAll = () => {
  app.options = [];
  app.note = [];
  app.noteTime = [];
  renderFunction();
};
const appRoot = document.getElementById("app");

let variable = true;

const showHideDetails = () => {
  console.log("red");
  if (variable === true) variable = false;
  else variable = true;
  renderFunction();
};

function renderFunction() {
  const template = (
    <div>
      <h1>{app.title}</h1>
      <p>{app.options.length > 0 ? "Here are your notes taken" : "No notes"}</p>
      <button onClick={removeAll}>Remove</button>
      <div>
        {app.options.map((options, i) => {
          return (
            <div key={options}>
              {" "}
              <strong>Note {i + 1}: </strong>
              {options}
              <li>
                <strong>Total Characters: </strong> {app.note[i]}
              </li>
              <li>
                <strong>Time: </strong> {app.noteTime[i]}{" "}
              </li>
            </div>
          );
        })}
      </div>
      <form onSubmit={onFormSubmit}>
        <input type="text" className="note"></input>
        <button>Add Note</button>
      </form>
      <button onClick={showHideDetails}>
        {variable === true ? "Show Explanation" : "Hide Explanation"}
      </button>
      <p>
        {variable === false
          ? "This app allows the user to take notes by inputting a note in the form above and pressing the button 'Add Note' and returns the number of characters that the user has put into the note"
          : ""}
      </p>
    </div>
  );
  ReactDOM.render(template, appRoot);
}

renderFunction();

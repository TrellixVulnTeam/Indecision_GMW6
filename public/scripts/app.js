"use strict";

console.log("app.js is running!");

// JSX - Javascript XML
// A Javascript language extension provided by React - defines templates and injects data
// into those templates. JSX makes it easy to work with those templates.

var template = React.createElement(
  "h1",
  null,
  "Ahoy hoy"
);

var appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);

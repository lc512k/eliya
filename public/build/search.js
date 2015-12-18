"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Search = exports.Search = React.createClass({
    displayName: "Search",
    render: function render() {
        return React.createElement(
            "form",
            { className: "form-inline" },
            React.createElement(
                "div",
                { className: "form-group" },
                React.createElement("input", { type: "text", className: "form-control", id: "exampleInputName2", placeholder: "Jane Doe" }),
                React.createElement(
                    "button",
                    { type: "submit", className: "btn btn-primary" },
                    "Search"
                )
            )
        );
    }
});
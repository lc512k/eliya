"use strict";

//
// npm install --global babel-cli
// npm install babel-preset-react
// npm install babel-preset-es2015
//
// babel --presets es2015,react --watch public/src/ --out-dir public/build/
var Comment = React.createClass({
    displayName: "Comment",

    render: function render() {
        return React.createElement(
            "div",
            { className: "comment" },
            React.createElement(
                "h2",
                { className: "commentAuthor" },
                this.props.author
            ),
            this.props.children
        );
    }
});

var CommentList = React.createClass({
    displayName: "CommentList",

    render: function render() {
        var commentNodes = this.props.data.map(function (comment) {
            return React.createElement(
                Comment,
                { author: comment.author, key: comment.id },
                comment.text
            );
        });
        return React.createElement(
            "div",
            { className: "commentList" },
            commentNodes
        );
    }
});

var CommentForm = React.createClass({
    displayName: "CommentForm",

    getInitialState: function getInitialState() {
        return { author: '', text: '' };
    },
    handleAuthorChange: function handleAuthorChange(e) {
        this.setState({ author: e.target.value });
    },
    handleTextChange: function handleTextChange(e) {
        this.setState({ text: e.target.value });
    },
    handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();

        if (!text || !author) {
            return;
        }

        this.props.onCommentSubmit({ author: author, text: text });

        this.setState({ author: '', text: '' });
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "commentForm" },
            React.createElement(
                "form",
                { className: "commentForm", onSubmit: this.handleSubmit },
                React.createElement("input", { type: "text", placeholder: "Your name", value: this.state.author, onChange: this.handleAuthorChange }),
                React.createElement("input", { type: "text", placeholder: "Say...", value: this.state.text, onChange: this.handleTextChange }),
                React.createElement("input", { type: "submit", value: "Post", onSubmit: this.handleSubmit })
            )
        );
    }
});

var CommentBox = React.createClass({
    displayName: "CommentBox",

    getInitialState: function getInitialState() {
        return { data: [] };
    },
    componentDidMount: function componentDidMount() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: (function (data) {
                this.setState({ data: data });
            }).bind(this),
            error: (function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }).bind(this)
        });
    },
    handleCommentSubmit: function handleCommentSubmit(comment) {

        comment.id = Date.now();
        var newData = this.state.data.concat([comment]);
        this.setState({ data: newData });

        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: (function (data) {
                this.setState({ data: data });
            }).bind(this),
            error: (function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }).bind(this)
        });
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "commentBox" },
            React.createElement(
                "h1",
                null,
                "Comment Box"
            ),
            React.createElement(CommentList, { data: this.state.data }),
            React.createElement(CommentForm, { onCommentSubmit: this.handleCommentSubmit })
        );
    }
});

ReactDOM.render(
// <CommentBox data={data} />,
React.createElement(CommentBox, { url: "/api/comments" }), document.getElementById('content'));
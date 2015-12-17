// 
// npm install --global babel-cli
// npm install babel-preset-react
// npm install babel-preset-es2015
// 
// babel --presets es2015,react --watch public/src/ --out-dir public/build/
var Comment = React.createClass({
    render: function () {
        return (
            <div className = "comment">
                <h2 className = "commentAuthor">
                    {this.props.author}
                </h2>
                {this.props.children}
            </div>
        )
    }
});

var CommentList = React.createClass({
    render: function () {
        var commentNodes = this.props.data.map(function (comment) {
            return (
                <Comment author = {comment.author} key = {comment.id}>
                    {comment.text}
                </Comment>
            );
        });
        return (
            <div className = "commentList">
                {commentNodes}
            </div>
        )
    }
});

var CommentForm = React.createClass({

    getInitialState: function () {
        return {author: '', text: ''};
    },
    handleAuthorChange: function (e) {
        this.setState({author: e.target.value});
    },
    handleTextChange: function (e) {
        this.setState({text: e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();

        if (!text || !author) {
            return;
        }
        
        this.props.onCommentSubmit({author: author, text: text});
        
        this.setState({author: '', text: ''});
    },
    render: function () {
        return (
            <div className = "commentForm">
                <form className="commentForm" onSubmit={this.handleSubmit}>
                  <input type="text" placeholder="Your name" value={this.state.author} onChange={this.handleAuthorChange} />
                  <input type="text" placeholder="Say..." value={this.state.text} onChange={this.handleTextChange} />
                  <input type="submit" value="Post" onSubmit={this.handleSubmit} />
                </form>
            </div>
        )
    }
});

var CommentBox = React.createClass({
    getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function() {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        cache: false,
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    handleCommentSubmit: function (comment) {

        comment.id = Date.now();
        var newData = this.state.data.concat([comment]);
        this.setState({data: newData});

        $.ajax({
          url: this.props.url,
          dataType: 'json',
          type: 'POST',
          data: comment,
          success: function(data) {
            this.setState({data: data});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    render: function () {
        return (
            <div className="commentBox">
                <h1>Comment Box</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
            </div>
        )
    }
});

ReactDOM.render(
    // <CommentBox data={data} />,
    <CommentBox url="/api/comments" />,
    document.getElementById('content')
);
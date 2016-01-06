"use strict";

// npm install --save react react-dom babelify
// babel-preset-react babel-preset-es2015

// import * as Search from "search";
var DashboardContainer = React.createClass({
    displayName: "DashboardContainer",
    getInitialState: function getInitialState() {
        return { data: [] };
    },
    componentDidMount: function componentDidMount() {
        this.setState({ data: this.props.shows });
        // $.ajax({
        //     url: this.props.url,
        //     dataType: 'json',
        //     cache: false,
        //     success: function (data) {
        //         this.setState({data: data});
        //     }.bind(this),
        //     error: function () {
        //         console.error(this.props.url, status, err.toString());
        //         alert('Oops, something went wrong');
        //     }.bind(this)
        // });
    },
    handleType: function handleType(string) {
        var newData = this.props.shows.filter(function (country) {
            return country.name.toLowerCase().indexOf(string) >= 0;
        });
        this.setState({ data: newData });
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "dashboardContainer container" },
            React.createElement(
                "div",
                { className: "row" },
                React.createElement(
                    "div",
                    { className: "col-sm-12" },
                    React.createElement(Search, { onType: this.handleType })
                )
            ),
            React.createElement(
                "div",
                { className: "row" },
                React.createElement(
                    "div",
                    { className: "col-sm-6" },
                    React.createElement(Table, { nodes: this.state.data, title: "TV Shows" })
                ),
                React.createElement(
                    "div",
                    { className: "col-sm-6" },
                    "Info on selected TV Show"
                )
            )
        );
    }
});

ReactDOM.render(React.createElement(DashboardContainer, { shows: tvshows }), document.getElementById('content'));
'use strict';

// npm install --save react react-dom babelify
// babel-preset-react babel-preset-es2015

// import * as Search from "search";

var Search = React.createClass({
    displayName: 'Search',
    getInitialState: function getInitialState() {
        return { str: '' };
    },
    handleType: function handleType(e) {
        this.state.str = e.target.value;
        this.props.onType(this.state.str);
    },

    // Removed submit button
    // use this for clear button
    handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        this.props.onType(this.state.str);
        this.state.str = '';
    },
    render: function render() {
        return React.createElement(
            'form',
            { className: 'form-inline', role: 'search', onSubmit: this.handleSubmit },
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement('input', { onChange: this.handleType, type: 'text', className: 'form-control', id: 'exampleInputName2', placeholder: 'Search...' })
            )
        );
    }
});

var Table = React.createClass({
    displayName: 'Table',
    onClickShow: function onClickShow(e) {
        var description = e.currentTarget.querySelector('.description');
        description.classList.toggle('hidden');
    },
    render: function render() {

        var table = this;

        var rows = this.props.nodes.map(function (item) {
            return React.createElement(
                'tr',
                { key: item.id, onClick: table.onClickShow },
                React.createElement(
                    'td',
                    null,
                    item.name,
                    React.createElement(
                        'div',
                        { className: 'description hidden' },
                        React.createElement('img', { src: item.image.medium, alt: 'image' })
                    )
                )
            );
        });

        return React.createElement(
            'div',
            null,
            React.createElement(
                'h4',
                null,
                this.props.title
            ),
            React.createElement(
                'table',
                { className: 'table table-striped' },
                React.createElement(
                    'tbody',
                    null,
                    rows
                )
            )
        );
    }
});

var DashboardContainer = React.createClass({
    displayName: 'DashboardContainer',
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
            'div',
            { className: 'dashboardContainer container' },
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-sm-12' },
                    React.createElement(Search, { onType: this.handleType })
                )
            ),
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-sm-6' },
                    React.createElement(Table, { nodes: this.state.data, title: 'TV Shows' })
                ),
                React.createElement(
                    'div',
                    { className: 'col-sm-6' },
                    'Info on selected TV Show'
                )
            )
        );
    }
});

ReactDOM.render(React.createElement(DashboardContainer, { shows: tvshows }), document.getElementById('content'));
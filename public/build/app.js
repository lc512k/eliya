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
    handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        this.props.onType(this.state.str);
        this.state.str = '';
    },
    render: function render() {
        return React.createElement(
            'form',
            { className: 'form-inline', onSubmit: this.handleSubmit },
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement('input', { onChange: this.handleType, type: 'text', className: 'form-control', id: 'exampleInputName2', placeholder: 'Jane Doe' }),
                React.createElement(
                    'button',
                    { type: 'submit', className: 'btn btn-primary', onSubmit: this.handleSubmit },
                    'Search'
                )
            )
        );
    }
});

var Table = React.createClass({
    displayName: 'Table',
    render: function render() {
        var nodes = this.props.nodes.map(function (item) {
            return React.createElement(
                'tr',
                { key: item.id },
                React.createElement(
                    'td',
                    null,
                    item.name
                )
            );
        });

        return React.createElement(
            'table',
            { className: 'table table-striped' },
            React.createElement(
                'thead',
                null,
                React.createElement(
                    'tr',
                    null,
                    React.createElement(
                        'th',
                        null,
                        this.props.title
                    )
                )
            ),
            React.createElement(
                'tbody',
                null,
                nodes
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
        this.setState({ data: this.props.countries });
    },
    handleType: function handleType(string) {

        var newData = this.props.countries.filter(function (country) {
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
                    React.createElement(Table, { nodes: this.state.data, title: 'Countries' })
                ),
                React.createElement(
                    'div',
                    { className: 'col-sm-6' },
                    'Info on selected country'
                )
            )
        );
    }
});

ReactDOM.render(React.createElement(DashboardContainer, { countries: countries }), document.getElementById('content'));
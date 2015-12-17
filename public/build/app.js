'use strict';

// npm install --save react react-dom babelify
// babel-preset-react babel-preset-es2015
var cinemas = [{ id: 1, name: 'Cineplex East Finchley' }, { id: 2, name: 'Barnet Multiplex' }, { id: 3, name: 'Odeon Camden Town' }, { id: 4, name: 'Cineplex Kingsbury' }, { id: 5, name: 'Cinepma City' }, { id: 6, name: 'Yelmo Multiplex' }];

var DatePicker = React.createClass({
    displayName: 'DatePicker',
    render: function render() {
        return React.createElement(
            'div',
            null,
            ' date a picker'
        );
    }
});

var Table = React.createClass({
    displayName: 'Table',
    render: function render() {

        var nodes = this.props.nodes.map(function (item) {
            return React.createElement(
                'div',
                { key: item.id },
                item.name
            );
        });

        return React.createElement(
            'div',
            { className: 'Table' },
            nodes
        );
    }
});

var DashboardContainer = React.createClass({
    displayName: 'DashboardContainer',
    render: function render() {
        return React.createElement(
            'div',
            { className: 'dashboardContainer' },
            React.createElement(DatePicker, null),
            React.createElement(Table, { nodes: this.props.cinemas }),
            React.createElement(Table, { nodes: this.props.cinemas }),
            React.createElement(Table, { nodes: this.props.cinemas })
        );
    }
});

ReactDOM.render(React.createElement(DashboardContainer, { cinemas: cinemas }), document.getElementById('content'));
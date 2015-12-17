'use strict';

// npm install --save react react-dom babelify babel-preset-react babel-preset-es2015

var cinemas = [{ id: 1, name: 'Cineplex East Finchley', postCode: 'N2 0DA' }, { id: 2, name: 'Barnet Multiplex', postCode: 'SW2 0DD' }, { id: 3, name: 'Odeon Camden Town', postCode: 'W1 0DD' }, { id: 4, name: 'Cineplex Kingsbury', postCode: 'N2 0DB' }, { id: 5, name: 'Cinepma City', postCode: 'NW1 0DD' }, { id: 6, name: 'Yelmo Multiplex', postCode: 'N2 0AD' }];

var DashboardContainer = React.createClass({
    displayName: 'DashboardContainer',

    render: function render() {
        return React.createElement(
            'div',
            { className: 'dashboardContainer' },
            'container'
        );
    }
});

ReactDOM.render(React.createElement(DashboardContainer, null), document.getElementById('content'));
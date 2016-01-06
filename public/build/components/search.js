'use strict';

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
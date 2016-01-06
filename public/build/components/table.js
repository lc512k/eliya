'use strict';

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
import React from 'react';

export default class Table extends React.Component {

    constructor (props) {
        super(props);
    }

    onClickHeadline(e) {
        const description = e.currentTarget.querySelector('.description');
        description.classList.toggle('hidden');
    }

    render() {

        const table = this;
        const searchStrLen = 5;//table.props.searchStr.length;

        const rows = this.props.nodes.map(function (item) {

            const matchIndex = item.name.toLowerCase(). indexOf(table.props.searchStr);
            if (matchIndex !== -1){
                let match = item.name.substring(matchIndex, searchStrLen);
                item.name = item.name.replace(match, '<mark>' + match + '</mark>');
            }

            return (
                <tr key={item.id} onClick={table.onClickHeadline}>
                    <td>
                    <div dangerouslySetInnerHTML={{__html: item.name}} />
                        <div className="description hidden">
                            <small><em>{item.summary}</em></small>
                        </div>
                    </td>
                    </tr>
            );
        });

        return (
            <div>
                <h4>{this.props.title}</h4>
                <table className="table table-striped">
                <tbody>{rows}</tbody>
                </table>
            </div>
        );
    }
}
import React from 'react';
import ReactDOM from 'react-dom';

export default class Table extends React.Component {

    constructor (props) {
        super(props);
    }

    onClickShow(e) {
        const description = e.currentTarget.querySelector('.description');
        description.classList.toggle('hidden');
    }

    render() {

        const table = this;

        const rows = this.props.nodes.map(function (item) {
            return (
                <tr key={item.id} onClick={table.onClickShow}>
                    <td>
                        {item.name}
                        <div className="description hidden">
                            <img src={item.image.medium} alt="image"/>
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
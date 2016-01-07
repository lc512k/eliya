import React from 'react';
import Actions from '../actions';

export default class Search extends React.Component {

    constructor (props) {
        super(props);
        this.state = {str: ''};
    }

    handleType(e) {
        this.state.str = e.target.value;
        this.props.onType(this.state.str);
        Actions.navigate('');
    }

    // Removed submit button
    // use this for clear button
    handleSubmit(e) {
        e.preventDefault();
        this.props.onType(this.state.str);
        this.state.str = '';

    }

    render() {
        return(
            <form className="form-inline" role="search" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                    <input onChange={this.handleType.bind(this)} type="text" className="form-control" id="exampleInputName2" placeholder="Search..." ></input>
                </div>     
            </form>
        );
    }
}
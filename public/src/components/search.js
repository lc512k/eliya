const Search = React.createClass({
    getInitialState() {
        return {str:''};
    },
    handleType(e) {
        this.state.str = e.target.value;
        this.props.onType(this.state.str);
    },

    // Removed submit button
    // use this for clear button
    handleSubmit(e) {
        e.preventDefault();
        this.props.onType(this.state.str);
        this.state.str = '';

    },
    render() {
        return(
            <form className="form-inline" role="search" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input onChange={this.handleType} type="text" className="form-control" id="exampleInputName2" placeholder="Search..." ></input>
                </div>     
            </form>
        );
    }
});
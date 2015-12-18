export const Search = React.createClass({
    render() {
        return(
            <form className="form-inline">
                <div className="form-group">
                    <input type="text" className="form-control" id="exampleInputName2" placeholder="Jane Doe" ></input>
                    <button type="submit" className="btn btn-primary">Search</button>
                </div>
            </form>
        );
    }
});
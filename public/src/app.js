// npm install --save react react-dom babelify
// babel-preset-react babel-preset-es2015

// import * as Search from "search";

const Search = React.createClass({
    getInitialState() {
        return {str:''};
    },
    handleType(e) {
        this.state.str = e.target.value;
        this.props.onType(this.state.str);
    },
    handleSubmit(e) {
        e.preventDefault();
        this.props.onType(this.state.str);
        this.state.str = '';

    },
    render() {
        return(
            <form className="form-inline"  onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input onChange={this.handleType} type="text" className="form-control" id="exampleInputName2" placeholder="Jane Doe" ></input>
                    <button type="submit" className="btn btn-primary" onSubmit={this.handleSubmit}>Search</button>
                </div>
            </form>
        );
    }
});

const Table = React.createClass({
    render() {
        const nodes = this.props.nodes.map(function (item) {
            return (
                <tr key={item.id}><td>{item.name}</td></tr>
            );
        });

        return (
            <table className="table table-striped">
            <thead><tr><th>{this.props.title}</th></tr></thead>
            <tbody>{nodes}</tbody>
            </table>
        );
    }
});

const DashboardContainer = React.createClass({

    getInitialState() {
        return {data:[]};
    },
    componentDidMount() {
        this.setState({data: this.props.countries});
    },
    handleType(string) {

        const newData = this.props.countries.filter(function(country) {
            return country.name.toLowerCase().indexOf(string) >= 0;
        });

        this.setState({data: newData});
    },
    render() {
        return (
            <div className="dashboardContainer container">
                <div className="row">
                    <div className="col-sm-12">
                        <Search onType={this.handleType}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <Table nodes={this.state.data} title="Countries"/>
                    </div>
                    <div className="col-sm-6">
                        Info on selected country
                    </div>
                </div>         
            </div>
        );
    }
});

ReactDOM.render(
    <DashboardContainer countries={countries}/>,
    document.getElementById('content')
);

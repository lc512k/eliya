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

const Table = React.createClass({

    onClickShow(e) {
        const description = e.currentTarget.querySelector('.description');
        description.classList.toggle('hidden');
    },
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
});

const DashboardContainer = React.createClass({

    getInitialState() {
        return {data:[]};
    },
    componentDidMount() {
        this.setState({data: this.props.shows});
        // $.ajax({
        //     url: this.props.url,
        //     dataType: 'json',
        //     cache: false,
        //     success: function (data) {
        //         this.setState({data: data});
        //     }.bind(this),
        //     error: function () {
        //         console.error(this.props.url, status, err.toString());
        //         alert('Oops, something went wrong');
        //     }.bind(this)
        // });
    },
    handleType(string) {
        const newData = this.props.shows.filter(function(country) {
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
                        <Table nodes={this.state.data} title="TV Shows"/>
                    </div>
                    <div className="col-sm-6">
                        Info on selected TV Show
                    </div>
                </div>         
            </div>
        );
    }
});

ReactDOM.render(
    <DashboardContainer shows={tvshows}/>,
    document.getElementById('content')
);

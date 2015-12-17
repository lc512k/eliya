// npm install --save react react-dom babelify
// babel-preset-react babel-preset-es2015
const cinemas = [
    {id: 1, name: 'Cineplex East Finchley'},
    {id: 2, name: 'Barnet Multiplex'},
    {id: 3, name: 'Odeon Camden Town'},
    {id: 4, name: 'Cineplex Kingsbury'},
    {id: 5, name: 'Cinepma City'},
    {id: 6, name: 'Yelmo Multiplex'},
];

const DatePicker = React.createClass({
    render() {
        return(
            <div> date a picker</div>
        );
    }
});

const Table = React.createClass({
    render() {

        const nodes = this.props.nodes.map(function (item) {
            return (
                <div key={item.id}>{item.name}</div>
            );
        });

        return (
            <div className="Table">
            {nodes}
            </div>
        );
    }
});

const DashboardContainer = React.createClass({
    render() {
        return (
            <div className="dashboardContainer">
            <DatePicker />
            <Table nodes={this.props.cinemas}/>
            <Table nodes={this.props.cinemas} />
            <Table nodes={this.props.cinemas} />
            </div>
        );
    }
});

ReactDOM.render(
    <DashboardContainer cinemas={cinemas}/>,
    document.getElementById('content')
);

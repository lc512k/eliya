import React from 'react';
import ReactDOM from 'react-dom';

import Table from './components/table.jsx';
import Search from './components/search.jsx';
import dispatcher from './dispatcher.js';


// TODO separate this as another view
class DashboardContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {data:[]};
    }

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
    }

    handleType(string) {
        const newData = this.props.shows.filter(function(country) {
            return country.name.toLowerCase().indexOf(string) >= 0;
        });
        this.setState({data: newData});
    }

    render() {
        return (
            <div className="dashboardContainer container">
                <div className="row">
                    <div className="col-sm-12">
                        <Search onType={this.handleType.bind(this)}/>
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
};
// END TODO App starts here

dispatcher.dispatch('APPINIT');

ReactDOM.render(
    <DashboardContainer shows={tvshows}/>,
    document.getElementById('content')
);

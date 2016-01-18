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
        // $.post('http://api.ft.com/content/search/v1?apiKey=e7hyruvqbfvwecsh5mmwb9rq', function (some, thing) {
        //     debugger
        // });
        $.ajax({
            type: 'POST',
            // url: 'http://api.ft.com/content/notifications/v1/items?apiKey=e7hyruvqbfvwecsh5mmwb9rq', //this.props.url,'http://api.tvmaze.com/search/shows?q=girls',//
            //url: 'http://api.ft.com/site/v1/pages/4c499f12-4e94-11de-8d4c-00144feabdc0/skyline-content?apiKey=e7hyruvqbfvwecsh5mmwb9rq',
            // url: 'http://api.ft.com/content/search/v1?apiKey=e7hyruvqbfvwecsh5mmwb9rq',
            url: '/api/test',
            // dataType: 'application/json',
            data: JSON.stringify({
                "queryString": "banks"
            }),
            // headers: {
            //     'X-Api-Key': 'e7hyruvqbfvwecsh5mmwb9rq'
            // },
            dataType: 'json',
            cache: false
        }).done(function (jqXHR, textStatus) {
            debugger
        }).fail(function (jqXHR, textStatus, errorThrown) {
            debugger
        });
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
// 
// 
// http://api.ft.com/content/search/v1?apiKey=e7hyruvqbfvwecsh5mmwb9rq

dispatcher.dispatch('APPINIT');

ReactDOM.render(
    <DashboardContainer shows={tvshows}/>,
    document.getElementById('content')
);

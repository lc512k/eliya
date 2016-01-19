import React from 'react';
import ReactDOM from 'react-dom';

import Table from './components/table.jsx';
import Search from './components/search.jsx';
import dispatcher from './dispatcher.js';


class DashboardContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {data:[]};
    }

    handleType(string) {
        
        this.searchStr = string;

        const newData = [];

        $.ajax({
            type: 'POST',
            url: '/api/search',
            data: JSON.stringify({
                "queryString": string
            }),
            dataType: 'json',
            cache: false
        }).done(function (jqXHR) {
            
            let articles = jqXHR.results[0].results;

            for (let i in articles) {
                newData.push({name: articles[i].title.title, id: i, summary: articles[i].summary.excerpt});
            }

            this.setState({data: newData});

        }.bind(this)).fail(function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown);
        });
        console.log(newData);
    }

    render() {
        return (
            <div className="dashboardContainer container">
                <div className="row">
                    <div className="col-sm-12">
                        <Search onType={this.debounce(this.handleType.bind(this), 600)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <Table nodes={this.state.data} searchStr={this.searchStr} title="Headlines"/>
                    </div>
                    <div className="col-sm-6"></div>
                </div>         
            </div>
        );
    }

    debounce(fn, delay) {
        let timer = null;
        return function () {
            let context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        };
    }
};

dispatcher.dispatch('APPINIT');

ReactDOM.render(
    <DashboardContainer news={news}/>,
    document.getElementById('content')
);

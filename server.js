const http = require('http');
const JSON = require('JSON');
const express = require('express');
const app = express();

let response = '';

app.post('/api/search', function (req, r) {
    console.log('api/search called');

    response = '';

    const post_data = JSON.stringify({
        queryString: 'banks',
        resultContext: {
            aspects: ['title', 'summary']
        },
        queryContext: {
            curations: ['ARTICLES']
        }
    });


    // An object of options to indicate where to post to
    const post_options = {
        host: 'api.ft.com',
        path: '/content/search/v1?apiKey=e7hyruvqbfvwecsh5mmwb9rq',
        method: 'POST'
    };


    // Set up the request
    const post_req = http.request(post_options, function(res) {

        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            response += chunk;
        }.bind(this));

        res.on('end', function () {
            r.send(response);
        });
    });

    // post the data
    post_req.write(post_data);
    post_req.end();
});

app.listen(8081, function () {
    console.log('Eliya proxy listening on port 8081!');
});
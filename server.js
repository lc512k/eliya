var http = require('http');
var querystring = require('querystring');
var express = require('express');
var app = express();

var response = '';

app.post('/api/search', function (req, r) {
    console.log('api/search called');

    response = '';

    var post_data = '{"queryString": "'+'banks'+'", "resultContext": {"aspects": ["title", "summary"]}, "queryContext": {"curations": ["ARTICLES"]}}';
    
    // var post_data = querystring.stringify({
    //     queryString: "banks"
    // });

    // An object of options to indicate where to post to
    var post_options = {
        host: 'api.ft.com',
        path: '/content/search/v1?apiKey=e7hyruvqbfvwecsh5mmwb9rq',
        method: 'POST'
    };


    // Set up the request
    var post_req = http.request(post_options, function(res) {

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
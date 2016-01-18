var http = require('http');
var querystring = require('querystring');
var express = require('express');
var app = express();

var response = '';

app.post('/api/test', function (req, r) {
    var post_data = '{"queryString": "'+'banks'+'"}';

    // An object of options to indicate where to post to
    var post_options = {
        host: 'api.ft.com',
        // port: '80',
        path: '/content/search/v1?apiKey=e7hyruvqbfvwecsh5mmwb9rq',
        method: 'POST'
        // headers: {
        //     'X-Api-Key': 'e7hyruvqbfvwecsh5mmwb9rq'
        // }
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

    console.log('Response: '+response);
});

app.listen(8081, function () {
    console.log('Example app listening on port 8081!');
});


//Lets define a port we want to listen to
// const PORT=8081; 

// // We need this to build our post string
// var querystring = require('querystring');
// var http = require('http');




// //We need a function which handles requests and send response
// function handleRequest(request, response){
//     postSearch('banks');
//     // response.end();
// }

// //Create a server
// var server = http.createServer(handleRequest);

// //Lets start our server
// server.listen(PORT, function(){
//     //Callback triggered when server is successfully listening. Hurray!
//     console.log("Server listening on: http://localhost:%s", PORT);
// });
/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var qs = require('querystring');

module.exports = function(request, response) {
  var data = {results: []};
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // The outgoing status.
  var statusCode = 200;

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = 'text/plain';

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  // response.writeHead(statusCode, headers);

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  if(request.method === 'GET'  && request.url === '/classes/messages') {
    statusCode = 200;
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(data));
  } else if(request.method === 'POST' && request.url === '/classes/messages') {
    statusCode = 201;
    var requestBody = '';
    request.on('error', function(err) {
      console.log(err);
    });
    request.on('data', function(data){
      requestBody += data;
    });
    request.on('end', function() {
      console.log('requestBody', requestBody);
      console.log('typeof requestBody', typeof requestBody);
      var formData = JSON.parse(requestBody);
      console.log('formData', formData);
      formData.objectId = Date.now();
      var dateTime = new Date();
      var formatted = dateTime.toISOString();
      formData.createdAt = formatted;
      formData.updatedAt = formatted;

      if (formData.hasOwnProperty('roomName') === false) {
        formData.roomName = 'lobby';
      }
      console.log('formData after', formData);
      data.results.push(formData);
      // console.log(data.results);
      response.writeHead(statusCode, headers);
      // data.results.push()
      // response.statusCode = 201;
      // createdAt, objectId, roomname, text, updatedAt, username
      console.log('data', data);
      response.end(JSON.stringify(data));
    });
  } else {
    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end();
  }
  // response.end('Hello, World!');
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

/*
createdAt : "2017-06-08T03:28:30.446Z"
objectId: "DgkjjzK2Dj"
roomname : "lobby"
text : "hello"
updatedAt : "2017-06-08T03:28:30.446Z"
username: "ghj"
*/
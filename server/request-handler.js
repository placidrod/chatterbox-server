var utils = require('./utils');
// console.log(utils);

var messages = [];

var objectIdCounter = 0;

var actions = {
  'GET': function(request, response) {
    utils.sendResponse(response, {results: messages});
  },
  'POST': function(request, response) {
    utils.collectData(request, function(message) {
      message.objectId = objectIdCounter++;
      messages.push(message);
      utils.sendResponse(response, {objectId: message.objectId}, 201);
      //sendResponse(response, messages, 201);
    });
  },
  'OPTIONS': function(request, response) {
    utils.sendResponse(response, null);
  }
};

var makeActionHandler = function(actionMap) {
  return function(request, response) {
    var action = actionMap[request.method];
    if (action) {
      action(request, response);
    } else {
      utils.sendResponse(response, 'Not Found', 404);
    }
  };
};

module.exports = function(request, response) {

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // The outgoing status.
  // var statusCode = 200;
  // var headers = utils.defaultCorsHeaders;

  var action = makeActionHandler(actions);
  action(request, response);

/*
  if(request.method === 'GET'  && request.url === '/classes/messages') {
    statusCode = 200;
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(data));
  } else if(request.method === 'POST' && request.url === '/classes/messages') {

    var requestBody = '';
    request.on('error', function(err) {
      console.log(err);
    });
    request.on('data', function(cody){
      requestBody += cody;
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
      statusCode = 201;
      headers['Content-Type'] = 'application/json';
      // console.log(data.results);
      response.writeHead(statusCode, headers);
      // createdAt, objectId, roomname, text, updatedAt, username
      console.log('data', data);
      response.end(JSON.stringify(data));
    });
  } else {
    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end();
  }
  */
};

/*
createdAt : "2017-06-08T03:28:30.446Z"
objectId: "DgkjjzK2Dj"
roomname : "lobby"
text : "hello"
updatedAt : "2017-06-08T03:28:30.446Z"
username: "ghj"
*/
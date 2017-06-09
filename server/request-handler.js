var utils = require('./utils');
// console.log(utils);
var objectIdCounter = 1;

/*var messages = [{
  'username': 'Alex',
  'text': 'hellooo',
  'objectId': objectIdCounter
}];
*/
var messages = [];

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

exports.requestHandler = makeActionHandler(actions);

/*
createdAt : "2017-06-08T03:28:30.446Z"
objectId: "DgkjjzK2Dj"
roomname : "lobby"
text : "hello"
updatedAt : "2017-06-08T03:28:30.446Z"
username: "ghj"
*/
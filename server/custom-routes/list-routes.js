let Tasks = require('../models/task')
let Lists = require('../models/list')



module.exports = {
  specificList: {
    path: '/lists/:listId',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find list by listID'
      Lists.findById(req.params.listId)
        .then(list => {
          res.send(handleResponse(action, list))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  tasksOnTheList: {
    path: '/lists/:listId/tasks',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find Tasks by ListID'
      Tasks.find({ listId: req.params.listId })
        .then(tasks => {
          res.send(handleResponse(action, tasks))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  taskInList: {
    path: '/lists/:listId/tasks',
    reqType: 'post',
    method(req, res, next) {
      let action = 'Create Task On List'
      Tasks.create(req.body)
        .then(task => {
          res.send(handleResponse(action, task))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
}

function handleResponse(action, data, error) {
  var response = {
    action: action,
    data: data
  }
  if (error) {
    response.error = error
  }
  return response
}
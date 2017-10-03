let Comments = require('../models/comment')
let Tasks = require('../models/task')


module.exports = {
  specificTask: {
    path: '/tasks/:taskId',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find task by taskID'
      Tasks.findById(req.params.tasksId)
        .then(task => {
          res.send(handleResponse(action, task))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  updateTask: {
    path: '/tasks/:taskId',
    reqType: 'put',
    method(req, res, next) {
      let action = 'Update task by taskID'
      Tasks.findByIdAndUpdate(req.params.taskId, req.body)
        .then(task => {
          res.send(handleResponse(action, task))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  commentOnTask: {
    path: '/tasks/:taskId/comments',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find Comments by TaskID'
      Comments.find({ taskId: req.params.taskId })
        .then(comments => {
          res.send(handleResponse(action, comments))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  commentsInTasks: {
    path: '/tasks/:taskId/comments',
    reqType: 'post',
    method(req, res, next) {
      let action = 'Create Comment On Task'
      Comments.create(req.body)
        .then(comment => {
          res.send(handleResponse(action, comment))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  }
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
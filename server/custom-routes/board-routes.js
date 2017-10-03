let Boards = require('../models/board')
let Lists = require('../models/list')


module.exports = {
  specificBoard: {
    path: '/boards/:boardId',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find board by BoardID'
      Boards.findById(req.params.boardId)
        .then(board => {
          res.send(handleResponse(action, board))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  listsOnBoards: {
    path: '/boards/:boardId/lists',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find Lists by BoardID'
      Lists.find({ boardId: req.params.boardId })
        .then(lists => {
          res.send(handleResponse(action, lists))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  boardList: {
    path: '/boards/:boardId/lists',
    reqType: 'post',
    method(req, res, next) {
      let action = 'Create List On Board'
      Lists.create(req.body)
        .then(list => {
          res.send(handleResponse(action, list))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  userBoards: {
    path: '/userboards',
    reqType: 'post',
    method(req, res, next) {
      let action = 'Create User Board'
      Boards.create(req.body)
        .then(board => {
          res.send(handleResponse(action, board))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  board: {
    path: '/userboards/:boardId',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find Board'
      Boards.findbyId(req.params.boardId)
        .then(board => {
          res.send(handleResponse(action, board))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  lists: {
    path: '/userboards/:boardId/lists',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find Board Lists'
      Lists.find({ boardId: req.params.boardId })
        .then(lists => {
          res.send(handleResponse(action, lists))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  list: {
    path: '/userboards/:boardId/lists/:listId',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find List'
      Lists.findbyId(req.params.listId)
        .then(list => {
          res.send(handleResponse(action, list))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  tasks: {
    path: '/userboards/:boardId/lists/:listId/tasks',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find List Tasks'
      Tasks.find({ listId: req.params.listId })
        .then(tasks => {
          res.send(handleResponse(action, tasks))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  task: {
    path: '/userboards/:boardId/lists/:listId/tasks/:taskId',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find Task'
      Tasks.findById(req.params.taskId)
        .then(task => {
          res.send(handleResponse(action, task))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  comments: {
    path: '/userboards/:boardId/lists/:listId/tasks/:taskId/comments',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find Task Comments'
      Comments.find({ taskId: req.params.taskId })
        .then(comments => {
          res.send(handleResponse(action, comments))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  comment: {
    path: '/userboards/:boardId/lists/:listId/tasks/:taskId/comments/:commentId',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find Comments'
      Comments.findById(req.params.commentId)
        .then(comment => {
          res.send(handleResponse(action, comment))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  sharedBoards: {
    path: '/sharedBoards',
    reqType: 'get',
    method(req, res, next) {
      Boards.find({ collaborators: { $in: req.session.uid } })
        .then(boards => {
          res.send(handleResponse(action, boards))
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
let Vaults = require('../models/vault')
let Keeps = require('../models/keep')

module.exports = {
  userBoards: {
    path: '/uservaults',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find User Vaults'
  Vaults.find({ creatorId: req.session.uid })
        .then(vaults => {
          res.send(handleResponse(action, vaults))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  sharedBoards: {
    path: '/sharedBoards',
    reqType: 'get',
    method(req, res, next) {
      Vaults.find({ collaborators: { $in: req.session.uid } })
        .then(vaults => {
          res.send(handleResponse(action, vaults))
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
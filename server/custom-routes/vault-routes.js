let Vaults = require('../models/vault')
let Keeps = require('../models/keep')

module.exports = {
    userBoards: {
        path: '/vaults/:vaultId/addkeep/:keepId',
        reqType: 'put',
        method(req, res, next) {
            let action = 'Add Keep to Vault'
            Vaults.findById(req.params.vaultId)
                .then(vault => {
                    vault.keeps.push(req.params.keepId)
                    vault.save()
                        .then(() => {
                            res.send(handleResponse(action, vault))
                        })
                        .catch(error => {
                            return next(handleRespose(action, null, error))
                        })
                })
                .catch(error => {
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
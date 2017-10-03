let Vaults = require('../models/vault')
let Keeps = require('../models/keep')

module.exports = {
    getPublicKeeps: {
        path: '/keeps/public',
        reqType: 'get',
        method(req, res, next) {
            let action = 'Get public keeps'
            Keeps.find({ private: false })
                .then(Keeps => {
                    res.send(handleResponse(action, keeps))
                })
                .catch(error => {
                    return next(handleResponse(action, null, error))
                })
        }
    },
    // postKeep: {
    //     path: '/keeps',
    //     reqType: 'post',
    //     method(req, res, next) {
    //         var action = actions.create

    //         let model = new schema(req.body)
    //         model.creatorId = req.session.uid

    //         model.save()
    //             .then(data => {
    //                 return res.send(handleResponse(action, data))
    //             })
    //             .catch(error => {
    //                 return next(handleResponse(action, null, error))
    //             })
    //     }
    // },
    // sharedBoards: {
    //     path: '/vaults/:vaultId/keeps',
    //     reqType: 'get',
    //     method(req, res, next) {
    //         let action = 'Get Vault Keeps'
    //         Vaults.findById(req.params.vaultId)
    //             .then(vault => {
    //                 var vaultKeeps = []
    //                 Keeps.find({ _id: { $in: vault.keeps } }).then(keeps => {
    //                     res.send(handleResponse(action, keeps))
    //                 })
    //             }).catch(error => {
    //                 return next(handleResponse(action, null, error))
    //             })
    //     }
    // }
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
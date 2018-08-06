let Vaults = require('../models/vault')
let Keeps = require('../models/keep')

module.exports = {
    getPublicKeeps: {
        path: '/keeps/public/get',
        reqType: 'get',
        method(req, res, next) {
            let action = 'Get public keeps'
            Keeps.find({ private: false })
                .then(keeps => {
                    res.send(handleResponse(action, keeps))
                })
                .catch(error => {
                    return next(handleResponse(action, null, error))
                })
        }
    },
    incrementKeep: {
        path: '/keeps/increment/:keepId',
        reqType: 'post',
        method(req, res, next) {
            let action = 'Increment Keep Adds'
            Keeps.findById(req.params.keepId)
                .then(keep => {
                    keep.adds++
                    keep.save()
                    res.send(handleResponse(action, keep))
                })
                .catch(error => {
                    return next(handleResponse(action, null, error))
                })
        }
    },
    search: {
        path: '/search',
        reqType: 'post',
        method(req, res, next) {
            let action = 'Increment Keep Adds'
            Keeps.find({ $text: { $search: req.body.value } })
            .where('private').equals(false)
                .then(keeps => {
                    res.send(handleResponse(action, keeps))
                })
                .catch(error => {
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
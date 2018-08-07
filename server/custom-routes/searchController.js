var express = require('express')
var router = express.Router()
var Keeps = require('../models/keep')

//Standard routes get/push/put/delete 
router
    .post('/', (req, res, next) => {
        Keeps.find({ $text: { $search: req.body.value } })
            .where('private').equals(false)
            .then(keeps => {
                res.send(handleResponse(keeps))
            })
            .catch(error => {
                return next(handleResponse( null, error))
            })
    })

// ERROR HANDLER
router.use('/', (err, req, res, next) => {
    if (err) {
        res.send(418, {
            success: false,
            error: err.message
        })
    } else {
        res.send(400, {
            success: false,
            error: 'Something failed please try again later'
        })
    }
})

module.exports = router


function handleResponse( data, error) {
    var response = {
        data: data
    }
    if (error) {
        response.error = error
    }
    return response
}
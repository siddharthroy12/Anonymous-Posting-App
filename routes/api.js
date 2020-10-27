const express = require('express')
const router = express.Router()

const TodoModel = require('../model/todo')

router.get("/todo", (req, res, next) => {
    TodoModel.find({}, 'action date ip').sort({date:-1}).exec((err, data) => {
        if (!err) {
            res.json(data);
        } else {
            res.json({error: err});
        }
    })
})

router.post("/todo", (req, res, next) => {
    if (req.body.action) {
        console.log(req.ip);
        TodoModel.create({action:req.body.action,ip:req.ip}, (err, data) => {
            if (err) {
                console.log(err)
                next()
            } else {
                res.json(data)
            }
        })
    } else {
        res.json({
            error:"Input field is empty"
        })
    }
})

router.delete("/todo/:id", (req, res) => {
    TodoModel.findOneAndDelete({"_id":req.params.id}, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.json(data)
        }
    })
})

module.exports = router
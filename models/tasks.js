const mongoose = require('mongoose')
const validator = require('validator')

const Task = mongoose.model('Task', {
    title: {
        type: String
    },
    description: {
        type: String
    },
    complete: {
        type: Boolean
    }
})


module.exports = Task


const express = require("express")
const router = express.Router()
const Task = require("../models/tasks")


router.get('/tasks/create', (req, res) => {
    res.render("tasks/create", { values: req.body})
})

router.post('/tasks/create', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).redirect("/tasks")
    } catch (e) {
        res.status(400).send(e)
    }
})
  
router.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find()
        res.render("tasks/index", {tasks})
    } catch(e) {
        res.status(500).send()
    }
    
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)

        if (!task) {
            return res.status(404).send("not found user")
        }

        res.render("tasks/view", {task})
    } catch (e) {
        res.status(500).send()
    }
})

router.get("/tasks/:id/edit", async (req, res) =>{
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)

        if (!task) {
            return res.status(404).send("not found user")
        }

        res.render("tasks/edit", {task, values: req.body})
    } catch (e) {
        res.status(500).send()
    }
})
  
router.post('/tasks/:id/edit', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'description', "complete"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!task) {
            return res.status(404).send()
        }

        res.redirect('/tasks')
    } catch (e) {
        res.status(400).send(e)
    }
})



router.post('/tasks/:id/delete', async (req, res) => {
    try {
        const user = await Task.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()
        }

        res.redirect("/tasks")
    } catch (e) {
        res.status(500).send()
    }
})
module.exports = router
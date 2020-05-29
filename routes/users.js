
const express = require("express")
const router = express.Router()
const User = require("../models/users")


router.get('/users/create', (req, res) => {
    res.render("users/create", { values: req.body})
})

router.post('/users/create', async (req, res) => {
    const user = new User(req.body)
    
    try {
        await user.save()
        res.status(201).redirect("/users")
    } catch (e) {
        res.status(400).send(e)
    }
})
  
router.get("/users", async (req, res) => {
    try {
        const users = await User.find()
        res.render("users/index", {users})
    } catch(e) {
        res.status(500).send()
    }
    
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send("not found user")
        }

        res.render("users/view", {user})
    } catch (e) {
        res.status(500).send()
    }
})

router.get("/users/:id/edit", async (req, res) =>{
    const _id = req.params.id

    try {
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send("not found user")
        }
        console.log(user);
        res.render("users/edit", {user})
    } catch (e) {
        res.status(500).send()
    }
})
  
router.post('/users/:id/edit', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!user) {
            return res.status(404).send()
        }

        res.redirect('/users')
    } catch (e) {
        res.status(400).send(e)
    }
})



router.post('/users/:id/delete', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()
        }

        res.redirect("/users")
    } catch (e) {
        res.status(500).send()
    }
})
module.exports = router
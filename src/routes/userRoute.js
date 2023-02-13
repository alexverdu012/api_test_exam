const Router = require('express')
const router = Router()

const User = require('../database/schema/User')

router.get('/', async (req, res) => {
    const userList = await User.find()
    if (!userList || userList.length == 0) res.status(204)
    else res.status(200).send(userList)
})

router.get('/:id', async (req, res) => {
    const {id} = req.params
    const userFound = null
    try {
        const userFound = await User.findById(id)
        if (!userFound) res.status(404).send({error: 'User not found'})
        else res.status(200).send(userFound)
    } catch (error) {
        res.status(400).send({error: 'Wrong id format', errorLog: error})
    }
    
    
})


router.post('/create', async (req, res) => {
    const {username, email, password} = req.body
    const existingUser = await User.findOne({email})
    console.log(existingUser)
    if (existingUser) res.status(409).send({error: 'Email already exists'})
    else {
        await User.create({username, email, password})
        res.sendStatus(201)
    }
})


router.put('/update/:id', async (req, res) => {
    const {id} = req.params
    try {
        const userFound = await User.findById(id)
        if (!userFound) res.status(404).send({error: 'User not found'})
        else {
            const {username, password} = req.body
            await User.updateOne({_id: id}, {$set: {username, password}})
            .then((data) => res.status(204).json(data))
            .catch((error) => res.status(400).json({error: 'Error'}))
        }
    } catch (error) {
        res.status(400).send({error: 'Wrong id format', errorLog: error})
    }
})
module.exports = router
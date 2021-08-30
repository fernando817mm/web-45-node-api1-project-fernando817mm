// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model');

const server = express();

server.use(express.json());

//ENDPOINTS:

server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({
                message: "The users information could not retrieved"
            })
        })
})

server.post('/api/users', (req, res) => {
    const user = req.body;
    const { name, bio } = user;
    (!name || !bio)
    ? res.status(400).json({ message: "Please provide name and bio for the user" })
    : User.insert(user)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json({
                message: "There was an error while saving the user to the database"
            })
        });
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    User.findById(id)
        .then(user => {
            (!user)
            ? res.status(404).json({ message: "The user with the specified ID does not exist"})
            : res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json({ message: "The user information could not be retrieved"})
        })
})

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    const { name, bio } = changes;
    (!name || !bio)
    ? res.status(400).json({ message: "Please provide name and bio for the user"})
    : User.update(id, changes)
        .then(user => {
            (!user)
            ? res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
            : res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({
                message: "The user information could not be modified"
            })
        })
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    User.remove(id)
        .then(user => {
            (!user)
            ? res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
            : res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({ message: "The user could not be removed"})
        })
})

server.use('*', (req, res) => {
    res.status(200).json({ message: 'hello world again!'});
})

module.exports = server; // EXPORT YOUR SERVER instead of {}

const express = require('express')

const routes = express.Router()

const GithubController = require('./controllers/GithubController')

routes.get('/api/users', GithubController.usersList)
routes.get('/api/users/:username/details', GithubController.userDetails)
routes.get('/api/users/:username/repos', GithubController.userRepositories)

module.exports = routes
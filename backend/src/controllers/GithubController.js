const request = require('request')
const querystring = require('querystring')
const config = require('../config')

module.exports = {
    async usersList(req, res) {    
        
        await request.get(
            {
              url: 'https://api.github.com/users?since='+req.query.since+'&per_page=10',
              headers: config
            },
            (error, response, body) => {
                if(!error && response.statusCode === 200) {                                         
                    res.send(response)
                }else{
                    res.send([])
                }              
            }
        )
    },

    async userDetails(req, res) {
        await request.get(
            {
              url: 'https://api.github.com/users/'+req.params.username,
              headers: config
            },
            (error, response, body) => {
                if(!error && response.statusCode === 200) {
                    res.send(body)
                }else{
                    res.send([])
                }              
            }
        )
    },

    async userRepositories(req, res) {
        await request.get(
            {
              url: 'https://api.github.com/users/'+req.params.username+'/repos',
              headers: config
            },
            (error, response, body) => {
                if(!error && response.statusCode === 200) {
                    res.send(body)
                }else{
                    res.send([])
                }              
            }
        )
    }
}
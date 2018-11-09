import React, { Component } from 'react'
import api from '../../services/api'

import './Details.css'

import githubLogo from './github-icon.svg'

import Infos from '../../components/Users/Infos'
import Repositories from '../../components/Users/Repositories'

export default class Details extends Component {
  state = {
    loading: true,
    user: {},
    repositories: []
  }

  async componentDidMount(){    
    const { username } = this.props.match.params

    const response = await api.get('/users/'+username+'/details')
    const repos = await api.get('/users/'+username+'/repos')

    this.setState({ user: response.data, repositories: repos.data, loading: false })           
  } 

  render() { 
    if(this.state.loading){
        return(
          <div id="loading"><img src="/loading.gif" alt="loading" /></div>
        )
    }else{  
        if(Object.keys(this.state.user).length > 0){  
            
            let repos
            if(this.state.repositories.length > 0){
                repos = this.state.repositories.map(repo => (
                    <Repositories key={repo.id} repo={repo} />
                ))
            }else{
                repos = <tr><td colSpan="3">No repositories available.</td></tr>
            }
            
            return (    
                <div className="user-wrapper">            
                    <div className="profile-picture">
                        <img width={150} height={150} src={this.state.user.avatar_url} alt={this.state.user.login} />
                    </div>    

                    <h1>/{this.state.user.login}</h1> 
                    
                    <Infos user={this.state.user} />

                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>URL</th>
                            </tr>
                        </thead>

                        <tbody>
                            {repos}
                        </tbody>
                    </table>  

                    <a href="/" className="btnBack">Back</a>
                </div>
            )
        }else{
            return (    
                <div className="user-wrapper">            
                    <div className="profile-picture">
                        <img height={150} src={githubLogo} alt="Github Client" />
                    </div>    

                    <h1>User unknown :X</h1>                                          

                    <a href="/" className="btnBack">Back</a>
                </div>
            )
        }
    }
  }
}

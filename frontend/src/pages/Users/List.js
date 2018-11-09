import React, { Component } from 'react'

import api from '../../services/api'

import githubLogo from './github-icon.svg'
import './List.css'

import User from '../../components/Users/User'

export default class List extends Component {
  state = {
    loading: true,    
    history: [0],
    nextPage: 0,    
    users: []
  }

  /*
    The Github API is not returning the paging links correctly in the Response Header. 
    You should bring the next and the previous one, according to the documentation available at https://developer.github.com/v3/#link-header. 
    In order to deliver the complete solution, I implemented the following function that makes navigation work.
  */
  async changePage(location) {
    this.setState({ loading: true })     

    if(location === 'prev'){
        if(this.state.history.length > 1){
            this.state.history.pop()
        }
    }else{
        this.state.history.push(this.state.nextPage)
    }    
    
    //Load the next/prev page of users, with ID started in the last element of array "this.state.history" and update the state of component
    const response = await api.get('/users?since='+this.state.history[this.state.history.length - 1])
    
    //Get only the number available in the link returned by API
    const nextLink = ((response.data.headers.link).split('; rel="next"'))[0].slice(1, -1)  

    this.setState({ users: JSON.parse(response.data.body), nextPage: nextLink.match(/\d+/)[0], loading: false })    
  }

  async componentDidMount(){                       
    //Load the first page of users, with ID started in 0 and update the state of component
    const response = await api.get('/users?since=0')       
    const nextLink = ((response.data.headers.link).split('; rel="next"'))[0].slice(1, -1)  
    
    this.setState({ users: JSON.parse(response.data.body), prevPage: 0, nextPage: nextLink.match(/\d+/)[0], loading: false })    
  }    

  render() {    
    if(this.state.loading){
        return(
          <div id="loading"><img src="/loading.gif" alt="loading" /></div>
        )
    }else{

        if(this.state.users.length > 0){
            return (            
                <div className="list-users-wrapper">
                    
                    <img height={150} src={githubLogo} alt="Github Client" />

                    <h1>Users List</h1>

                    <ul className="list-users">
                    { this.state.users.map(user => (
                        <User key={user.id} user={user} />
                    ))}
                    </ul>

                    <ul className="pagination">        
                        <li>
                            <button type="button" onClick={(e) => this.changePage('prev', e)}>Prev</button>              
                        </li>
                    
                        <li>
                            <button type="button" onClick={(e) => this.changePage('next', e)}>Next</button>  
                        </li>                
                    </ul>
                </div>
            )
        }else{
            return (            
                <div className="list-users-wrapper">
                    
                    <img height={150} src={githubLogo} alt="Github Client" />

                    <h1>No users available... :(</h1>
                    
                </div>
            )
        }
    }
  }
}
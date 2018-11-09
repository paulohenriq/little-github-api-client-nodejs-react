import React, { Component } from 'react'

import './User.css'

export default class User extends Component {
  render() {
    const { user } = this.props
    let urlUser = '/user/'+user.login+'/details'

    return (                
        <li className="user">            
            <a href={urlUser}>
                <span>{user.id}</span>
                <strong>{user.login}</strong>
            </a>
        </li>   
    )
  }
}

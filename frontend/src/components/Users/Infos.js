import React, { Component } from 'react'
import Moment from 'moment'

import './Infos.css'

export default class Infos extends Component {
  render() {
    const { user } = this.props    
    Moment.locale('tr') 

    return (                
        <ul>
            <li><strong>ID:</strong>{user.id}</li>
            <li><strong>Profile:</strong><a href={user.html_url} target="_blank" rel="noopener noreferrer">{user.html_url}</a></li>
            <li>
                <strong>Created at:</strong>
                {Moment(user.created_at).format('DD/MM/YYYY - HH:mm')}                                      
            </li>
        </ul>  
    )
  }
}

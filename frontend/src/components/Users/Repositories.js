import React, { Component } from 'react'

import './Repositories.css'

export default class Repositories extends Component {  
  render() {
    const { repo } = this.props    

    return (                        
        <tr>
            <td>{repo.id}</td>
            <td>{repo.name}</td>
            <td>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    {repo.html_url}
                </a>
            </td>
        </tr>        
    )
  }
}

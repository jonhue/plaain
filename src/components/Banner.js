import React, { Component } from 'react'
import './Banner.scss'

class Banner extends Component {
  render() {
    return (
      <div className="Banner">
        <h2>{this.props.title}</h2>
        <p>{this.props.text}</p>
        {this.props.linkUrl && (
          <a
            href={this.props.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {this.props.linkText || 'Help'}
          </a>
        )}
      </div>
    )
  }
}

export default Banner

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './PersonList.scss'

class PersonList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      wrapped: true,
    }
  }

  toggle() {
    this.setState({
      wrapped: !this.state.wrapped,
    })
  }

  render() {
    return (
      <div className="PersonList">
        {this.props.people
          .slice(0, this.state.wrapped ? 10 : this.props.people.length)
          .map((person, index) => {
            return (
              <p key={index}>
                <Link to={`/app/person/${person.id}`}>{person.name}</Link> ·{' '}
                <span>{person[this.props.attribute]}</span>
              </p>
            )
          })}
        <span onClick={this.toggle.bind(this)}>
          {this.state.wrapped ? 'Show more' : 'Show less'}
        </span>
      </div>
    )
  }
}

export default PersonList

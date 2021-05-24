import React, { Component } from 'react'
import axios from 'axios'
import Loading from './Loading'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getUsers() {
    this.setState({
      loading: true,
    });

    axios('https://api.randomuser.me/?nat=US&results=5')
      .then(response => this.setState({
        users: [...this.state.users, ...response.data.results],
        loading: false
      }));
  }
  componentWillMount() {
    this.getUsers();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.getUsers();
    console.log('more users loaded');
  }

  render() {
    return (
      <div className="App">
        {!this.state.loading ?
          this.state.users.map(user => (
            <div>
              <h3>{user.name.first}</h3>
              <p>{user.email}</p>
              <hr />
              <form onSubmit={this.handleSubmit}>
                <input type="submit" value="load users" />
              </form>
            </div>
          )) :
          <Loading />
        }
      </div>
    )
  }
}

export default App;
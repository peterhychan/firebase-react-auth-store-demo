import React, { Component } from "react";
import { db, auth } from "./services/firebase";

class App extends Component {
  state = {
    users: null
  };

  componentDidMount() {
    db.collection("users")
      .get()
      .then(snapshot => {
        const users = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          users.push(data);
          this.setState({ users });
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <h1>Users</h1>
        {this.state.users &&
          this.state.users.map(user => {
            return (
              <div key={user.name}>
                <p>{user.name}</p>
                <p>{user.job}</p>
                <p>{user.email}</p>
                <hr />
              </div>
            );
          })}
      </div>
    );
  }
}

export default App;

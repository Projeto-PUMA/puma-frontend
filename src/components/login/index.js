import React, { Component } from 'react';

const styles = {
  form: {
    margin: 25,
  },
};

class Login extends Component {
  
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    
    const formData = {};
    for (const field in this.refs) {
      formData[field] = this.refs[field].value;
    }

    let data = JSON.stringify(formData);

    console.log(data);

    fetch('http://localhost:8080/auth', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: data,
    });
  }

  render() {
    return (
        <div>
          <form onSubmit={this.handleSubmit} style={styles.form}>
            <label>
              CPF:
              <input ref="username" className="username" type='text' name="username"/>
            </label>
            <label>
              Senha:
              <input ref="password" className="password" type='password' name="password"/>
            </label>
            <input type="submit" value="Submit"/>
          </form>
        </div>
    );
  }
}

export default Login;

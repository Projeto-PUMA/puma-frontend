import React, { Component } from 'react';
import axios from 'axios';
import * as jwt_decode from "jwt-decode";
import ReactDOM from 'react-dom';
import Home from '../home/index';
import * as Store from '../../store';

class Projects extends Component {
  
  constructor(props) {
    super(props);
  }

// AQUI TU MUDA PRA SER UM GET
//   handleProjects(e) {
//     e.preventDefault();

//     const data = {};
//     for (const field in this.refs) {
//       data[field] = this.refs[field].value;
//     }

//     const path = Store['backend'].path; // This is backend path
//     axios.post(path + '/auth', {
//       username: data['username'],
//       password: data['password'],
//     })
//     .then(response => { alert('aconteceu com sucesso') })
//     .catch(function (error) {
//       if (error) {
//         alert('Erro ao processar os projetos!');
//       }
//     });
//   }

  render() {
    return (
			<div /*style={{height: "100vh"}}*/>
				<h1>to amando</h1>
			</div>
    );
  }
}

export default Projects;

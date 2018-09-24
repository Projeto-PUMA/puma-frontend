import React, { Component } from 'react';
import axios from 'axios';
import * as jwt_decode from "jwt-decode";
import ReactDOM from 'react-dom';
import Home from '../home/index';
import * as Store from '../../store';
import ViewProject from './viewProject';

 function viewProject() {
   ReactDOM.render(
     <ViewProject />,
     document.getElementById('center')
   );
 }

class Projects extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      project: new Array()
    };
  }

  componentWillMount(){
    const data = {};
    for(const field in this.refs){
      data[field] = this.refs[field].value;
    }
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser && currentUser.token;
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;
    axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
    const path = Store['backend'].path;
    axios.get(path + '/sec/project/listAll')
                      .then(response => {
                        this.setProjects(response)
                      })
                      .catch(() => {alert('Não foi possível processar os projetos')});
  }

  setProjects(response){
    for(var i=0; i<response.data.length; i++){
      this.setState({
        project:
        this.state.project.concat(response.data[i])
      })
    }
  }

  

  getDecodedAccessToken(token){
    try{
      return jwt_decode(token);
    }
    catch(Error){
      return null;
    }
  }

  render() {
    const data = this.state.project;
    return (
			<div /*style={{height: "100vh"}}*/>
        <table>
          <thead>
            <tr>
              <th>Titulo</th>

              <th>Área do Projeto</th>

              <th>Subárea do Projeto</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map(function(d, idx){
        			return (<tr key={idx}><td>{d.title}</td><td>{d.projectArea}</td><td>{d.projectSubArea}</td>
              <td><i className="fas fa-edit" onClick={() => {viewProject()}}></i></td>
              <td><i className="fas fa-trash" onClick={() => {console.log("clicked")}}></i></td></tr>)
       			})}
          </tbody>
        </table>
    	</div>
    );
  }
}

export default Projects;

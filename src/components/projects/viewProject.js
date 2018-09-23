import React, { Component } from 'react';
import axios from 'axios';
import * as jwt_decode from "jwt-decode";
import ReactDOM from 'react-dom';
import Home from '../home/index';
import * as Store from '../../store';

class ViewProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            project: new Array()
        };
    }

    componentWillMount() {
        const data = {};
        for (const field in this.refs) {
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
            .catch(() => { alert('Não foi possível processar os projetos') });
    }

    setProjects(response) {
        for (var i = 0; i < response.data.length; i++) {
            this.setState({
                project:
                    this.state.project.concat(response.data[i])
            })
        }
    }



    getDecodedAccessToken(token) {
        try {
            return jwt_decode(token);
        }
        catch (Error) {
            return null;
        }
    }

    render() {
        const data = this.state.project;
        return (
            <div /*style={{height: "100vh"}}*/>
                {/* <table> */}
                {/* <thead> */}
                <div>
                    <h1>Titulo</h1>
                    <tbody>
                        {data.map(function (d, idx) {
                            return (<div key={idx}><p>{d.title}</p>
                            </div>)
                        })}
                    </tbody>
                    <h2>Resumo</h2>
                    <tbody>
                        {data.map(function (d, idx) {
                            return (<div key={idx}><p>{d.summary}</p>
                            </div>)
                        })}
                    </tbody>
                    <h2>Problemática</h2>
                    <tbody>
                        {data.map(function (d, idx) {
                            return (<div key={idx}><p>{d.body}</p>
                            </div>)
                        })}
                    </tbody>
                    <h2>Área do Projeto</h2>
                    <tbody>
                        {data.map(function (d, idx) {
                            return (<div key={idx}><p>{d.projectArea}</p>
                            </div>)
                        })}
                    </tbody>
                    <h2>Subárea do Projeto</h2>
                    <tbody>
                        {data.map(function (d, idx) {
                            return (<div key={idx}><p>{d.projectSubArea}</p>
                            </div>)
                        })}
                    </tbody>
                    <h2>Tipo Pessoa</h2>

                    {/* <th></th> */}
                </div>
                {/* </thead> */}
                {/* <tbody>
            {data.map(function(d, idx){
        			return (<div key={idx}><p>{d.title}</p><p>{d.summary}</p><p>{d.body}</p><p>{d.projectArea}</p><p>{d.projectSubArea}</p><p>{d.projectAuthorCategory}</p>
                        </div>)
       			})}
          </tbody> */}
                {/* </table> */}
            </div>
        );
    }
}

export default ViewProject;

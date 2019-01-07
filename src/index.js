import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from '../src/components/home/index';
import Login from '../src/components/login/index';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Register from './components/register';
import MyProjects from './components/myProjects';
import ProjectSubmission from './components/projectSubmission';
import Projects from './components/projects';
import NewsSubmission from './components/newsSubmission';
import News from './components/news/index';
import ViewNews from './components/news/viewNews'
import ViewProject from './components/projects/viewProject';
import UpdateNews from './components/newsUpdate/index';

ReactDOM.render(
  <Router history={browserHistory}>
      <Route path='/' component={App}>
          <IndexRoute component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/cadastro' component={Register} />
          <Route path='/meusprojetos' component={MyProjects} />
          <Route path='/projeto' component={ViewProject} />
          <Route path='/submeterprojeto' component={ProjectSubmission} />
          <Route path='/gerenciarprojetos' component={Projects} />
          <Route path='/submeternoticia' component={NewsSubmission} />
          <Route path='/noticia' component={ViewNews} />
          <Route path='/noticia/editar' component={UpdateNews} />
          <Route path='/gerenciarnoticias' component={News} />
      </Route>
  </Router>
  , document.getElementById('root'));
registerServiceWorker();

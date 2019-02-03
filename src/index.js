import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

import './index.css';

import App from './App';
import Home from '../src/components/home/index';

import Login from '../src/components/login/index';
import Register from './components/register';

import News from './components/news/index';
import ViewNews from './components/news/show';
import NewsSubmission from './components/news/submission';

import Projects from './components/projects/index';
import ViewProject from './components/projects/show';
import ProjectSubmission from './components/projects/submission';
import MyProjects from './components/projects/myProjects';

import ProjectUpdate from './components/projectUpdate/index';
import Confirmation from './helpers/confirmation';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path='/' component={App}>
				<IndexRoute component={Home} />
				<Route path='/login' component={Login} />
				<Route path='/cadastro' component={Register} />
				<Route path='/confirmacao' component={Confirmation} />
				<Route path='/meusprojetos' component={MyProjects} />
				<Route path='/projeto' component={ViewProject} />
				<Route path='/submeterprojeto' component={ProjectSubmission} />
				<Route path='/gerenciarprojetos' component={Projects} />
				<Route path='/submeternoticia' component={NewsSubmission} />
				<Route path='/noticia' component={ViewNews} />
				<Route path='/gerenciarnoticias' component={News} />
				<Route path='/projeto/editar' component={ProjectUpdate} />
			</Route>
		</Router>
	</Provider>
	, document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Login from './components/login/index';
import { BrowserRouter, Switch, Route  } from 'react-router-dom';
import Index from './components/sidebar/index';

const Root = () => (
    <Index>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={App} />
                    <Route path="/login" component={Login} /> 
            </Switch>
        </BrowserRouter>
    </Index>
);
ReactDOM.render(
    <Root/>
    , document.getElementById('root'));
registerServiceWorker();



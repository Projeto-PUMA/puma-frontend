import React from "react";
import PropTypes from "prop-types";
import ReactDOM from 'react-dom';
import MaterialTitlePanel from "./materialTitlePanel";

import Login from '../login/index';
import ProjectSubmission from '../projectSubmission/index';

const styles = {
  sidebar: {
    width: 256,
    height: "100%"
  },
  sidebarLink: {
    display: "block",
    padding: "16px 0px",
    color: "#757575",
    textDecoration: "none"
  },
  divider: {
    margin: "8px 0",
    height: 1,
    backgroundColor: "#757575"
  },
  content: {
    padding: "16px",
    height: "100%",
    backgroundColor: "white"
  }
};

const SidebarContent = props => {
  const style = props.style
    ? { ...styles.sidebar, ...props.style }
    : styles.sidebar;

  function login() {
    ReactDOM.render(
      <Login />,
      document.getElementById('center')
    );
  }

  function projectSubmission() {
    ReactDOM.render(
      <ProjectSubmission />,
      document.getElementById('center')
    );
  }

  function logout() {
    try{
      if(localStorage.getItem('currentUser')){
        localStorage.removeItem('authorities');
        localStorage.removeItem('currentUser');
        window.location.reload();
        return true;
      }
      else {
        return false;
      }
    }
    catch(Error){
      return false;
    }
  }

  const logIn = <a href="#" onClick={login} style={styles.sidebarLink}>Entrar</a>;

  var logged = false;
  var adm = false;
  var user = false;

  var role = JSON.parse(localStorage.getItem('authorities'));
  if(role) {
    for(var i=0; i<role.length; i++) {
      if(role[i].authority.includes("ADMIN")) {
        adm = true;
      }
      if(role[i].authority.includes("USER")) {
        user = true;
      }
    }
  }

  var currentUser = JSON.parse(localStorage.getItem('currentUser'));
  var token = currentUser && currentUser.token;
  if(token) {
    logged = true;
  }

  const logOut = <a href="#" onClick={logout} style={styles.sidebarLink}>Sair</a>;

  const admLinks = [];
  const userLinks = [];
  userLinks.push(<a href="#" onClick={projectSubmission} style={styles.sidebarLink}>Submeter Projeto</a>);
  admLinks.push(<a href="#" onClick={() => {}} style={styles.sidebarLink}>Gerenciar Projetos</a>);
  admLinks.push(<a href="#" onClick={() => {}} style={styles.sidebarLink}>Submeter Notícia</a>);
  admLinks.push(<a href="#" onClick={() => {}} style={styles.sidebarLink}>Gerenciar Notícias</a>);

  return (
    <MaterialTitlePanel title="Menu" style={style}>
      <div style={styles.content}>
        { logged ? logOut : logIn }
        <div style={styles.divider} />
        { user ? userLinks : null }
        { adm ? [userLinks, admLinks] : null }
      </div>
    </MaterialTitlePanel>
  );
};

SidebarContent.propTypes = {
  style: PropTypes.object
};

export default SidebarContent;

import React from "react";
import { Link } from "react-router";
import PropTypes from "prop-types";
import MaterialTitlePanel from "./materialTitlePanel";

const styles = {
  sidebar: {
    width: 256,
    height: "100%"
  },
  sidebarLink: {
    display: "block",
    padding: "16px 0px",
    color: "#757575",
    fontSize: 16,
    backgroundColor: 'transparent',
    border: 'none',
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

  const unloggedLinks = [];
  // <Link to='/login' key="6" style={styles.sidebarLink}>Entrar</Link>
  // no lugar de
  // <button key="6" onClick={login} style={styles.sidebarLink}>Entrar</button>
  unloggedLinks.push(<Link to='/login' key="6" style={styles.sidebarLink}>Entrar</Link>);
  unloggedLinks.push(<Link to='/cadastro' key="8" style={styles.sidebarLink}>Registrar-se</Link>);

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

  const logOut = <Link to='/' key="7" onClick={logout} style={styles.sidebarLink}>Sair</Link>;

  const admLinks = [];
  const userLinks = [];
  userLinks.push(<Link to='submeterprojeto' key="1" style={styles.sidebarLink}>Submeter Projeto</Link>);
  userLinks.push(<Link to='/meusprojetos' key="2" style={styles.sidebarLink}>Meus Projetos</Link>);
  admLinks.push(<Link to='/gerenciarprojetos' key="3" style={styles.sidebarLink}>Gerenciar Projetos</Link>);
  admLinks.push(<Link to='/submeternoticia' key="4" style={styles.sidebarLink}>Submeter Notícia</Link>);
  admLinks.push(<Link to='/gerenciarnoticia' key="5" style={styles.sidebarLink}>Gerenciar Notícias</Link>);

  return (
    <MaterialTitlePanel title="Menu" style={style}>
      <div style={styles.content}>
        { logged ? logOut : unloggedLinks }
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

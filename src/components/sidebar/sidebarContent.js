import React from "react";
import { Link } from "react-router";
import PropTypes from "prop-types";
import MaterialTitlePanel from "./materialTitlePanel";
import page from '../../images/blank-file.png';
import shop from '../../images/shopping-cart.png';
import news from '../../images/newspaper.png';
import graph from '../../images/bar-chart.png';
import stack from '../../images/stack-of-paper-outline.png';
import exit from '../../images/exit.png';
import addUser from '../../images/add-user.png';
import login from '../../images/login.png';
import { tokenInfo, token } from '../../helpers/token';

const styles = {
  sidebar: {
    width: 256,
    height: "100%"
  },
  sidebarLink: {
    display: "block",
    padding: "16px 0px",
    color: "#09545e",
    fontSize: 16,
    backgroundColor: 'transparent',
    border: 'none',
  },
  divider: {
    margin: "8px 0",
    height: 1,
    backgroundColor: "#09545e"
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
    try {
      if (localStorage.getItem('currentUser')) {
        localStorage.removeItem('authorities');
        localStorage.removeItem('currentUser');
        return true;
      }
      else {
        return false;
      }
    }
    catch (Error) {
      return false;
    }
  }

  const unloggedLinks = [];
  unloggedLinks.push(<Link to='/login' key="6" style={styles.sidebarLink}><img className="img-responsive" src={login} alt="login" style={{ height: 25, marginRight: 7, marginTop: -2 }} />Entrar</Link>);
  unloggedLinks.push(<Link to='/cadastro' key="8" style={styles.sidebarLink}><img className="img-responsive" src={addUser} alt="addUser" style={{ height: 25, marginRight: 7, marginTop: -2 }} />Registrar-se</Link>);

  var logged = false;
  var adm = false;
  var user = false;
  var coordinator = false;
  var professor = false;
  var student = false;
  var monitor = false;
  var secretary = false;

  if (tokenInfo()) {
    var role = tokenInfo().papel;
    console.log(role);
    if (role) {
      for (var i = 0; i < role.length; i++) {
        if (role[i].includes("ADMIN")) {
          adm = true;
        }
        if (role[i].includes("USUARIO")) {
          user = true;
        }
        if (role[i].includes("COORDENADOR")) {
          coordinator = true;
        }
        if (role[i].includes("PROFESSOR")) {
          professor = true;
        }
        if (role[i].includes("ALUNO")) {
          student = true;
        }
        if (role[i].includes("MONITOR")) {
          monitor = true;
        }
        if (role[i].includes("SECRETARIA")) {
          secretary = true;
        }
      }
    }
  }

  if (token() && tokenInfo().papel) {
    logged = true;
  }

  const logOut = <Link to='/' key="7" onClick={logout} style={styles.sidebarLink}><img className="img-responsive" src={exit} alt="exit" style={{ height: 25, marginRight: 7, marginTop: -2 }} />Sair</Link>;

  const admLinks = [];
  const userLinks = [];
  userLinks.push(<Link to='submeterprojeto' key="1" style={styles.sidebarLink}><img className="img-responsive" src={page} alt="page" style={{ height: 25, marginRight: 7, marginTop: -2 }} /> Submeter Projeto</Link>);
  userLinks.push(<Link to='/meusprojetos' key="2" style={styles.sidebarLink}><img className="img-responsive" src={stack} alt="stack" style={{ height: 25, marginRight: 7, marginTop: -2 }} />Meus Projetos</Link>);
  admLinks.push(<Link to='/gerenciarprojetos' key="3" style={styles.sidebarLink}><img className="img-responsive" src={shop} alt="shop" style={{ height: 25, marginRight: 7, marginTop: -2 }} />Gerenciar Projetos</Link>);
  admLinks.push(<Link to='/submeternoticia' key="4" style={styles.sidebarLink}><img className="img-responsive" src={news} alt="news" style={{ height: 25, marginRight: 7, marginTop: -2 }} />Submeter Notícia</Link>);
  admLinks.push(<Link to='/gerenciarnoticias' key="5" style={styles.sidebarLink}><img className="img-responsive" src={graph} alt="graph" style={{ height: 25, marginRight: 7, marginTop: -2 }} />Gerenciar Notícias</Link>);

  return (
    <MaterialTitlePanel title="Menu" style={style}>
      <div style={styles.content}>
        {/* <Link to='/' key="0" style={styles.sidebarLink}><img className="img-responsive" src={page} alt="page" style={{height: 25, marginRight: 7, marginTop:-2}}/> Página Inicial</Link> */}
        {logged ? logOut : unloggedLinks}
        <div style={styles.divider} />
        {user ? userLinks : null}
        {adm ? [userLinks, admLinks] : null}
        {coordinator ? [userLinks, admLinks] : null}
        {professor ? [userLinks] : null}
        {student ? [userLinks] : null}
        {monitor ? [userLinks, admLinks] : null}
        {secretary ? [userLinks, admLinks] : null}
      </div>
    </MaterialTitlePanel>
  );
};

SidebarContent.propTypes = {
  style: PropTypes.object
};

export default SidebarContent;

import React from "react";

import Sidebar from "./sidebar";
import MaterialTitlePanel from "./materialTitlePanel";
import SidebarContent from "./sidebarContent";
import { browserHistory } from 'react-router';

const styles = {
  contentHeaderMenuLink: {
    fontSize: 20,
    color: "white",
    backgroundColor: 'transparent',
    border: 'none',
  },
  content: {
    padding: "16px"
  }
};

export default class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      docked: false,
      open: false,
      transitions: true,
      touch: true,
      shadow: true,
      pullRight: false,
      touchHandleWidth: 20,
      dragToggleDistance: 30
    };

    this.onSetOpen = this.onSetOpen.bind(this);
    this.menuButtonClick = this.menuButtonClick.bind(this);
  }

  onSetOpen(open) {
    this.setState({ open });
  }

  menuButtonClick(ev) {
    ev.preventDefault();
    this.onSetOpen(!this.state.open);
  }

  redirectHome() {
    browserHistory.push('/');
  }

  render() {
    const sidebar = <SidebarContent />;

    const contentHeader = (
      <span>
        {!this.state.docked && (
          <button
            onClick={this.menuButtonClick}
            href="#"
            style={styles.contentHeaderMenuLink}
          >
            =
          </button>
        )}
        <span> PUMA</span>
      </span>
    );

    const sidebarProps = {
      sidebar,
      docked: this.state.docked,
      sidebarClassName: "custom-sidebar-class",
      contentId: "custom-sidebar-content-id",
      open: this.state.open,
      touch: this.state.touch,
      shadow: this.state.shadow,
      pullRight: this.state.pullRight,
      touchHandleWidth: this.state.touchHandleWidth,
      dragToggleDistance: this.state.dragToggleDistance,
      transitions: this.state.transitions,
      onSetOpen: this.onSetOpen
    };

    return (
      <div>
        <Sidebar {...sidebarProps}>
          <MaterialTitlePanel title={contentHeader} />
        </Sidebar>
      </div>
    );
  }
}

import React, { Component } from 'react';

const styles = {
  navbar: {
    backgroundColor: '#222',
  },
  title: {
    color: '#fff',
  }
};

class Navbar extends Component {

  render() {
    return (
      <div style={{height: '100%'}}>
        <div style={styles.navbar}>
          <span style={styles.title}>PUMA</span>
        </div>
      </div>
    );
  }
}

export default Navbar;

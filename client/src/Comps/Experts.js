import React, { Component } from 'react'
import '../css/main.css'
import Topnav from '../Topnav'
import Featuredexperts from './Featuredexperts'
// import Footer from './Footer'


class Experts extends Component {
  render() {
    return (
      <div style={{position: 'relative'}}>
        <Topnav />

        <div className='experts-hero'>
          <h1>Our Experts</h1>
        </div>

        <Featuredexperts />
      </div>
    )
  }
}

export default Experts
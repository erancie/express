import React, { Component } from 'react'
import './css/main.css'
import Topnav from './Topnav'
import Featuredexperts from './Comps/Featuredexperts'
import Footer from './Footer'
import FadeIn from 'react-fade-in/lib/FadeIn'
import {FcParallelTasks, FcSerialTasks} from 'react-icons/fc'
// import { AiFillAliwangwang } from 'react-icons/ai'

class Landing extends Component {
  render() {
    return (
      <div style={{position: 'relative'}}>
        <Topnav />
        <div className='hero' >
          <FadeIn>
          <h1>i<span className='s'>S</span>ervice</h1>
          </FadeIn>
        </div>
        <FadeIn>
          <div className='my-5 hero2'>
            <h1>Explore the iService platform to get the right fit for the job!</h1>
          </div>
          <FcParallelTasks color={'f46f30'} size={140} style={{marginBottom: '100px'}} />
        
        </FadeIn>
        <div className='my-5 hero2'>
          <h1>Have full confidence with comprehensive reviews and contact information.</h1>
        </div>
        {/* <hr className='hr'/> */}
        <FcSerialTasks color={'f46f30'} size={140} />
        {/* <AiFillAliwangwang color={'f46f30'} size={140} /> */}

        {/* <h1>process.env</h1>
        <h1>.REACT_APP_TEST - {process.env.REACT_APP_TEST}</h1>
        <h1>.NODE_ENV - {process.env.NODE_ENV}</h1>
        <h1>.PORT - {process.env.PORT}</h1> */}
        
        <h1 className='featured'>Featured Experts</h1>
        <Featuredexperts />
        <Footer />
      </div>
    )
  }
}
export default Landing

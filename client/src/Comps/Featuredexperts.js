import React, { useState, useEffect } from 'react'
import {Row, Container, Col, Card, Button} from 'react-bootstrap'
import FadeIn from 'react-fade-in/lib/FadeIn';
// import avatar from '../Assets/avatar.jpg'
import prof1 from '../Assets/prof1.webp'
import prof2 from '../Assets/prof2.webp'
import prof3 from '../Assets/prof3.webp'
import prof4 from '../Assets/prof4.webp'
import prof5 from '../Assets/prof5.webp'
import prof6 from '../Assets/prof6.webp'

 const Featuredexperts = () => {

  const [experts, setExperts] = useState([])

  const [ avatar ] = useState([prof3, prof5, prof4, prof2, prof1, prof6])

  useEffect(() => getExperts(), [])  

  const getExperts =()=>{  
    fetch('experts')
    .then(response=> response.json() )
    .then((data) => {
      setExperts(data)
    })
    .catch(err => console.log(err))
  }

  const MapExpertCards = () => {
    const cards = [];
    experts.forEach((expert, i)=>{ 
      //replace with just () for implicit return
      // return( // or explicit 'return' required for .map() 
      cards.push(
        <Col key={expert._id.toString()} xs='12' md='6' lg='4' xl='3'>
          <FadeIn>
            <Card className='p-2 my-3 cardy' >
              <Card.Img variant="top" 
                        className='expert-img'
                        src={avatar[i]} 
                    /* src={expert.image} */
              />
              <Card.Body>
                <Card.Title>{expert.name}</Card.Title>
                <Card.Text>Location: {expert.address}</Card.Text>
                <Card.Text>Contact: {expert.mobile}</Card.Text>
                <Card.Text>Rating - {expert.rating}/5</Card.Text>
                <Button className='button' variant="primary">Contact {expert.name}</Button>
              </Card.Body>
            </Card>
          </FadeIn>
        </Col>   
      ) 
    })
    return cards
  }
  return (
    <div className='experts'>
      <Container fluid>
        <Row className='experts-row'> {/* style={{justifyContent: 'center'}} */}
          {MapExpertCards()}
          {/* {LoopExpertCards()} */}
        </Row>
      </Container>
    </div>
  )
}
export default Featuredexperts



// const LoopExpertCards = () => {
//   let cards =[];
//   for (const key in experts) {
//     cards.push(
//         <Col className='p-3' key={key.toString()} xs='12' md='6' lg='4' xl='3'>
//           <Card className='m-2' style={{ width: '18rem'}}>
//             <Card.Img variant="top" src={experts[key].image} />
//             <Card.Body>
//               <Card.Title>{experts[key].name}</Card.Title>
//               <Card.Text>{experts[key].text}</Card.Text>
//               <Card.Text>Rating - {experts[key].rating}/5</Card.Text>
//               <Button className='button' variant="primary">Contact {experts[key].name}</Button>
//             </Card.Body>
//           </Card>
//         </Col>
//     )
//   }
//   return cards;
// }
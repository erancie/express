import React, { useState, useEffect } from 'react'
import {Row, Container, Col, Card, Button} from 'react-bootstrap'
import FadeIn from 'react-fade-in/lib/FadeIn';
import avatar from '../Assets/avatar.jpg'

 const Featuredexperts = () => {

  const [experts, setExperts] = useState([])

  useEffect(() => getExperts(), [])  

  const getExperts =()=>{  
    fetch('/experts')
    .then(response=> response.json() )
    .then((data) => {
      setExperts(data)
    })
    .catch(err => console.log(err))
  }

  const MapExpertCards = () => {
    const cards = experts.map((expert)=>{ //replace with () for implicit return
      return( // or explicit 'return' required for .map() 
        <Col key={expert._id.toString()} xs='12' md='6' lg='4' xl='3'>
          <FadeIn>
            <Card className='p-2 my-3' style={{ width: '18rem', margin: 'auto'}}>
              <Card.Img variant="top" src={avatar} />
              {/* src={expert.image} */}
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
        <Row > {/* style={{justifyContent: 'center'}} */}
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
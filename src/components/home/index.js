import React, { Component } from 'react';
import Carousel from '../carousel/index.js'
import CarouselApp from '../carousel/index.js';
import { Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Row, Col } from 'reactstrap';

class Home extends Component {
  render() {
    return (
      <div id="center" style={{ marginTop: 30, marginBottom: 30, marginLeft:40, marginRight:40, align:'center' }}>
        <div >
      <Row >
      <Col sm="1"/>
        <Col sm="10">
      <Card>
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
        </CardBody>
        <CarouselApp />        
        <CardBody>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <CardLink href="#">Card Link</CardLink>
          <CardLink href="#">Another Link</CardLink>
        </CardBody>
      </Card>
      </Col>
      </Row>
      <Row>
        <Col sm="1"/>
        <Col sm="3">
          <Card>
          <CardBody>
            <CardTitle>Card title</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
          </CardBody>
          <CardBody>
            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
            <CardLink href="#">Card Link</CardLink>
            <CardLink href="#">Another Link</CardLink>
          </CardBody>
        </Card>
        </Col>
        <Col sm="4">
          <Card>
          <CardBody>
            <CardTitle>Card title</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
          </CardBody>
          <CardBody>
            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
            <CardLink href="#">Card Link</CardLink>
            <CardLink href="#">Another Link</CardLink>
          </CardBody>
        </Card>
        </Col>
        <Col sm="3">
          <Card>
          <CardBody>
            <CardTitle>Card title</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
          </CardBody>
          <CardBody>
            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
            <CardLink href="#">Card Link</CardLink>
            <CardLink href="#">Another Link</CardLink>
          </CardBody>
        </Card>
        </Col>
      </Row>
    </div>
      </div>
      
    );
  }
}

export default Home;

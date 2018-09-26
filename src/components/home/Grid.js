import React, { Component } from 'react';
import CarouselApp from '../carousel/index.js';
// eslint-disable-next-line
import { Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Row, Col } from 'reactstrap';

class Grid extends Component {
  render() {
    return (
<div id="center" style={{ marginTop: 30 }}>
        <div style={{marginLeft:40, marginRight:40, align:'center' }}>
      {/* Slider Carousel */}
      <Row >
      <Col sm="1"/>
        <Col sm="10">
      <Card>      
        <CarouselApp />        
      </Card>
      </Col>
      </Row>
      <Row>
        <Col sm="1"/>
        <Col sm="3">
        <br/>
        <h2 style={{textalign: 'center'}}>Últimas Notícias</h2>
        </Col>
        <Col sm="4"/>
        <Col sm="3">
        <br/>
        <h2>Melhores Projetos</h2>
        </Col>
      </Row>
      {/* First Row */}
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
      {/* Second Row */}
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
        <Col sm="4"/>
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
      {/* Third Row */}
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
        <Col sm="4"/>
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

        {/* Footer */}
    <div>
        <Row style={{backgroundColor:'blue',}}>
        <Col sm="3"/>
        <Col sm="8">
        <br/>
        <br/>
        <br/>
        <br/>
        <p>Departamento de Engenharia de Produção, Campus Universitário Darcy Ribeiro, Brasília-DF | CEP 70910-900 | Telefones UnB
        <br/>Copyright © 2019 Universidade de Brasília. Todos os direitos reservados.</p>
        </Col>
      </Row>
      </div>
      </div>
     
    );
  }
}

export default Grid;

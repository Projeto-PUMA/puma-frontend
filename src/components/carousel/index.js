import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from 'reactstrap';
import { browserHistory } from 'react-router';

class Example extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 3 - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ ...this.state, activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? 3 - 1 : this.state.activeIndex - 1;
    this.setState({ ...this.state, activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ ...this.state, activeIndex: newIndex });
  }

  viewNews(id) {
    browserHistory.push({
      pathname: '/noticia',
      state: {
        id: id,
      },
    });
  }

  render() {
    const { activeIndex } = this.state;
    const { data } = this.props;

    const slides = data.map((item, idx) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.id}
        >
        <div key={item.id} className="image-carousel" onClick={() => this.viewNews(item.id)} style={{ height: 500, cursor: 'pointer' }}>
          <img src={item.urlThumbnail && item.urlThumbnail !== '' ? item.urlThumbnail : 'http://vanguardacomunicacao.com.br/santoremedio/wp-content/uploads/2018/07/img.jpg'} alt={item.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
          <div className="container">
              <div className="carousel-caption text-left" style={{marginBottom: "30px",marginLeft: "45px", height:"30vh", backgroundColor: "rgba(0,0,0,.7)", padding: "20px"}}>
                <h1 style={{marginLeft: "20px"}}>{item.titulo}</h1>
                <p style={{marginLeft: "40px"}}>{item.subtitulo}</p>
              </div>
            </div>
        </CarouselItem>
      );
    });

    return (
      <div className="responsive">
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
        >
          <CarouselIndicators items={data} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </Carousel>
      </div>
    );
  }
}

Example.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Example;

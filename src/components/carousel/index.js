import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
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

    const items = data.slice(data.length - 3, data.length);

    const slides = items.map((item, idx) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.id}
        >
        <div key={idx} className="image-carousel" onClick={() => this.viewNews(item.id)} style={{ height: 500, cursor: 'pointer' }}>
          <img src={'http://www.legacyschoolne.com/wp-content/uploads/2018/09/PBL-Header.png'} alt={item.title} style={{ width: '100%', height: 500 }} />
        </div>
          <CarouselCaption captionText={''} captionHeader={item.title} />
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
          <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
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

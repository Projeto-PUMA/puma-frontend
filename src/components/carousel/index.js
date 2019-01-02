import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import axios from 'axios';
import * as Store from '../../store';
import { browserHistory } from 'react-router';

class Example extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0, news: [] };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  componentWillMount() {
    const data = {};
    for (const field in this.refs) {
      data[field] = this.refs[field].value;
    }

    const path = Store['backend'].path; // This is backend path
    axios.get(path + '/blog/listAll')
      .then(response => { this.setNews(response) })
      .catch((error) => { console.log(error);alert('Erro ao processar notícias!') });
  }

  setNews(response) {
    for (var i = 0; i < response.data.length; i++) {
      this.setState({
        ...this.state,
        news: this.state.news.concat(response.data[i]),
      })
    }
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.state.news.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ ...this.state, activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.state.news.length - 1 : this.state.activeIndex - 1;
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
    const { activeIndex, news } = this.state;

    const slides = news.map((item, idx) => {
      if (idx > 2) return null;
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.title}
        >
        <div className="image-carousel" onClick={() => this.viewNews(item.id)} style={{ height: 500, cursor: 'pointer' }}>
          <img src={'http://www.legacyschoolne.com/wp-content/uploads/2018/09/PBL-Header.png'} alt={item.title} style={{ width: '100%', height: 500 }} />
        </div>
          <CarouselCaption captionText={item.body} captionHeader={item.title} />
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
          <CarouselIndicators items={news} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </Carousel>
      </div>
    );
  }
}


export default Example;

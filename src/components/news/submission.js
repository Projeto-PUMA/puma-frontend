import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Col, Row, Input, Label, Button, FormGroup, Card, CardBody, Form } from 'reactstrap';
import { Editor } from 'react-draft-wysiwyg';
import { tokenInfo } from '../../helpers/token';
import { createNews, getNews, updateNews } from '../../actions/news';
import Loading from '../../helpers/loading';

class NewsSubmission extends Component {

  constructor(props) {
    super(props);
    this.handleNews = this.handleNews.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    const { location, dispatch } = this.props;

    const id = location ? (location.state ? (location.state.id ? location.state.id : null) : null) : null;

    if (id) {
      this.setState({ ...this.state, id });
      dispatch(getNews(id));
    }
  }

  state = {
    editorState: EditorState.createEmpty(),
    category: 0,
    id: -1,
    created: false,
  }

  handleChange(event) {
    this.setState({ category: event.target.value });
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  handleNews(e) {
    e.preventDefault();

    const data = new FormData(e.target);
    const { editorState, category } = this.state;
    const { dispatch, news_by_id, user } = this.props;

    news_by_id ?
      dispatch(updateNews({
        id: news_by_id.id,
        titulo: data.get('title'),
        subtitulo: data.get('subtitle'),
        texto: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        usuario_id: tokenInfo().id,
        url_thumbnail: data.get('image'),
        categoria: category,
      }, user.token)) : dispatch(createNews(data.get('title'), data.get('subtitle'), draftToHtml(convertToRaw(editorState.getCurrentContent())), tokenInfo().id, data.get('image'), category, user.token));
  }

  render() {
    const { id, editorState, created } = this.state;
    const { loading, news_by_id } = this.props;

    let content = null;

    if (loading) {
      return <Loading />;
    }

    if (id !== -1 && news_by_id && !created) {
      const blocksFromHTML = convertFromHTML(news_by_id.texto);
      content = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      this.setState({ ...this.state, editorState: EditorState.createWithContent(content), created: true });
    }

    return (
      <div>
        <Row>
          <Col sm='2' md='3' lg='4' xs='1' />
          <Col sm='6' md='5' lg='4' xs='10' style={{ textAlign: 'center' }}>
            <h2>{news_by_id ? 'Edição' : 'Submissão'} de Notícia</h2>
          </Col>
        </Row>
        <Row>
          <Col sm='1' md='2' lg='3' xs='1' />
          <Col sm='8' md='7' lg='6' xs='10'>
            <Card>
              <CardBody>
                <Form id='projectSubmissionForm' name='projectSubmissionForm' onSubmit={this.handleNews}>
                  <FormGroup>
                    <Label >Título da Notícia *</Label>
                    <Input ref='title' type='text' name='title' id='title' defaultValue={news_by_id ? news_by_id.titulo : ''} required />
                  </FormGroup>
                  <FormGroup>
                    <Label >Subtítulo da Notícia *</Label>
                    <Input ref='title' type='text' name='subtitle' id='subtitle' defaultValue={news_by_id ? news_by_id.subtitulo : ''} required />
                  </FormGroup>
                  <FormGroup>
                    <Label >URL da Imagem *</Label>
                    <Input ref='image' type='text' name='image' id='image' defaultValue={news_by_id ? news_by_id.urlThumbnail : ''} required />
                  </FormGroup>
                  <FormGroup>
                    <Label for='title'>Categoria da Notícia *</Label>
                    <Input ref='title' type='select' name='category' id='category' value={this.state.category === 0 ? news_by_id.noticiaCategoriaId : this.state.category} onChange={this.handleChange} required>
                      <option ref="0" value={0} selected={news_by_id === ''} disabled>Selecionar Categoria</option>
                      <option ref="1" value={1} className="optionGroup">Destaque</option>
                      <option ref="2" value={2} className="optionGroup">Normal</option>
                      <option ref="3" value={3} className="optionGroup">Melhores Projetos</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label>Conteúdo/Corpo *</Label>
                    <Editor
                      editorState={editorState}
                      ref='body'
                      type='textarea'
                      name='body'
                      id='body'
                      onEditorStateChange={this.onEditorStateChange}
                      editorStyle={{ border: '0.5px solid gainsboro', height: 300 }}
                      required
                    />
                  </FormGroup>
                  <br></br>
                  <Button type="submit" value="submit" color="primary" style={{ display: "block", margin: "0 auto" }}>
                    Enviar Notícia
                  </Button>
                </Form>
              </CardBody>
              <footer>
                <p>* Campo Obrigatório</p>
              </footer>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

NewsSubmission.propTypes = {
  loading: PropTypes.bool.isRequired,
  news_by_id: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  loading: state.meta.syncOperation.isLoading,
  news_by_id: state.news.news_by_id,
  user: state.user.setUser,
});


export default connect(mapStateToProps)(NewsSubmission);

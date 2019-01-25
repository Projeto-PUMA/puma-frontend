import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Col, Row, Input, Label, Button, FormGroup, Card, CardBody, Form } from 'reactstrap';
import { Editor } from 'react-draft-wysiwyg';
import { tokenInfo } from '../../helpers/token';
import { createNews } from '../../actions/news';
import Loading from '../../helpers/loading';

class NewsSubmission extends Component {

  constructor(props) {
    super(props);
    this.handleNews = this.handleNews.bind(this);
  }

  state = {
    editorState: EditorState.createEmpty(),
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  handleNews(e) {
    e.preventDefault();

    const data = new FormData(e.target);
    const { editorState } = this.state;

    const { dispatch } = this.props;
    dispatch(createNews({ id: tokenInfo().id }, data.get('title'), draftToHtml(convertToRaw(editorState.getCurrentContent()))));
  }

  render() {
    const { editorState } = this.state;
    const { loading } = this.props;

    if (loading) {
      return <Loading />;
    }

    return (
      <div>
        <Row>
          <Col sm='2' md='3' lg='4' xs='1' />
          <Col sm='6' md='5' lg='4' xs='10' style={{ textAlign: 'center' }}><h2>Submissão de Notícia</h2></Col>
        </Row>
        <Row>
          <Col sm='1' md='2' lg='3' xs='1' />
          <Col sm='8' md='7' lg='6' xs='10'>
            <Card>
              <CardBody>
                <Form id='projectSubmissionForm' name='projectSubmissionForm' onSubmit={this.handleNews}>
                  <FormGroup>
                    <Label >Título da Notícia *</Label>
                    <Input ref='title' type='text' name='title' id='title' required />
                  </FormGroup>
                  <FormGroup>
                    <Label for='title'>Categoria da Notícia *</Label>
                    <Input ref='title' type='select' name='category' id='category' value={this.state.value} onChange={this.handleChange} required>
                      <option ref="0" disabled>Selecionar Categoria</option>
                      <option ref="1" value={"destaque"} className="optionGroup">Destaque</option>
                      <option ref="2" value={"normal"} className="optionGroup">Normal</option>
                      <option ref="3" value={"melhores-projetos"} className="optionGroup">Melhores Projetos</option>
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
};

const mapStateToProps = state => ({
  loading: state.syncOperation.isLoading,
});


export default connect(mapStateToProps)(NewsSubmission);

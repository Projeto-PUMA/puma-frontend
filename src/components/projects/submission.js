import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {Card, CardBody, Form, Label, Input,Row,Col,Button, FormGroup} from 'reactstrap';
import MaskedInput from 'react-text-mask';
import ViaCep from '../../lib/react-via-cep/dist/index';

import { masks } from '../../helpers/validations';
import { tokenInfo } from '../../helpers/token';
import { createProject, loadProjectById, updateProject } from '../../actions/projects';
import Loading from '../../helpers/loading';

class ProjectSubmission extends Component {

	constructor(props) {
    super(props);
    this.state = { value: '', showJuridic: false, cep: '', uf: '', localidade: '', bairro: '', logradouro: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleProject = this.handleProject.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
    this.handleChangeCep = this.handleChangeCep.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.changeUf = this.changeUf.bind(this);
    this.changeCidade = this.changeCidade.bind(this);
    this.changeBairro = this.changeBairro.bind(this);
    this.changeLogradouro = this.changeLogradouro.bind(this);
  }

  componentWillMount() {
    const { location, dispatch, user } = this.props;

    const id = location ? (location.state ? (location.state.id ? location.state.id : null) : null) : null;
    console.log(id)
    if (id) {
      this.setState({ ...this.state, id });
      dispatch(loadProjectById(id, user.token));
    }
  }

  handleChange(event){
    this.setState({value: event.target.value});
  }
  
  handleChangeCep(event) {
    this.setState({ ...this.state, cep: event.target.value })
  }

  handleSuccess(data) {
    this.setState({ ...this.state, uf: data.uf, localidade: data.localidade, bairro: data.bairro, logradouro: data.logradouro });
  }

  changeUf(event) {
    this.setState({ uf: event.target.value });
  }

  changeCidade(event) {
    this.setState({ localidade: event.target.value });
  }

  changeBairro(event) {
    this.setState({ bairro: event.target.value });
  }

  changeLogradouro(event) {
    this.setState({ logradouro: event.target.value });
  }

	handleProject(e) {
    e.preventDefault();
    var data = new FormData(e.target);

    const { dispatch, user, project_by_id } = this.props;
    const { showJuridic } = this.state;

    var project = {
      usuario_id: tokenInfo().id,
      titulo: data.get('title'),
      objetivo: data.get('summary'),
      problematica: data.get('body'),
      psp_id: 18, // arrumar isso no dropdown ali de baixo
      anexo: data.get('anexo'),
    };

    // corrigir os valores de endereço de empresa
    const empresa = {
      cnpj: data.get('CNPJ'),
      nome_fantasia: data.get('companyName'),
      nome: data.get('corporateName'),
      endereco: {
        estado: data.get("uf"),
        cidade: data.get("localidade"),
        bairro: data.get("bairro"),
        rua: data.get("logradouro"),
        numero: data.get("numero"),
        complemento: data.get("complemento"),
        cep: data.get('cep'),
        endereco_categoria_id: data.get("categoria"),
      },
    };

    if(showJuridic) project.empresa = empresa;

    project_by_id ?
    dispatch(updateProject(project = {
      id: project_by_id.id,
      usuario_id: tokenInfo().id,
      titulo: data.get('title'),
      objetivo: data.get('summary'),
      problematica: data.get('body'),
      psp_id: 18, // arrumar isso no dropdown ali de baixo
      anexo: data.get('anexo'), 
    },user.token)) : dispatch(createProject(project, user.token));
  }

  renderJuridic() {
    if (this.state.showJuridic) {
      return (
        <div>
          <FormGroup>
            <Label>CNPJ</Label>
            <Input
              ref='title'
              type='text'
              name='CNPJ'
              id='CNPJ'
              mask={masks.cnpj}
              tag={MaskedInput}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Nome da Empresa *</Label>
            <Input
              ref='title'
              type='text'
              name='companyName'
              id='companyName'
              maxLength="200"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Razão Social *</Label>
            <Input
              ref='title'
              type='text'
              name='corporateName'
              id='corporateName'
              maxLength="200"
              required
            />
          </FormGroup>
          <ViaCep cep={this.state.cep} onSuccess={this.handleSuccess} lazy>
                    {({ data, loading, error, fetch }) => {
                      if (loading) {
                        return <p>Pesquisando CEP...</p>
                      }
                      if (error) {
                        return console.log('CEP inválido!');
                      }
                      if (data) {
                        if (data.erro === true) {
                          return <div>
                            <FormGroup>
                              <Label className="label">CEP *</Label>
                              <Input
                                ref="body"
                                type="text"
                                name="cep"
                                id="cep"
                                className="input"
                                mask={masks.cep}
                                tag={MaskedInput}
                                onChange={this.handleChangeCep} value={this.state.cep}
                                required
                              />
                            </FormGroup>
                            <div style={{ marginTop: -12, fontSize: 12, color: 'red' }}>CEP Inválido</div>
                            <button onClick={fetch}>Pesquisar</button>
                          </div>
                        }
                        return <div>
                          <Row debug="true">
                            <Col debug="true">
                              <FormGroup>
                                <Label className="label">CEP *</Label>
                                <Input
                                  ref="body"
                                  type="text"
                                  name="cep"
                                  id="cep"
                                  className="input"
                                  mask={masks.cep}
                                  tag={MaskedInput}
                                  value={data.cep}
                                  style={{ width: '250px' }}
                                  required
                                />
                              </FormGroup>
                            </Col>
                            <Col debug="true">
                              <FormGroup>
                                <Label className="label">Cidade *</Label>
                                <Input
                                  ref="title"
                                  type="text"
                                  name="localidade"
                                  id="localidade"
                                  className="input"
                                  required
                                  value={this.state.localidade}
                                  onChange={this.changeCidade}
                                  style={{ width: '250px' }}
                                />
                              </FormGroup>
                            </Col>
                            <Col debug="true">
                              <FormGroup>
                                <Label className="label">Estado *</Label>
                                <Input
                                  ref="title"
                                  type="text"
                                  name="uf"
                                  id="uf"
                                  className="input"
                                  required
                                  value={this.state.uf}
                                  onChange={this.changeUf}
                                  style={{ width: '60px' }}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <FormGroup>
                            <Label className="label">Bairro *</Label>
                            <Input
                              ref="title"
                              type="text"
                              name="bairro"
                              id="bairro"
                              className="input"
                              required
                              value={this.state.bairro}
                              onChange={this.changeBairro}
                            />
                          </FormGroup>
                          <Row debug="true">
                          <Col debug="true">
                          <FormGroup>
                            <Label className="label">Logradouro *</Label>
                            <Input
                              ref="title"
                              type="text"
                              name="logradouro"
                              id="logradouro"
                              className="input"
                              required
                              value={this.state.logradouro}
                              onChange={this.changeLogradouro}
                              style={{ width: '500px' }}
                            />
                          </FormGroup>
                          </Col>
                          <Col debug="true">
                          <FormGroup>
                            <Label className="label">Número *</Label>
                            <Input
                              ref="title"
                              type="text"
                              name="numero"
                              id="numero"
                              className="input"
                              required
                              style={{ width: '60px' }}
                            />
                          </FormGroup>
                          </Col>
                          </Row>
                          <Row debug="true">
                          <Col debug="true">
                          <FormGroup>
                            <Label className="label">Complemento</Label>
                            <Input
                              ref="title"
                              type="text"
                              name="complemento"
                              id="complemento"
                              className="input"
                            />
                          </FormGroup>
                          </Col>
                          <Col debug="true">
                          <FormGroup>
                            <Label>Categoria *</Label>
                            <Input
                              ref='title'
                              type='select'
                              name='categoria'
                              id='categoria'
                              maxLength="50"
                              style={{ width: '300px' }}
                              required
                            >
                              <option ref="1" value={1} className="optionGroup">Residencial</option>
                              <option ref="2" value={2} className="optionGroup">Comercial</option>
                            </Input>
                          </FormGroup>
                          </Col>
                          </Row>
                        </div>
                      }
                      return <div>
                        <FormGroup>
                          <Label className="label">CEP *</Label>
                          <Input
                            ref="body"
                            type="text"
                            name="cep"
                            id="cep"
                            className="input"
                            mask={masks.cep}
                            tag={MaskedInput}
                            onChange={this.handleChangeCep} value={this.state.cep}
                            required
                          />
                        </FormGroup>
                        <button onClick={fetch}>Pesquisar</button>
                      </div>
                    }}
                  </ViaCep>
        </div>
      )
    }
  }
  
  handleRadio(event) {
    this.setState({ showJuridic: event.currentTarget.value === 'pj' ? true: false });
  }
  
  render() {
    const { showJuridic } = this.state;
    const { loading, project_by_id } = this.props;

    if (loading) {
      return <Loading />;
    }

    return (
      <div>
        <Row>
        <Col sm='2' md='3' lg='4' xs='1'/>
        <Col sm='6' md='5' lg='4' xs='10' style={{textAlign:'center', margin:'20px'}}><h2>{project_by_id ? 'Edição' : 'Submissão'} de Projeto</h2></Col>
        </Row>
        <Row>
          <Col sm='1' md='2' lg='3' xs='1'/>
          <Col sm='8' md='7' lg='6' xs='10'>
          <Card>
            <CardBody>
              <Form
              id='projectSubmissionForm'
              name='projectSubmissionForm'
              onSubmit={this.handleProject}
              >
              <FormGroup>
                 <Label>Qual o título do projeto? *</Label>
                 <Input
                 ref='title'
                 type='text'
                 name='title'
                 id='title'
                 maxLength="100"  
                 defaultValue={project_by_id ? project_by_id.titulo : ''}
                 required              
                 />
              </FormGroup>
              <FormGroup>
                 <Label>Qual problema deseja resolver neste projeto? *</Label>
                 <Input 
                 ref='summary'
                 type='textarea'
                 name='summary'
                 id='summary'
                 defaultValue={project_by_id ? project_by_id.problematica : ''}
                 required
                 />
              </FormGroup>
              <FormGroup>
                 <Label>Qual objetivo você quer alcançar com este projeto? *</Label>
                 <Input
                 ref='body'
                 type='textarea'
                 name='body'
                 id='body'
                 defaultValue={project_by_id ? project_by_id.objetivo : ''}
                 required
                 />
              </FormGroup>
              <FormGroup>
                 <Label for='area'>Área de Aplicação *</Label>
                 <Input
                 ref='area'
                 type='select'
                 name='area'
                 id='area'
                 required
                 value={this.state.value}
                 onChange={this.handleChange}
                 >            
                 <option ref="0" value="" disabled defaultValue >Selecionar Área</option>
                 <option ref="1" value={"PSP1"} className="optionGroup" disabled>PSP1 - Probabilidade e Estatística</option>
                  <option ref="1.1"value={"PSP1-ABD"} className="optionChild">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Análise de Banco de Dados</option>
                  <option ref="1.2"value={"PSP1-CQP"} className="optionChild">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Criação de Questionários de Pesquisa</option>
                  <option ref="1.3"value={"PSP1-OTHERS"} className="optionChild">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Outras</option>
                 <option ref="2"value={"PSP2"} className="optionGroup" disabled>PSP2 - Sistemas de Informação</option>
                   <option ref="2.1"value={"PSP2-PSI"} className="optionChild">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Projeto de Sistemas de Informação</option>
                   <option ref="2.2"value={"PSP2-OTHERS"} className="optionChild">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Outras</option>
                 <option ref="3"value={"PSP3"} className="optionGroup" disabled>PSP3 - Livre</option>
                    <option ref="3.1"value={"PSP3-OTHERS"} className="optionChild">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Outras</option>
                 <option ref="4"value={"PSP4"} className="optionGroup" disabled>PSP4 - Planejamento e Controle da Produção</option>
                   <option ref="4.1"value={"PSP4-PDD"} className="optionChild">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Previsão de Demanda</option>
                   <option ref="4.2"value={"PSP4-GDE"} className="optionChild">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Gestão de Estoques</option>
                   <option ref="4.3"value={"PSP4-CFA"} className="optionChild">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Criação de Ferramentas de Apoio ao Planejamento e Controle da Produção</option>
                   <option ref="4.4"value={"PSP4-OTHERS"} className="optionChild">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Outras</option>
                 <option ref="5"value={"PSP5"} className="optionGroup" disabled>PSP5 - Gestão da Qualidade</option>
                   <option ref="5.1"value={"PSP5-MDP"} className="optionChild">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mapeamento de Processos</option>
                   <option ref="5.2"value={"PSP5-CDV"} className="optionChild">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cadeia de Valor</option>
                   <option ref="5.3"value={"PSP5-MCP"} className="optionChild">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Melhoria Contínua de Processos</option>
                   <option ref="5.4"value={"PSP5-OTHERS"} className="optionChild">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Outras</option>
                 <option ref="6"value={"PSP6"} className="optionGroup" disabled>PSP6 - Engenharia do Produto</option>
                   <option ref="6.1"value={"PSP6-EPC"} className="optionChild">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Elaboração de Projeto Conceitual de Produto</option>
                   <option ref="6.2"value={"PSP6-OTHERS"} className="optionChild">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Outras</option>
                 <option ref="7"value={"PSP7"} className="optionGroup" disabled>PSP7 - Gestão Estratégica</option>
                   <option ref="7.1"value={"PSP7-DOE"} className="optionChild">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Definição de Objetivos Estratégicos</option>
                   <option ref="7.2"value={"PSP7-VBE"} className="optionChild">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Viabilidade Econômica</option>
                   <option ref="7.3"value={"PSP7-DDM"} className="optionChild">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Desdobramento de Metas</option>
                 <option ref="8"value={"UNDEF"} className="optionGroup">Não sei em qual categoria meu projeto se encaixa</option>
                 </Input>
              </FormGroup>
              <FormGroup>
                 <Label>Link do PDF *</Label>
                 <Input
                 ref='anexo'
                 type='text'
                 name='anexo'
                 id='anexo'
                 maxLength="500"  
                 defaultValue={project_by_id ? project_by_id.anexo : ''}
                 required              
                 />
              </FormGroup>
              <FormGroup tag="fieldset" required>
                <legend>Tipo de Submissão *</legend>
                <FormGroup check>
                  <Label check for='type'>
                    <Input type="radio"  name='type' id='type' value='pf' checked={showJuridic === false} onChange={this.handleRadio}/>{'Pessoa Física'}
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio"  name='type' id='type' value='pj' checked={showJuridic === true} onChange={this.handleRadio}/>{'Pessoa Jurídica'}
                  </Label>
                </FormGroup>
                <br/>
                { showJuridic ? this.renderJuridic() : null }
              </FormGroup>
                <Button type="submit" value ="submit" color="primary" style={{ display: "block",margin: "0 auto"}}>
                 Enviar Projeto
                </Button>
              </Form>
            </CardBody>
          <footer>
            <p style={{marginLeft:'20px'}}>* Campo Obrigatório</p>
          </footer>
          </Card>
          </Col>
        </Row>
                
      </div>
    );
  }
}

ProjectSubmission.propTypes = {
  user: PropTypes.object,
	project_by_id: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
	project_by_id: state.project.project_by_id,
	loading: state.meta.syncOperation.isLoading,
});

export default connect(mapStateToProps)(ProjectSubmission);

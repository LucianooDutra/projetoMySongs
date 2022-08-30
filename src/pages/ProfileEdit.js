import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import semImagem from '../images/semImagem.png';
import { getUser, updateUser } from '../services/userAPI';
import '../css/profileEdit.css';

class ProfileEdit extends React.Component {
  state = {
    image: '',
    name: '',
    disabled: true,
    email: '',
    description: '',
    carregando: false,
    redirecionar: false,
  }

  // Função que carrega minha pag com os dados que forneci anteriormente.
  componentDidMount = async () => {
    this.setState({ carregando: true });
    const userInfo = await getUser();
    const { name, email, description, image } = userInfo;
    this.setState({
      carregando: false,
      name,
      image,
      description,
      email },
    this.conferirPossibilidade);
  }

  // função que confere as minhas possibilidades pra depois liberar meu button pra enviar.
  conferirPossibilidade = () => {
    const { description, email, image, name } = this.state;
    // busquei essa formula de teste de email no stackoverflow
    const regex = /\S+@\S+\.\S+/;
    const testEmail = regex.test(email);

    if (name.length > 0
      && email.length > 0 && description.length > 0 && image.length > 0 && testEmail) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  // função generica pra colocar meus dados nos states
  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });

    this.conferirPossibilidade();
  }

  // função que atualiza meu perfil, mando meus dados pra minha API e ativo o redirecionar
  atualizarPerfil = () => {
    const { name, email, image, description } = this.state;
    this.setState({ carregando: true });
    updateUser({ name, email, image, description }).then(() => {
      this.setState({
        carregando: false,
        redirecionar: true,
      });
    });
  };

  perfil = () => {
    const { description, email, image, name, disabled } = this.state;
    return (
      <form className="form-horizontal">
        <div>
          <img src={ image || semImagem } alt={ name } width="200px" />
        </div>
        <div className="form-group">
          <div className="col-data">
            <label htmlFor="NomeUsuario">
              Nome
              <input
                type="text"
                id="NomeUsuario"
                placeholder="Seu nome de perfil"
                data-testid="edit-input-name"
                onChange={ this.handleChange }
                name="name"
                value={ name }
              />
            </label>
            <label htmlFor="EmailUsuario">
              Email
              <input
                type="email"
                id="EmailUsuario"
                placeholder="Seu email de cadastro"
                data-testid="edit-input-email"
                onChange={ this.handleChange }
                name="email"
                value={ email }
              />
            </label>
            <label htmlFor="DescricaolUsuario">
              Descrição
              <textarea
                id="DescricaolUsuario"
                placeholder="Uma breve descrição sobre você"
                data-testid="edit-input-description"
                onChange={ this.handleChange }
                name="description"
                value={ description }
              />
            </label>
            <label htmlFor="FotoUsuario">
              Imagem
              <input
                type="text"
                id="FotoUsuario"
                placeholder="Sua foto de perfil"
                data-testid="edit-input-image"
                onChange={ this.handleChange }
                name="image"
                value={ image }
              />
            </label>
          </div>
          <div>
            <button
              type="button"
              data-testid="edit-button-save"
              disabled={ disabled }
              onClick={ this.atualizarPerfil }
            >
              Salvar
            </button>
          </div>
        </div>
      </form>
    );
  }

  render() {
    const { carregando, redirecionar } = this.state;
    return (
      <div className="page-profile-edit" data-testid="page-profile-edit">
        <div>
          <Header />
        </div>
        <div className="page-profile-edit-data">
          { redirecionar && <Redirect to="/profile" /> }
          { carregando ? <Carregando /> : this.perfil() }
        </div>
      </div>
    );
  }
}

export default ProfileEdit;

import React from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Carregando from '../components/Carregando';
import '../css/login.css';

class Login extends React.Component {
  state = {
    disabled: true,
    userName: '',
    carregando: false,
    redirecionar: false,
  };

  // Função que verifica se meu nome contém no mín 3 letras e modifica meu state de userName e habilita meu botão.
  countName = ({ target: { value } }) => {
    const sizeMin = 3;
    if (value.length >= sizeMin) {
      this.setState({ disabled: false, userName: value });
    }
  };

  // Função que muda os state de carregando e após enviar pra minha API o nome do meu usuário ele modifica o carregando e me redireciona.
  getUser = () => {
    this.setState({
      carregando: true,
    });
    const { userName } = this.state;
    createUser({ name: userName }).then(() => {
      this.setState({
        carregando: false,
        redirecionar: true,
      });
    });
  };

  render() {
    const { carregando, redirecionar, disabled } = this.state;

    // Se carregando for true, irá aparecer a mensagem de Carregando
    if (carregando) {
      return (
        <div>
          <Carregando />
        </div>
      );
    }

    // Se redirecionar for true, irá me redirecionar pra /search
    if (redirecionar) {
      return <Redirect to="/search" />;
    }

    return (
      <div className="formLogin" data-testid="page-login">
        <h1>My songs</h1>
        <div className="divLogin">
          <div className="divInput">
            <label htmlFor="NameLogin">
              <input
                data-testid="login-name-input"
                type="text"
                placeholder="Seu nome"
                id="NameLogin"
                className="NameLogin"
                onChange={ this.countName }
              />
            </label>
          </div>
          <button
            type="submit"
            className="Form-btnSubmit"
            data-testid="login-submit-button"
            disabled={ disabled }
            onClick={ this.getUser }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

export default Login;

// Explicações:
// Ao iniciar minha pág, renderiza meu formulário com o meu input e botão,
// Ao digitar no meu input chama a função 'countName' que ela irá verificar se a palavra contem 3 ou mais letras e retorna false pra habilitar o botão de enviar,
// Ao habilitar o botão e clicar nele chama a função getUser, que irá mudar meu estado de carregando pra true e assim aparecer a mensagem enquanto não carrego totalmente minha api pra salvar o nome,
// Ao salvar meu nome e mudar o carregando pra true novemente, ele irá mudar o state de redirecionar pra true, assim irá redirecionar pra pág de /search.

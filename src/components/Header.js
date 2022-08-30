import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Header extends React.Component {
    state ={
      user: '',
      carregando: true,
    };

    // Ao carregar minha pag irá chamar a função getUser
    // trago o nome do meu usuário e salvo no user, e mudo o carregando assim quando receber minha API com o nome ele muda pra false e deixa de aparecer o carregando.
    componentDidMount() {
      getUser().then((user) => {
        this.setState({ carregando: false, user });
      });
    }

    header = () => {
      const { user } = this.state;
      return (
        <div className="divPageSearchHeader">
          <div>
            <h2 data-testid="header-user-name">{`Welcome ${user.name}`}</h2>
          </div>
          <div className="divPageSearchHeaderLinks">
            <div>
              <Link data-testid="link-to-search" to="/search">Search</Link>
            </div>
            <div>
              <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
            </div>
            <div>
              <Link data-testid="link-to-profile" to="/profile">Profile</Link>
            </div>
          </div>
        </div>
      );
    }

    render() {
      const { carregando } = this.state;
      return (
        <header data-testid="header-component">
          {/* Se carregando for true aparece a mensagem, se não aparece meu header. */}
          { carregando ? <Carregando /> : this.header() }
        </header>
      );
    }
}

export default Header;

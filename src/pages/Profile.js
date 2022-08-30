import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import { getUser } from '../services/userAPI';
import semImagem from '../images/semImagem.png';
import '../css/profile.css';

class Profile extends React.Component {
  state = {
    carregando: true,
    user: null,
  };

  componentDidMount() {
    getUser().then((result) => {
      this.setState({
        carregando: false,
        user: result,
      });
    });
  }

  perfil = () => {
    const { user: { description, email, image, name } } = this.state;
    return (
      <div className="dadosProfileInter">
        <img
          src={ image || semImagem }
          alt={ name }
          data-testid="profile-image"
          width="200px"
        />
        <Link to="/profile/edit">Editar perfil</Link>
        <h3>{name}</h3>
        <h4>{email}</h4>
        <p>{description}</p>
      </div>
    );
  }

  render() {
    const { carregando } = this.state;
    return (
      <div className="page-profile" data-testid="page-profile">
        <div>
          <Header />
        </div>
        <div className="dadosProfile">
          { carregando ? <Carregando /> : this.perfil() }
        </div>
      </div>
    );
  }
}

export default Profile;

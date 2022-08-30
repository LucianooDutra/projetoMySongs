import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from '../components/Carregando';
import '../css/favorites.css';

class Favorites extends React.Component {
  state = {
    musicas: '',
    carregando: true,
  };

  componentDidUpdate() {
    this.musicasFavoritas();
  }

  componentDidMount = async () => {
    const musicas = await getFavoriteSongs();
    this.setState({
      carregando: false,
      musicas,
    });
  }

  musicasFavoritas = () => {
    const { carregando } = this.state;
    getFavoriteSongs().then((musicas) => {
      if (carregando) {
        this.setState(() => ({
          musicas,
          carregando: false,
        }));
      }
    });
  };

  // Função que muda meu estado de carregando
  handleChange = () => {
    this.setState({ carregando: true });
  };

  // Função que me retorna meu MusicCard
  musica = () => {
    const { musicas } = this.state;

    if (musicas) {
      return musicas.map((musica) => (
        <MusicCard
          musica={ musica }
          key={ musica.trackName }
          onChange={ this.handleChange }
          image={ musica.artworkUrl100 }
        />
      ));
    }
  };

  render() {
    const { musicas } = this.state;
    return (
      <div className="page-favorites" data-testid="page-favorites">
        <Header className="headerPageFavorites" />
        <div className="AllMusicCards">
          {!musicas ? <Carregando /> : this.musica()}
        </div>
      </div>
    );
  }
}

export default Favorites;

import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import '../css/album.css';

class Album extends React.Component {
  state = {
    musicas: '',
  };

  // Assim que carrega a pag, chamo minha API pra pegar as musicas pelo id, e salvo dentro do meu state musicas.
  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getMusics(id).then((musicas) => this.setState({ musicas }));
  }

  // Função que me traz todos os dados do Album
  album = () => {
    const { musicas } = this.state;
    if (musicas) {
      const { artistName, collectionName, artworkUrl100 } = musicas[0];
      return (
        <div className="albumCard">
          <img src={ artworkUrl100 } alt={ collectionName } />
          <div className="albumInterName">
            <h4 data-testid="artist-name">{artistName}</h4>
            <h5 data-testid="album-name">{collectionName}</h5>
          </div>
        </div>
      );
    }
  }

    // Função que percorre e tráz todos os dados de cada musica salva no meu state musicas; e o joga pra o componente MusicCard.
    musicas = () => {
      const { musicas } = this.state;
      if (musicas) {
        const { artworkUrl100 } = musicas[0];
        return (
          musicas
            .map((musica, index) => {
              const { trackName } = musica;
              return (index !== 0 && <MusicCard
                key={ trackName }
                musica={ musica }
                image={ artworkUrl100 }
              />);
            })
        );
      }
    }

    render() {
      return (
        <div className="pageAlbum" data-testid="page-album">
          <Header />
          { this.album() }
          <div className="AllMusicCards">
            { this.musicas() }
          </div>
        </div>
      );
    }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;

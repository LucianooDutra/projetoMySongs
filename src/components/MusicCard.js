import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';
import '../css/album.css';

class MusicCard extends React.Component {
    state = {
      carregando: false,
      checked: false,
    };

    // Função que chama toda vez que abrir a checagem do localStorage
    componentDidMount() {
      this.checkLocalStorage();
    }

    // Checagem do meu localStorage, pega o meus dados, e o transforma pra o formato original
    checkLocalStorage = () => {
      const armStorage = JSON.parse(localStorage.getItem('favorite_songs'));
      const { musica: { trackName } } = this.props;
      // .some pra percorrer buscando se ao menos 1 elemento é igual ao trackName
      const confere = armStorage.some((musica) => musica.trackName === trackName);

      // O item que passou pelo check será armazenado no checked
      this.setState({ checked: confere });
    }

    // Função que ao cliclar no meu checked ele recebe um event e a API AddSoong
    checkedMusica = ({ target }, callback) => {
    // Antes de chamar minha API coloca a mensagem de carregando pra aparecer, e no meu checked armazeno meu target que é quem originou aquele evento com id da musica.
      this.setState({ carregando: true, checked: target.checked });
      //   console.log(target);
      const { props: { musica } } = this;

      // Após chamar minha API volto pra o state de carregando false, pra retirar minha mensagem.
      callback(musica).then(() => this.setState({ carregando: false }));
    }

  listaMusicas = () => {
    const {
      musica: { trackName, previewUrl, collectionName, trackId }, image } = this.props;
    const { checked } = this.state;
    return (
      <div className="divMusicCard">
        <div className="divMusicCard2">
          <img src={ image } alt={ collectionName } />
          <div className="divMusicCardInt">
            <p>{trackName}</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>
                audio
              </code>
              .
            </audio>
          </div>
        </div>
        <label htmlFor={ trackName }>
          <input
            className="divMusicCardInput"
            type="checkbox"
            id={ trackName }
            data-testid={ `checkbox-music-${trackId}` }
            // onClick={ (event) => (this.checkedMusica(event, addSong)) }
            onChange={ (event) => (!checked
              ? this.checkedMusica(event, addSong)
              : this.checkedMusica(event, removeSong)) }
            checked={ checked }
          />
          Favorita
        </label>
      </div>
    );
  }

  render() {
    const { carregando } = this.state;
    return (carregando ? <Carregando /> : this.listaMusicas());
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;

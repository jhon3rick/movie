/**
 * CardMovie
 */
import React from 'react';

// Styles
import './styles.scss';

type Props = {
  type ?: string,
  Plot: string,
  Year: string,
  Title: string,
  Poster: string,
  imdbID: string,

  // action
  onFavorite: (item: Object)=>void
}

const CardMovie: React.FC<Props> = (props) => {
  const {
    type,
    Plot,
    Year,
    Title,
    Poster,
    onFavorite,
  } = props;
  return (
    <div className={`card-movie ${type === 'small' && 'small'}`}>
      {
        type === 'big' && <span className="icon-star-empty star" onClick={()=>onFavorite(props)} />
      }
      <div className="img" style={{ backgroundImage: `url(${Poster})` }}></div>
      {
        type === 'big' && (
          <div className="footer">
            <div>Title: {Title}</div>
            <div>Year: {Year}</div>
            <div>Detalle: {Plot}</div>
          </div>
        )
      }
    </div>
  );
}

CardMovie.defaultProps = {
  type: 'big',
  imdbID: '',
  onFavorite: ()=>{},
}

export default CardMovie;
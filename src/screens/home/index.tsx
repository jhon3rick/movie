/*
 * Home
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as AppActions from '../../redux/actions';
import * as HomeActions from './actions';
import selectHome from './selectors';

// Components
import Panel from '../../components/panel';
import CardMovie from '../../components/cardMovie';
import BodyContainer from '../../components/bodyContainer';

// Containers
import Button from '../../containers/button';
import FormInput from '../../containers/formInput';

// Styles
import './style.scss';

// Utils
import { saveFavorities, loadFavorities } from '../../providers/manageFavorities';

type Movie = {
  Year: string,
  Plot: string,
  Title: string,
  imdbID: string,
  Poster: string,
}

type Props = {
  // navigation
  history: {
    push: (route: string) => void
  },

  // reducers
  cant: number,
  year: string,
  title: string,
  movie: Movie,
  loadRequest: boolean,
  favorities: {
    [index: string]: Movie
  }

  // actions
  setRol: (rol: string)=>void,
  setYear: (year: string)=>void,
  setTitle: (title: string)=>void,
  setFavorities: (favorities: Object)=>Object,
  fetchingMovieRequest: (title: string)=>void,
}

class Home extends React.Component <Props, {}>{
  timeSendApi: any;

  construtor () { }

  componentDidMount (){
    const { setFavorities } = this.props;
    const favorities = loadFavorities();

    setFavorities(favorities);
  }

  _onLoadData = () => {
    clearTimeout(this.timeSendApi);
    this.timeSendApi = setTimeout(()=>this._sendApi(), 500)
  }

  _sendApi = async () => {
    const {
      // reducers
      title,
      year,
      cant,

      // actions
      fetchingMovieRequest
    } = this.props;

    let data: string = '/?';
    if (year && year !== '') data += `y=${year}&&`;
    if (title && title !== '') data += `t=${title}&&`;
    if (cant && cant >= 1) data += `page=${cant}&&`;

    const responseApi = await fetchingMovieRequest(data);
    console.log('responseApi', responseApi);
  }
  
  _setYear = (value: string) => {
    const { setYear } = this.props;
    setYear(value);
    this._onLoadData();
  }

  _setTitle = (value: string) => {
    const { setTitle } = this.props;
    setTitle(value);
    this._onLoadData();
  }

  _onFavorite = (item: Object) => {
    // @ts-ignore
    const { imdbID } = item;
    const { favorities, setFavorities } = this.props;

    // @ts-ignore
    favorities[imdbID] = item;
    setFavorities(favorities);
    saveFavorities(favorities);
  }

  render () {
    const {
      // reducers
      year,
      title,
      favorities,

      // actions
      setTitle,
      setYear,
      movie,
    } = this.props;

    console.log('props home', favorities);

    return (
      <BodyContainer className="home">
        <Panel className="left">
          <FormInput label="Title" onChange={this._setTitle} value={title} />
          <FormInput label="Year" onChange={this._setYear} value={year} />
        </Panel>
        <Panel className="right">
          <Panel className="top">
            <Panel className="title-favorite">Favorites</Panel>
            <Panel className="preview-container">
              {
                // @ts-ignore
                favorities && Object.keys(favorities).map((key: string)=>(
                  favorities[key] ? (
                    <CardMovie key={`favorite-${favorities[key].imdbID}`} onFavorite={()=>{}} {...favorities[key]} type="small" />
                  ): []
                ))
              }
            </Panel>
          </Panel>
          <Panel className="bottom">
            {
              movie && movie.Title ? <CardMovie {...movie} key={`movie-${movie.imdbID}`} onFavorite={this._onFavorite} />: []
            }
          </Panel>
        </Panel>
        
      </BodyContainer>
    );
  }
}
const mapStateToProps = selectHome();

function mapDispatchToProps (dispatch: any) {
  const actions = bindActionCreators({ ...AppActions, ...HomeActions }, dispatch);
  return {
    dispatch,
    ...actions
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

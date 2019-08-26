/*
 * Home reducer
 */
import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SET_TITLE,
  SET_YEAR,
  SET_FAVORITIES,

  FETCHING_MOVIE_REQUEST,
  FETCHING_MOVIE_SUCCESS,
  FETCHING_MOVIE_FAILURE
} from './actions-type';

const initialState = fromJS({
  loadRequest: false,
  title: '', 
  year: '',
  cant: 10,
  movie: {},
  favorities: {},
});

function homeReducer (state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_TITLE:
      return state.set('title', action.payload.title);
    case SET_YEAR:
      return state.set('year', action.payload.year);
    case SET_FAVORITIES:
      return state.set('favorities', action.payload.favorities);

    case FETCHING_MOVIE_REQUEST:
      return state.set('loadRequest', true);
    case FETCHING_MOVIE_SUCCESS:
      return state
        .set('loadRequest', false)
        .set('movie', action.payload.movie);
    case FETCHING_MOVIE_FAILURE:
      return state
        .set('loadRequest', false)
        .set('movie', action.payload.movie);

    default:
      return state;
  }
}

export default homeReducer;

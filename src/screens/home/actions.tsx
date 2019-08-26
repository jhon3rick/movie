/*
 * Home actions
 */
import apiService from '../../providers/apiService';
import {
  DEFAULT_ACTION,
  SET_TITLE,
  SET_YEAR,
  SET_FAVORITIES,

  FETCHING_MOVIE_REQUEST,
  FETCHING_MOVIE_SUCCESS,
  FETCHING_MOVIE_FAILURE
} from './actions-type';

export function defaultAction () {
  return {
    type: DEFAULT_ACTION
  };
}

export function setFavorities (favorities: Object) {
  return {
    type: SET_FAVORITIES,
    payload: { favorities }
  };
}

export function setTitle (title: string) {
  return {
    type: SET_TITLE,
    payload: { title }
  };
}

export function setYear (year: string) {
  return {
    type: SET_YEAR,
    payload: { year }
  };
}

export function fetchingMovieRequest (data: string) {
  return (dispatch: (param: Object)=>void) => {
    dispatch({ type: FETCHING_MOVIE_REQUEST });

    return apiService('search-movies:GET', data)
      .then(resp => {
        // @ts-ignore
        if (resp.success) {
          // @ts-ignore
          dispatch(fetchingMovieSuccess(resp.data));
        } else {
          // @ts-ignore
          dispatch(fetchingMovieFail(resp.data));
        }
        return resp;
      })
      .catch(() => {
        dispatch(fetchingMovieFail({}));
        return {success: false, data:{}};
      });
  };
}
export function fetchingMovieSuccess (movie: Object){
  return {
    type: FETCHING_MOVIE_SUCCESS,
    payload: { movie }
  };
}

export function fetchingMovieFail (movie: Object){
  return {
    type: FETCHING_MOVIE_FAILURE,
    payload: { movie }
  };
}
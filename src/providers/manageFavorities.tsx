/**
 * manageFavorities
 */

export const saveFavorities = (favorities: Object) => {
  localStorage.setItem('favorities', JSON.stringify(favorities));
}

export const loadFavorities = () => {
  const favorities = localStorage.getItem('favorities');
  if (favorities && favorities !== '') return JSON.parse(favorities);
  return {};
}
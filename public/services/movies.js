// import { API, PARAMS } from './../settings/api';

const discover = async (sortBy = "popularity.desc", page = 1) => {
  try {
    const response = await fetch(
      `${API.baseUrl}/discover/movie?${PARAMS.default}&page=${page}&sort_by=${sortBy}&include_adult=false&include_video=false`
    );
    return (await response).json();
  } catch (error) {
    return error;
  }
};

const search = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${API.baseUrl}/search/movie?${PARAMS.default}&page=${page}&query=${query}&include_adult=false`
    );
    return (await response).json();
  } catch (error) {
    return error;
  }
};

const details = async (mediaId) => {
  try {
    const response = await fetch(
      `${API.baseUrl}/movie/${mediaId}?${PARAMS.default}`
    );
    return (await response).json();
  } catch (error) {
    return error;
  }
};

const recommendations = async (mediaId, page = 1) => {
  try {
    const response = await fetch(
      `${API.baseUrl}/movie/${mediaId}/recommendations?${PARAMS.default}&page=${page}`
    );
    return (await response).json();
  } catch (error) {
    return error;
  }
};

const similar = async (mediaId, page = 1) => {
  try {
    const response = await fetch(
      `${API.baseUrl}/movie/${mediaId}/similar?${PARAMS.default}&page=${page}`
    );
    return (await response).json();
  } catch (error) {
    return error;
  }
};

const nowPlaying = async (page = 1) => {
  try {
    const response = await fetch(
      `${API.baseUrl}/movie/now_playing?${PARAMS.default}&page=${page}`
    );
    return (await response).json();
  } catch (error) {
    return error;
  }
};

const popular = async (page = 1) => {
  try {
    const response = await fetch(
      `${API.baseUrl}/movie/popular?${PARAMS.default}&page=${page}`
    );
    return (await response).json();
  } catch (error) {
    return error;
  }
};

const topRated = async (page = 1) => {
  try {
    const response = await fetch(
      `${API.baseUrl}/movie/top_rated?${PARAMS.default}&page=${page}`
    );
    return (await response).json();
  } catch (error) {
    return error;
  }
};

const upcoming = async (page = 1) => {
  try {
    const response = await fetch(
      `${API.baseUrl}/movie/upcoming?${PARAMS.default}&page=${page}`
    );
    return (await response).json();
  } catch (error) {
    return error;
  }
};

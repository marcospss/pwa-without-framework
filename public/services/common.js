import { API, PARAMS } from './../settings/api';

export const genres = async (mediaType) => {
  try {
    const response = await fetch(
      `${API.baseUrl}/genre/${mediaType}/list?${PARAMS.default}`
    );
    return (await response).json();
  } catch (error) {
    return error;
  }
};

export const credits = async ( mediaType, mediaId) => {
  try {
    const response = await fetch(
      `${API.baseUrl}/${mediaType}/${mediaId}/credits?${PARAMS.default}`
    );
    return (await response).json();
  } catch (error) {
    return error;
  }
};

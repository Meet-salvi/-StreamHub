import axios from "axios";

export const BASE_URL = 'https://yt-api.p.rapidapi.com';

export const fetchFromAPI = async (url) => {
  const options = {
    method: 'GET',
    url: `${BASE_URL}/${url}`,
    headers: {
      'x-rapidapi-key': '015351b58fmsh80f9d11792bb076p18c914jsnf079955c4424',
      'x-rapidapi-host': 'yt-api.p.rapidapi.com'
    }
  };

  try {
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

export const fetchSearchAPI = async (url) => {
  const options = {
    method: 'GET',
    url: `${BASE_URL}/${url}`,
    headers: {
      'x-rapidapi-key': '969e850623mshaeefd98a1c5a46fp114733jsn21d35431569e',
      'x-rapidapi-host': 'yt-api.p.rapidapi.com'
    }
  };

  try {
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
}

export const fetchAltAPI = async (url) => {
  const options = {
    method: 'GET',
    url: `${BASE_URL}/${url}`,
    headers: {
      'x-rapidapi-key': 'a01063de25mshe8ea5254ba4e3c0p1f6888jsn43e3d11a8c4a',
      'x-rapidapi-host': 'yt-api.p.rapidapi.com'
    }
  };

  try {
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
}

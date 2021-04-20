import axios from 'axios';

export const GetProfile = async username => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}`,
    );
    console.log('response profile:', response);
    return Promise.resolve(response);
  } catch (error) {
    console.log('error', error);
    return Promise.reject(error.request);
  }
};

export const GetRepo = async username => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`,
    );
    console.log('response repos:', response);
    return Promise.resolve(response);
  } catch (error) {
    console.log('error', error);
    return Promise.reject(error.request);
  }
};

import axios from 'axios';

export const GetProfile = async username => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}`,
    );
    console.log('response profile:', response);
  } catch (error) {
    console.log('error', error);
  }
};

export const GetRepo = async username => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`,
    );
    console.log('response repos:', response);
  } catch (error) {
    console.log('error', error);
  }
};

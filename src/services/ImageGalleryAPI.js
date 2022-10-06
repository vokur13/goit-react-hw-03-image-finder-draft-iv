import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

const API_KEY = '29248542-cea93977a5234fa0e2d1b3dfd';

export const fetchGallery = async (values, page) => {
  const response = await axios.get(
    `/?q=${values}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data.hits;
};

export const getMaterials = async () => {
  const response = await axios.get('/materials');
  return response.data;
};

// ===============================================

// export const FetchGallery = query => {
//   return fetch(
//     `https://pixabay.com/api/?q=${query}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//       //     throw new Error(`No item ${query} found`);
//     }
//     return response.json();
//   });
// };

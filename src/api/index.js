import axios from 'axios';

const HOST = process.env.REACT_APP_BACKEND_URL || '';

const server = {};

/**
 * @argument f {File[]}
 */
server.parsePDF = async (f, temperature) => {
  const formData = new FormData();
  formData.append("file", f[0], f[0].name);

  const res = await axios.post(`${HOST}/pdf`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params: {
      temperature,
    },
  });
  
  return res.data;
}

export default server;

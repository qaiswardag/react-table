// todos
import { useState } from 'react';
const [data, setData] = useState([]);

// fetch data
const fetchData = async function (url) {
  const response = await fetch(url);
  setData(await response.json());

  return {
    data,
  };
};

// test
// invoke method
fetchData();

export default fetchData();

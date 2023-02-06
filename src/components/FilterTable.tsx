import React, { useEffect, useMemo, useState } from 'react';
import '../index.css';
import { useTable } from 'react-table';
import { reactFetch } from 'lightweight-react-fetch';

export default function FilterTable(props) {
  const pathProducts = `https://fakestoreapi.com/products`;

  // use React fetch
  const {
    handleData,
    fetchedData,
    isError,
    validationProperties,
    isLoading,
    isSuccess,
  } = reactFetch();

  const fetchProducts = async function () {
    try {
      const body = await handleData(
        pathProducts,
        {},
        {
          isLoading: true,
          additionalCallTime: 100,
          abortTimeoutTime: 8000,
        }
      );
      console.log('body is:', body);
      return body.data;
    } catch (err) {
      console.log('Error fetching products!');
      return [];
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // cache data if the data have not been changed
  const data = useMemo(function () {
    return [
      {
        id: 1,
        title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
        price: 109.95,
        description:
          'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
        category: "men's clothing",
        image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        rating: {
          rate: 3.9,
          count: 120,
        },
      },
    ];
  }, []);

  const columns = useMemo(function () {
    [
      {
        // what is the title of the column we want to display
      },
    ];
  }, []);

  // table logic
  // const tableInstance = useTable({});
  return (
    <div>
      <div className="border-2 border-gray-300 px-4 py-4 mt-8 mb-12 rounded">
        <ul className="list-disc list-none">
          <li>For the table API we will use: Table API</li>
          <li>For the table API we will use: Table API</li>
          <li>For the table API we will use: Table API</li>
        </ul>
      </div>
      <table style={{ width: '100%' }} className="table-auto">
        <thead>
          <tr>
            <th>Song</th>
            <th>Artist</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border border-gray-200">
            <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
            <td>Malcolm Lockyer</td>
            <td>1961</td>
          </tr>
          <tr className="border border-gray-200">
            <td>Witchy Woman</td>
            <td>The Eagles</td>
            <td>1972</td>
          </tr>
          <tr className="border border-gray-200">
            <td>Shining Star</td>
            <td>Earth, Wind, and Fire</td>
            <td>1975</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

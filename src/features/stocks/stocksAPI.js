/**
 * Summary: Fetch call to get the api results.
 * @param {string}   URL         urL for the get the call to get the results.
 * @return {promise} promises to be resolved in the createAsyncThunk.
 */

import axios from 'axios';

export async function fetchStocksAPI(endpoint) {
  return await axios(endpoint)
    .then((body) => body)
    .catch((error) => console.error('Error', error));
}

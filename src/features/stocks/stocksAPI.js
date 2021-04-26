/**
 * Summary: Fetch call to get the api results.
 * @param {string}   endpoint  urL for the get the call to get the results.
 * @return {promise} promises to be resolved in the createAsyncThunk.
 */

export async function fetchStocksAPI(endpoint) {
  return await fetch(endpoint)
    .then((body) => body.json())
    .catch((error) => console.error('Error', error));
}

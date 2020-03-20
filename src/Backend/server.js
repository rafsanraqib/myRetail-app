// Library to send API get requests
import axios from "axios";
import RAPID_API from "./API_keys";
import TARGET_API_URL from './TargetAPI'

// Calls the target API for product info
const manageGetRequest = key => {
  axios
    .get(
      TARGET_API_URL
    )
    .then(res => {
      const newEntry = {
        id: res.data.product.available_to_promise_network.product_id,
        description: res.data.product.item.product_description.title,
        current_price: {}
      };
      if (newEntry.id === key) {
        // Formats the fetch URL for external API call

        var fetch_url_formatted = formatFetchUrl(key);

        // Gets product price from external API

        getProductPrice(fetch_url_formatted,0,newEntry);
        return;
      }
      console.log("no items matched");
    });
};

// Formats the URL to query the product price API
const formatFetchUrl = product_key => {
  var url = "https://feeditem-target.p.rapidapi.com/itemID/";
  var p_id_string = product_key.toString();
  url += p_id_string;
  return url;
};

// Gets the price of the product. sign parameter indicate type of request
// sign != 0 means user inititiated put request. sign = 0 means get request
// Have an enumerator or array with more options like delete, post requests.
const getProductPrice = (api_url,sign,dataStore) => {
  fetch(api_url, {
    method: "GET",
    headers: {
      "x-rapidapi-host": RAPID_API.API_HOST,
      "x-rapidapi-key": RAPID_API.API_KEY
    }
  })
    .then(response => response.json())
    .then(data => {
      if(sign != 0){
        executePutRequest(api_url, data);
        return;
      }
      // Merges the two records into one

      mergeTwoDataPoints(data.Item.CurrentPrice.Value, dataStore);
    })
    .catch(err => {
      console.log(err);
    });
};

// Joins the product info record with the product price record.
const mergeTwoDataPoints = (price_data, product_data) => {
  // New price object creation

  const price_object = {
    value: price_data,
    currency_code: "USD"
  };

  // Merge

  product_data.current_price = price_object;
  var ret_string = JSON.stringify(product_data);
  console.log(ret_string);
};

let new_price = 0;
// Initiates PUT request by formatting the URL.
// Calls getProductPrice() with sign=1 parameter to indicate PUT request
const managePutRequest = (product_id, new_price_data) => {
  new_price = new_price_data;
  var format_url = formatFetchUrl(product_id);
  getProductPrice(format_url, 1);
}

// Executes PUT request
// Incomplete at this moment
// Only creates the record that is to be updated in the external API
const executePutRequest = (api_url_,price_data) =>{

  price_data.Item.CurrentPrice.Value = new_price;
  console.log(price_data);
};

// Export methods as an array. 
const methods = {managePutRequest, manageGetRequest};
export default methods;

// Library to send API get requests
import axios from "axios";
import RAPID_API from "./API_keys";

// Calls the target API for product info
const manageRequest = key => {
  axios
    .get(
      "https://redsky.target.com/v2/pdp/tcin/13860428?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics"
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

        getProductPrice(fetch_url_formatted, newEntry);
        return;
      }
      console.log("no items matched");
    });
};

const formatFetchUrl = product_key => {
  var url = "https://feeditem-target.p.rapidapi.com/itemID/";
  var p_id_string = product_key.toString();
  url += p_id_string;
  return url;
};

const getProductPrice = (api_url, dataStore) => {
  fetch(api_url, {
    method: "GET",
    headers: {
      "x-rapidapi-host": RAPID_API.API_HOST,
      "x-rapidapi-key": RAPID_API.API_KEY
    }
  })
    .then(response => response.json())
    .then(data => {
      // Merges the two records into one

      mergeTwoDataPoints(data.Item.CurrentPrice.Value, dataStore);
    })
    .catch(err => {
      console.log(err);
    });
};

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

export default manageRequest;

import axios from "axios";
import * as actionTypes from "./types";


export const getCoffeeShops = () => {
  return async dispatch => {
    dispatch(setCoffeeShopsLoading());
    try {
      const res = await axios.get("http://coffee.q8fawazo.me/api/?format=json");
      const coffeeShops = res.data;
      dispatch({
        type: actionTypes.GET_COFFEESHOPS,
        payload: coffeeShops
      });
    } catch (err) {
      console.error("Error while fetching shops", err);
    }
  };
};

export const setCoffeeShopsLoading = () => ({
  type: actionTypes.COFFEESHOPS_LOADING
});

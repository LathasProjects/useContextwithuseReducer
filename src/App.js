import { createContext, useEffect, useReducer, useState } from "react";
import "./App.css";
import Cartitems from "./components/Cartitems";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

const initialState = {
  itemsList: [],
  cartItems: [],
  totalItems: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_API_DATA":
      return { ...state, itemsList: action.payload };
    case "ADD_TO_CART":
      const selectedItem = state.itemsList.find(
        (item) => item.id === action.payload
      );

      return {
        ...state,
        cartItems: [...state.cartItems, selectedItem],
        totalItems: state.totalItems + 1,
      };
    default:
      return state;
  }
};

export const context = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getAPIData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("https://dummyjson.com/products");
        dispatch({ type: "GET_API_DATA", payload: res.data.products });
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getAPIData();
  }, []);

  if (isLoading) {
    <ThreeDots
      visible={true}
      height="80"
      width="80"
      color="#4fa94d"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />;
  }

  return (
    <context.Provider value={{ data, dispatch }}>
      <div className="App">
        <Cartitems />
      </div>
    </context.Provider>
  );
}

export default App;

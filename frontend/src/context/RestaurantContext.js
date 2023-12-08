import { createContext, useReducer } from "react";

export const RestaurantContext = createContext();

export const restaurantReducer = (state, action) => {
  switch (action.type) {
    case "SET_RESTAURANT":
      return {
        restaurant: action.payload,
      };
    case "UPDATE_RESTAURANT":
      return {
        restaurant: { ...state.restaurant, ...action.payload },
      };
    case "DELETE_RESTAURANT":
      return {
        restaurant: null,
      };
    case "ADD_REVIEW":
      return {
        restaurant: {
          ...state.restaurant,
          reviews: [...state.restaurant.reviews, action.payload],
        },
      };
    default:
      return state;
  }
};

export const RestaurantContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(restaurantReducer, {
    restaurant: null,
  });

  return (
    <RestaurantContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RestaurantContext.Provider>
  );
};

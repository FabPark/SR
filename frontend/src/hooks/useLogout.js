import { useAuthContext } from "./useAuthContext";
import { useRestaurantContext } from "./useRestaurantContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchRestaurant } = useRestaurantContext();

  const logout = () => {
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });

    dispatchRestaurant({ type: "DISCONNECT" });
  };

  return { logout };
};

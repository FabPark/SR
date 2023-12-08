import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";

import AddRestaurant from "./pages/AddRestaurant";
import RestaurantDetails from "./pages/RestaurantDetails";
import UpdateRestaurantInfo from "./pages/UpdateRestaurantInfo";
import Signup from "./pages/Signup";
import { useAuthContext } from "./hooks/useAuthContext";
import Navbar from "./components/Navbar";
import LoginContainer from "./pages/Login";
import RestaurantList from "./pages/RestaurantList";
import About from "./pages/AboutPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { user } = useAuthContext();

  return (
    <Router>
      <div>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route exact path="/" element={<RestaurantList />} />
          <Route path="/about" element={<About />} />
          <Route path="/add-restaurant" element={<AddRestaurant />} />
          <Route
            path="/edit-restaurant/:id"
            element={<UpdateRestaurantInfo />}
          />
          <Route
            path="/restaurant-detail/:restaurantId"
            element={<RestaurantDetails />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <LoginContainer /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

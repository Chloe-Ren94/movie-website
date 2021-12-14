import {BrowserRouter, Route, Routes} from "react-router-dom";
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";

import './App.css';
import './vendors/bootstrap/css/bootstrap.min.css';
import './vendors/bootstrap/bootstrap.min.css';
import './vendors/fontawesome/css/all.min.css';

import SearchScreen from './components/SearchScreen';
import DetailsScreen from './components/DetailsScreen';
import RegisterScreen from './components/RegisterScreen';
import LoginScreen from './components/LoginScreen';
import ProfileScreen from './components/ProfileScreen';
import HomeScreen from "./components/HomeScreen";
import Privacy from "./components/Privacy";

import profile from "./components/reducers/profile";
import login from "./components/reducers/login";
import OtherUserProfile from "./components/ProfileScreen/OtherUserProfile";



const reducer = combineReducers({profile, login})
const store = createStore(reducer);

function App() {
  return (
      <Provider store={store}>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<HomeScreen/>}/>
                  <Route path="/privacy" element={<Privacy/>}/>
                  <Route path="/register" element={<RegisterScreen/>}/>
                  <Route path="/login" element={<LoginScreen/>}/>
                  <Route path="/profile" element={<ProfileScreen/>}/>
                  <Route path="/profile/:id" element={<OtherUserProfile/>}/>
                  <Route path="/search" element={<SearchScreen/>}/>
                  <Route path="/search/:searchTerm" element={<SearchScreen/>}/>
                  <Route path="/details/:id" element={<DetailsScreen/>}/>
              </Routes>
          </BrowserRouter>
      </Provider>
  );
}

export default App;

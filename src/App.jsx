import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import AOS from 'aos';
import 'aos/dist/aos.css';
import TopProducts from './components/TopProducts/TopProducts';
import Popup from './components/Popup/Popup';
import { Toprated } from './newcomp/topRated/topRated';
import Hero from './components/Hero/Hero';
import Banner from './components/Banner/Banner';
import Subscribe from './components/Subscribe/Subscribe';
import Testimonials from './components/Testimonials/Testimonials';
import Footer from './components/Footer/Footer';
import Login from './newcomp/Login/Login';
import Signup from './newcomp/Sinup/Signup';
import { TopRated } from './singles/TopRated/TopRated';
import UserCart from './components/UserCart';
import { KidsWear } from './newcomp/KidsWear/KidsWear';
import { SingleKids } from './singles/SingleKids/SingleKids';
import MensWear from './newcomp/MensWear/MensWear';
import {SingleMens} from './singles/SingleMens/SingleMens';
import { Electronic } from './newcomp/Electronic/Electronic';
import { ElectronicSingle } from './singles/ElectronicSingle/ElectronicSingle';

import Trending from './newcomp/Trending/Trending';
import { SingleTrending } from './singles/SingleTrending/SingleTrending';
import { Selling } from './newcomp/Selling/Selling';
import { SingleSelling } from './singles/SingkeSelling/SingleSelling';


// eslint-disable-next-line react/prop-types
const Home = ({ handleOrderPopup, orderPopup, setOrderPopup,addToCart }) => (
  <>
    <Hero handleOrderPopup={handleOrderPopup}  />
    <TopProducts handleOrderPopup={handleOrderPopup} addToCart={addToCart}/>
    <Banner />
    <Subscribe />
    <Testimonials />
    <Footer />
    <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
  </>
);

const App = () => {
 
  const [orderPopup, setOrderPopup] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);



  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };


  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: 'ease-in-sine',
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <Router>
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
        <Navbar handleOrderPopup={handleOrderPopup} cartItems={cartItems} />
        <Routes>
          <Route
            path="/"
            element={
            <Home 
            handleOrderPopup={handleOrderPopup} 
            orderPopup={orderPopup} 
            setOrderPopup={setOrderPopup}
            addToCart={addToCart}  
            />
          }
          />

          <Route path="/top-rated" element={<Toprated addToCart={addToCart}/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/single-toprated" element={<TopRated/>} />
          <Route path="/single-mens" element={<SingleMens/>}/>
          <Route path="/cart" element={<UserCart/>}/>
          <Route path='/kids-wear' element={<KidsWear/>}/>
          <Route path='/single-kids' element={<SingleKids />} />
          <Route path='/mens-wear' element={<MensWear/>}/>
          <Route path ='/electronic' element={<Electronic/>} />
          <Route path='/single-electronic' element={<ElectronicSingle />} />
          <Route path='/trending' element={<Trending/>}/>
          <Route path='/single-trending' element={<SingleTrending/>}/> 
          <Route path='/selling' element={<Selling/>}/>
          <Route path='/Single-selling' element={<SingleSelling/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
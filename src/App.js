import React, { useEffect, useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Home from "./Routes/Home";
import Signin from './Routes/Signin';
import Signup from './Routes/Signup';
import Account from './Routes/Account';
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import CoinPage from "./Routes/CoinPage";
import Footer from "./components/Footer";
import { AuthContextProvider } from "./context/AuthContext";

function App() {

  const [coins, setCoins] = useState([])
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=51&page=1&sparkline=true&locale=en';

  useEffect(() => {
    axios.get(url).then((response) => {
      setCoins(response.data);
      //console.log(response.data);
    })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [url]);


  return <ThemeProvider>
    <AuthContextProvider>

      <Navbar />
      <Routes>
        <Route path='/' element={<Home coins={coins} />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/account' element={<Account />} />
        <Route path='/coin/:coinId' element={<CoinPage />}>
          <Route path=':coinId' />
        </Route>
      </Routes>
      <Footer />

    </AuthContextProvider>
  </ThemeProvider>
}

export default App;

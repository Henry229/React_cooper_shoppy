import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/firebase';
import Banner from '../components/Banner';
import Products from '../components/Products';

const Home = () => {
  const [products, setProducts] = useState({});

  useEffect(() => {
    getProducts() //
      .then(setProducts);
  }, []);

  return (
    <>
      <Banner />
      <Products />
    </>
  );
};

export default Home;

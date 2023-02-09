import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCart } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';
import CartItem from '../components/CartItem';
import PriceCard from '../components/PriceCard';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import Button from '../components/ui/Button';

const SHIPPING = 5;

const MyCart = () => {
  const { uid } = useAuthContext();
  const { isLoading, data: products } = useQuery(['carts'], () => getCart(uid));

  if (isLoading) return <p>Loading...</p>;

  const hasProducts = products && products.length > 0;
  const totalPrice =
    hasProducts &&
    products.reduce(
      (priv, product) => priv + parseInt(product.price) * product.quantity,
      0
    );

  return (
    <section className='p-8 flex flex-col'>
      <p className='text-2xl text-center font-bold pb-4 border-b border-gray-300'>
        My Cart
      </p>
      {!hasProducts && <p>Your cart is empty</p>}
      {hasProducts && (
        <>
          <ul className='border-b border-gray-300 mb-8 px-4'>
            {products &&
              products.map((product) => (
                <CartItem key={product.id} product={product} uid={uid} />
              ))}
          </ul>
          <div className='flex justify-between items-center mb-6 px-2 md:px-8 lg:px-16'>
            <PriceCard text='Total Price' price={totalPrice} />
            <BsFillPlusCircleFill className='shrink-0' />
            <PriceCard text='Shipping fee' price={SHIPPING} />
            <FaEquals className='shrink-0' />
            <PriceCard text='Total Amount' price={totalPrice + SHIPPING} />
          </div>
          <Button text='Order Now' />
        </>
      )}
    </section>
  );
};

export default MyCart;

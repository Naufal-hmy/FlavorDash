import React, { createContext, useState, useContext } from 'react';

// Buat Context
const OrderContext = createContext();

// Buat Provider Component
export const OrderProvider = ({ children }) => {
  const [orderStatus, setOrderStatus] = useState('Sedang Diantar 🛵');

  return (
    <OrderContext.Provider value={{ orderStatus, setOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};

// Buat Custom Hook untuk mempermudah pemakaian
export const useOrder = () => useContext(OrderContext);

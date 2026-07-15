import React, { createContext, useState, useContext } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderStatus, setOrderStatus] = useState('Belum Ada Pesanan');
  const [cart, setCart] = useState([]);
  const [proofPhoto, setProofPhoto] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderHistory, setOrderHistory] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          const newQty = item.qty + delta;
          return { ...item, qty: newQty };
        }
        return item;
      }).filter((item) => item.qty > 0);
    });
  };

  const clearCart = () => setCart([]);

  const confirmOrder = () => {
    setOrderStatus('Sedang Dibuat 🍳');
    // Simulasi transisi ke 'Sedang Diantar' setelah 5 detik
    setTimeout(() => {
      setOrderStatus('Sedang Diantar 🛵');
    }, 5000);
  };

  const finishOrder = () => {
    const totalPayment = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const newHistoryItem = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      items: [...cart],
      total: totalPayment,
      address: deliveryAddress,
      photo: proofPhoto,
    };
    
    setOrderHistory((prev) => [newHistoryItem, ...prev]);
    
    // Reset order
    setCart([]);
    setOrderStatus('Belum Ada Pesanan');
    setProofPhoto(null);
    setDeliveryAddress('');
  };

  return (
    <OrderContext.Provider value={{ 
      orderStatus, setOrderStatus,
      cart, addToCart, updateQty, clearCart, confirmOrder,
      proofPhoto, setProofPhoto,
      deliveryAddress, setDeliveryAddress,
      orderHistory, finishOrder
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);


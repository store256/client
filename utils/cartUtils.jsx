// utils/cartUtils.js
export const getCart = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
};

export const setCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

export const addToCart = (item) => {
    const cart = getCart();
    cart.push(item);
    setCart(cart);
};

export const removeFromCart = (itemId) => {
    let cart = getCart();
    cart = cart.filter(item => item.id !== itemId);
    setCart(cart);
};

export const updateCartItemQuantity = (itemId, quantity) => {
    let cart = getCart();
    cart = cart.map(item => item.id === itemId ? { ...item, inputValue: quantity } : item);
    setCart(cart);
};

export const clearCart = () => {
    localStorage.removeItem('cart');
};

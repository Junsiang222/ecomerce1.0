
export function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}
export function updateCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
export function addToCart(product) {
  let cart = getCart();
  const existingProduct = cart.find(item => item._id === product._id);
  if (existingProduct) {
    existingProduct.quantity += 1; 
  } else {
    cart.push({ ...product, quantity: 1 }); 
  }

  updateCart(cart);
  return cart;
}   

export function deleteItemFromCart(_id) {
  let cart = getCart();
  cart = cart.filter(item => item._id !== _id);
  updateCart(cart);
  return cart;
}

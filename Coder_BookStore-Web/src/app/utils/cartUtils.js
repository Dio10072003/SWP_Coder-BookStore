export function addToCartLocal(book) {
  if (typeof window === "undefined") return;
  const stored = localStorage.getItem("cart");
  let cart = stored ? JSON.parse(stored) : [];
  const found = cart.find((item) => item.id === book.id);
  if (found) {
    cart = cart.map((item) =>
      item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  } else {
    cart.push({ ...book, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}
/*
export function addToCartLocal(book) {
  if (typeof window === 'undefined') return;
  const stored = localStorage.getItem('cart');
  let cart = stored ? JSON.parse(stored) : [];
  const found = cart.find(item => item.id === book.id);
  if (found) {
    cart = cart.map(item =>
      item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  } else {
    cart.push({ ...book, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
} 
*/

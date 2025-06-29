//Логіка сторінки Wishlist
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { renderProductsWishList } from './js/render-function';
import { handleOpenModal, handleCloseModal } from './js/modal';
import { products, modal, wishCount, cartCount, form } from './js/refs';

if (JSON.parse(localStorage.getItem('wishlist'))) {
  wishCount.textContent = JSON.parse(localStorage.getItem('wishlist')).length;
}
if (JSON.parse(localStorage.getItem('cart'))) {
  cartCount.textContent = JSON.parse(localStorage.getItem('cart')).length;
}

renderProductsWishList();

products.addEventListener('click', handleOpenModal);

modal.addEventListener('click', handleCloseModal);

form.addEventListener('submit', event => {
  event.preventDefault();
  window.location.href = 'index.html';
});

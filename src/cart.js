//Логіка сторінки Cart
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { renderProductsCartList } from './js/render-function';
import { handleOpenModal, handleCloseModal } from './js/modal';
import { products, modal, wishCount, cartCount, btnBuy, form } from './js/refs';
import { countCart } from './js/helpers';
import { handleBtnBuy } from './js/handlers';

if (JSON.parse(localStorage.getItem('wishlist'))) {
  wishCount.textContent = JSON.parse(localStorage.getItem('wishlist')).length;
}
if (JSON.parse(localStorage.getItem('cart'))) {
  cartCount.textContent = JSON.parse(localStorage.getItem('cart')).length;
}

renderProductsCartList();
countCart();

products.addEventListener('click', handleOpenModal);

modal.addEventListener('click', handleCloseModal);

btnBuy.addEventListener('click', handleBtnBuy);

form.addEventListener('submit', event => {
  event.preventDefault();
  window.location.href = 'index.html';
});

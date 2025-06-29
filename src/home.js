import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {
  renderCategoriesList,
  renderPaginatedProducts,
} from './js/render-function';

import { handleOpenModal, handleCloseModal } from './js/modal';
import {
  categories,
  products,
  modal,
  form,
  btnClear,
  wishCount,
  cartCount,
} from './js/refs';
import { handleCategories, handleSubmit, handleBtnClear } from './js/handlers';

renderCategoriesList();

renderPaginatedProducts();

if (JSON.parse(localStorage.getItem('wishlist'))) {
  wishCount.textContent = JSON.parse(localStorage.getItem('wishlist')).length;
}
if (JSON.parse(localStorage.getItem('cart'))) {
  cartCount.textContent = JSON.parse(localStorage.getItem('cart')).length;
}

categories.addEventListener('click', handleCategories);

products.addEventListener('click', handleOpenModal);

modal.addEventListener('click', handleCloseModal);

form.addEventListener('submit', handleSubmit);

btnClear.addEventListener('click', handleBtnClear);

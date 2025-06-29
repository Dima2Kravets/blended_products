//Описана робота модалки - відкриття закриття і все що з модалкою повʼязано
import { renderProduct } from './render-function';
import { modal, addToWishBtn, addToCartBtn } from './refs';
import { handleClickAddWish, handleClickAddCart } from './handlers';

export async function handleOpenModal(event) {
  addToWishBtn.textContent = 'Add to Wishlist';
  addToCartBtn.textContent = 'Add to Cart';
  const idProduct = event.target.closest('li').dataset.id;
  await renderProduct(idProduct);
  const getWishList = JSON.parse(localStorage.getItem('wishlist')) || [];
  if (getWishList.find(i => i === idProduct)) {
    addToWishBtn.textContent = 'Remove from Wishlist';
  }
  const getCartList = JSON.parse(localStorage.getItem('cart')) || [];
  if (getCartList.find(i => i === idProduct)) {
    addToCartBtn.textContent = 'Remove from Cart';
  }
  modal.classList.add('modal--is-open');
}

export function handleCloseModal(event) {
  if (event.target.classList.contains('modal__close-btn')) {
    modal.classList.remove('modal--is-open');
  }
}

addToWishBtn.addEventListener('click', handleClickAddWish);

addToCartBtn.addEventListener('click', handleClickAddCart);

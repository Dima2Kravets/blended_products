// Функції, які передаються колбеками в addEventListners
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {
  renderPaginatedProducts,
  renderProductsCategory,
  renderProductsSearch,
  renderProductsWishList,
  renderProductsCartList,
} from './render-function';
import {
  notFound,
  addToWishBtn,
  wishCount,
  cartCount,
  addToCartBtn,
} from './refs';
import { resetDefault, countCart } from './helpers';

export function handleCategories(event) {
  resetDefault();
  if (event.target.classList.contains('categories__btn--active')) {
    return;
  }
  document
    .querySelectorAll('.categories__btn')
    .forEach(btn => btn.classList.remove('categories__btn--active'));
  event.target.classList.add('categories__btn--active');
  const categoryChosen = event.target.textContent.trim();
  if (event.target.textContent === 'All') {
    renderPaginatedProducts();
  } else {
    renderProductsCategory(categoryChosen);
  }
}

export async function handleSubmit(event) {
  event.preventDefault();
  notFound.classList.remove('not-found--visible');
  document
    .querySelectorAll('.categories__btn')
    .forEach(btn => btn.classList.remove('categories__btn--active'));
  const userSearch = event.target.elements.searchValue.value
    .trim()
    .toLowerCase();
  console.dir(event.target.elements.searchValue.value);
  if (!userSearch) {
    iziToast.warning({
      message: 'Please enter a search term.',
      position: 'topRight',
    });
    return;
  }
  await renderProductsSearch(userSearch);
  form.reset();
}

export async function handleBtnClear(event) {
  resetDefault();
  document
    .querySelectorAll('.categories__btn')
    .forEach(btn => btn.classList.remove('categories__btn--active'));
  await renderPaginatedProducts();
}

export function handleClickAddWish(event) {
  const KEY = 'wishlist';
  let getWishList = JSON.parse(localStorage.getItem(KEY)) || [];
  const idProduct =
    event.target.closest('.modal__content').children[1].children[0].dataset.id;
  if (addToWishBtn.textContent === 'Remove from Wishlist') {
    getWishList = getWishList.filter(i => i !== idProduct);
    localStorage.setItem(KEY, JSON.stringify(getWishList));
    addToWishBtn.textContent = 'Add to Wishlist';
    wishCount.textContent = getWishList.length;
  } else {
    getWishList.push(idProduct);
    localStorage.setItem(KEY, JSON.stringify(getWishList));
    wishCount.textContent = getWishList.length;
    addToWishBtn.textContent = 'Remove from Wishlist';
  }

  if (event.target.attributes.class.baseURI.includes('wishlist.html')) {
    renderProductsWishList();
  }
  if (getWishList.length > 0) {
    resetDefault();
  }
}

export function handleClickAddCart(event) {
  const KEY = 'cart';
  let getCartList = JSON.parse(localStorage.getItem(KEY)) || [];
  console.log(getCartList);
  const idProduct =
    event.target.closest('.modal__content').children[1].children[0].dataset.id;
  console.log(event);
  if (addToCartBtn.textContent === 'Remove from Cart') {
    getCartList = getCartList.filter(i => i !== idProduct);
    localStorage.setItem(KEY, JSON.stringify(getCartList));
    addToCartBtn.textContent = 'Add to Cart';
    cartCount.textContent = getCartList.length;
  } else {
    getCartList.push(idProduct);
    localStorage.setItem(KEY, JSON.stringify(getCartList));
    cartCount.textContent = getCartList.length;
    addToCartBtn.textContent = 'Remove from Cart';
  }
  if (event.target.attributes.class.baseURI.includes('cart.html')) {
    renderProductsCartList();
    countCart();
  }
  if (getCartList.length > 0) {
    resetDefault();
  }
}

export function handleBtnBuy() {
  if (!JSON.parse(localStorage.getItem('cart'))) {
    return;
  }
  localStorage.removeItem('cart');
  cartCount.textContent = 0;
  renderProductsCartList();
  countCart();
  iziToast.success({
    title: 'OK',
    message: 'Successfully purchased products!',
    position: 'topRight',
  });
}

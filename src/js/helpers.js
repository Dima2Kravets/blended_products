//Допоміжні функції
import { input, notFound, item, total, loader } from './refs';
import { getProduct } from './products-api';

export function resetDefault() {
  input.value = '';
  notFound.classList.remove('not-found--visible');
}

export async function countCart() {
  const cartArray = JSON.parse(localStorage.getItem('cart')) || [];
  try {
    const cartPromiseArrey = cartArray.map(async id => {
      return getProduct(id);
    });
    const cartPromiseAll = await Promise.all(cartPromiseArrey);
    const priceArray = cartPromiseAll.map(({ price }) => {
      return price;
    });
    const totalPrice = priceArray
      .reduce((acc, value) => acc + value, 0)
      .toFixed(2);
    const totalProducts = priceArray.length;
    item.textContent = `${totalProducts}`;
    total.textContent = `$${totalPrice}`;
  } catch (error) {
    console.error(error);
  }
}

export function hideLoader() {
  loader.classList.add('hidden');
}
export function showLoader() {
  loader.classList.remove('hidden');
}

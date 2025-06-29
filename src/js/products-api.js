import axios from 'axios';

export async function getCategoriesApi() {
  const resp = await axios('https://dummyjson.com/products/category-list');
  return resp.data;
}

export async function getTotalProductsCount() {
  const resp = await axios('https://dummyjson.com/products');
  return resp.data.total;
}

export async function getProductsCategory(categoryChosen) {
  const resp = await axios(
    `https://dummyjson.com/products/category/${categoryChosen}`
  );
  return resp.data.total;
}

export async function getProductsSearch(userSearch) {
  const resp = await axios(
    `https://dummyjson.com/products/search?q=${userSearch}`
  );
  return resp.data.total;
}

export async function getProduct(id) {
  const resp = await axios(`https://dummyjson.com/products/${id}`);
  return resp.data;
}

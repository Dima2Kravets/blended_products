import axios from 'axios';
import { categories, products, notFound, modalProduct } from './refs';
import {
  getCategoriesApi,
  getTotalProductsCount,
  getProductsCategory,
  getProductsSearch,
  getProduct,
} from './products-api';
import { showLoader, hideLoader } from './helpers';

export async function renderCategoriesList() {
  try {
    const categoriesListApi = await getCategoriesApi();
    const categoriesAll = ['All', ...categoriesListApi];
    const markapCategories = categoriesAll
      .map(
        i => `<li class="categories__item">
      <button class="categories__btn" type="button">${i}</button>
    </li>`
      )
      .join('');
    categories.innerHTML = markapCategories;
  } catch (error) {
    console.error(error);
  }
}

export async function renderPaginatedProducts() {
  try {
    $('#pagination-container').pagination({
      dataSource: async function (done) {
        const total = await getTotalProductsCount();
        done(Array.from({ length: total })); // віртуальний масив лише для pagination.js
      },
      pageSize: 12,
      showPrevious: true,
      showNext: true,
      callback: async function (data, pagination) {
        showLoader();
        const skip = (pagination.pageNumber - 1) * 12;
        const resp = await axios(
          `https://dummyjson.com/products?limit=12&skip=${skip}`
        );
        hideLoader();
        const productsListApi = resp.data.products;

        const markapProducts = productsListApi
          .map(
            ({
              id,
              images,
              title,
              brand,
              category,
              price,
            }) => `<li class="products__item" data-id="${id}">
        <img class="products__image" src="${images[0]}" alt="${title}"/>
        <p class="products__title">${title}</p>
        <p class="products__brand"><span class="products__brand--bold">Brand:</span> ${brand}</p>
        <p class="products__category">Category: ${category}</p>
        <p class="products__price">Price: ${price}$</p>
      </li>`
          )
          .join('');
        products.innerHTML = markapProducts;
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function renderProductsCategory(categoryChosen) {
  try {
    $('#pagination-container').pagination({
      dataSource: async function (done) {
        const total = await getProductsCategory(categoryChosen);
        done(Array.from({ length: total })); // віртуальний масив лише для pagination.js
      },
      pageSize: 12,
      showPrevious: true,
      showNext: true,
      callback: async function (data, pagination) {
        showLoader();
        const skip = (pagination.pageNumber - 1) * 12;
        const resp = await axios(
          `https://dummyjson.com/products/category/${categoryChosen}?limit=12&skip=${skip}`
        );
        hideLoader();
        const productsListApi = resp.data.products;

        if (productsListApi.length === 0) {
          products.innerHTML = '';
          notFound.classList.add('not-found--visible');
          return;
        }
        const markapProducts = productsListApi
          .map(
            ({
              id,
              images,
              title,
              brand,
              category,
              price,
            }) => `<li class="products__item" data-id="${id}">
    <img class="products__image" src="${images[0]}" alt="${title}"/>
    <p class="products__title">${title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:</span> ${brand}</p>
    <p class="products__category">Category: ${category} </p>
    <p class="products__price">Price: ${price}$</p>
 </li>`
          )
          .join('');
        products.innerHTML = markapProducts;
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function renderProduct(id) {
  try {
    modalProduct.innerHTML = '';
    const product = await getProduct(id);
    const {
      images,
      description,
      title,
      shippingInformation,
      returnPolicy,
      price,
    } = product;

    const tagsMarkup = product.tags
      .map(tag => `<li><a href="">${tag}</a></li>`)
      .join('');
    const markapProduct = `<img class="modal-product__img" src="${images[0]}" alt="${description}" data-id="${id}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${title}</p>
        <ul class="modal-product__tags">${tagsMarkup}</ul>
        <p class="modal-product__description">${description}</p>
        <p class="modal-product__shipping-information">Shipping: ${shippingInformation}</p>
        <p class="modal-product__return-policy">Return Policy: ${returnPolicy}</p>
        <p class="modal-product__price">Price: ${price}$</p>
      </div>`;
    modalProduct.innerHTML = markapProduct;
  } catch (error) {
    console.error(error);
  }
}

export async function renderProductsSearch(userSearch) {
  try {
    $('#pagination-container').pagination({
      dataSource: async function (done) {
        showLoader();
        const total = await getProductsSearch(userSearch);
        done(Array.from({ length: total })); // віртуальний масив лише для pagination.js
      },
      pageSize: 12,
      showPrevious: true,
      showNext: true,
      callback: async function (data, pagination) {
        showLoader();
        const skip = (pagination.pageNumber - 1) * 12;
        const resp = await axios(
          `https://dummyjson.com/products/search?q=${userSearch}`
        );
        hideLoader();
        const productsListApi = resp.data.products;

        if (productsListApi.length === 0) {
          products.innerHTML = '';
          notFound.classList.add('not-found--visible');
          return;
        }
        const markapProducts = productsListApi
          .map(
            ({
              id,
              images,
              title,
              brand,
              category,
              price,
            }) => `<li class="products__item" data-id="${id}">
    <img class="products__image" src="${images[0]}" alt="${title}"/>
    <p class="products__title">${title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:</span> ${brand}</p>
    <p class="products__category">Category: ${category} </p>
    <p class="products__price">Price: ${price}$</p>
 </li>`
          )
          .join('');
        products.innerHTML = markapProducts;
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function renderProductsWishList() {
  const wishArray = JSON.parse(localStorage.getItem('wishlist')) || [];

  if (wishArray.length === 0) {
    products.innerHTML = '';
    notFound.classList.add('not-found--visible');
    return;
  }

  $('#pagination-container').pagination({
    dataSource: wishArray,
    pageSize: 12,
    showPrevious: true,
    showNext: true,
    callback: async function (data, pagination) {
      try {
        showLoader();
        const productPromises = data.map(id => getProduct(id));
        const productsList = await Promise.all(productPromises);
        hideLoader();
        const markapProducts = productsList
          .map(
            ({
              id,
              images,
              title,
              brand,
              category,
              price,
            }) => `<li class="products__item" data-id="${id}">
              <img class="products__image" src="${images[0]}" alt="${title}"/>
              <p class="products__title">${title}</p>
              <p class="products__brand"><span class="products__brand--bold">Brand:</span> ${brand}</p>
              <p class="products__category">Category: ${category}</p>
              <p class="products__price">Price: ${price}$</p>
            </li>`
          )
          .join('');
        products.innerHTML = markapProducts;
      } catch (error) {
        console.error(error);
      }
    },
  });
}

export async function renderProductsCartList() {
  const cartArray = JSON.parse(localStorage.getItem('cart')) || [];

  if (cartArray.length === 0) {
    products.innerHTML = '';
    notFound.classList.add('not-found--visible');
    return;
  }

  $('#pagination-container').pagination({
    dataSource: cartArray,
    pageSize: 12,
    showPrevious: true,
    showNext: true,
    callback: async function (data, pagination) {
      try {
        showLoader();
        const productPromises = data.map(id => getProduct(id));
        const productsList = await Promise.all(productPromises);
        hideLoader();
        const markapProducts = productsList
          .map(
            ({
              id,
              images,
              title,
              brand,
              category,
              price,
            }) => `<li class="products__item" data-id="${id}">
              <img class="products__image" src="${images[0]}" alt="${title}"/>
              <p class="products__title">${title}</p>
              <p class="products__brand"><span class="products__brand--bold">Brand:</span> ${brand}</p>
              <p class="products__category">Category: ${category}</p>
              <p class="products__price">Price: ${price}$</p>
            </li>`
          )
          .join('');
        products.innerHTML = markapProducts;
      } catch (error) {
        console.error(error);
      }
    },
  });
}

import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

const category = getParam('category');
const dataSource = new ProductData();
const listElement = document.querySelector('.product-list');
const myList = new ProductList(category, dataSource, listElement);
myList.init();

// title, e.g. "Top Products: Sleeping Bags"
const categoryName = category
    .split('-')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
document.querySelector('.products h2').textContent =
    `Top Products: ${categoryName}`;
import { categoryRender } from "./categoryRender.js";
import {params, prev, next, input, pageNum, find} from "./variables.js"
import { apiHandle } from "./apiHandle.js";

// First Render
apiHandle();

// Product type
categoryRender();

// Search
const search = () => {
  let value = input.value;
  if(value != "") {
    params.q = input.value;
    params.page = 1;
    pageNum.innerHTML = params.page;
    apiHandle();
  }
};
find.addEventListener('click', () => {
  search();
})
input.addEventListener('keydown', (e) => {
  if(e.key === "Enter") {
    search();
  }
})

// Filter
let select = document.querySelector('select');
select.addEventListener('change', (e) => {
  switch (e.target.value) {
    case 'default':
      params.sort = '';
      params.order = '';
      break;
    case 'asc-price':
      params.sort = 'price';
      params.order = 'asc';
      break;
    case 'desc-price':
      params.sort = 'price';
      params.order = 'desc';
      break;
    case 'asc-stock':
      params.sort = 'stock';
      params.order = 'asc';
      break;
    case 'desc-dc':
      params.sort = 'discountPercentage';
      params.order = 'desc';
      break;
  }
  apiHandle();
})

// Pagination

// Previous
prev.addEventListener('click', () => {
  next.style.display = "block";
  if(params.page > 1) {
    params.page--;
    pageNum.innerHTML = params.page;
    apiHandle();
  }
})

// Next
next.addEventListener('click', () => {
  prev.style.display = "block";
  params.page++;
  pageNum.innerHTML = params.page;
  apiHandle();
})


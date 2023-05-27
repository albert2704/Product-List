import { fetchApi } from "./fetchApi.js";
import { params } from "./params.js";
const productsList = document.querySelector('#products--list');
let products = document.querySelector('#products');
let myApi = `https://products-list-two.vercel.app/products?_page=${params.page}&_limit=${params.limit}&q=${params.q}&_sort=${params.sort}&_order=${params.order}`;
let prev = document.querySelector('#btn__pre');
let next = document.querySelector('#btn__next');
let input = document.querySelector('#search');
let pageNum = document.querySelector('#page--num');
const myArr = [];
// Product type
fetchApi("https://products-list-two.vercel.app/products")
.then(data => {
  data.map((item) => {
    let check = 1;
    myArr.forEach((stuff) => {
      if(stuff == item.category) check = 0;
      })
      if(check === 1){ 
        myArr.push(item.category);
        const productsType = document.createElement('div');
        productsType.classList.add('products--type');
        productsType.innerHTML = item.category;
        productsList.appendChild(productsType)
      }
    })
    const type = document.querySelectorAll('.products--type');
    type.forEach((item) => {
      item.addEventListener('click', () => {
        products.innerHTML = "";
        if(item.innerHTML != 'All') {
          params.category = item.innerHTML;
          myApi = `https://products-list-two.vercel.app/products?_page=1&_limit=${params.limit}&q=${params.q}&_sort=${params.sort}&_order=${params.order}&category=${params.category}`;
          params.page = 1;
          params.all = 0;
          pageNum.innerHTML = 1;
          prev.classList.add('hidden');
        }
        else {
          myApi = `https://products-list-two.vercel.app/products?_page=1&_limit=18&_sort=${params.sort}&_order=${params.order}`;
          params.page = 1;
          pageNum.innerHTML = 1;
          params.all = 1;
          params.q= '';
          input.value = "";
          next.classList.remove('hidden');
          document.querySelector('#page--num').classList.remove('hidden');
        }
        fetchApi(myApi)
        .then(data => {
          if(data.length < 18) {
            if(item.innerHTML != 'All') {
              next.classList.add('hidden');
              document.querySelector('#page--num').classList.add('hidden');
            }
          }
          data.map((item) => {
            const box = document.createElement('div');
            box.classList.add('products__box');
            box.innerHTML = `
              <div class="box__img">
                <img src="${item.thumbnail}">
                <div class="box__sale">${Math.round(item.discountPercentage)}%</div>
                </div>
                <div class="box__bottom">
                <div class="title">${item.title}</div>
                <div class="status">
                <div class="status__price">${item.price}$</div>
                <div class="status__remain">Còn lại: ${item.stock}</div>
                </div>
                </div>
                `
                products.appendChild(box);
            })
        })
      })
    })
  })
// Search
let find = document.querySelector('button');
find.addEventListener('click', () => {
  params.q = input.value;
  if(input.value != '') {
    params.page = 1;
    if(params.category != "")
      myApi = `https://products-list-two.vercel.app/products?_page=${params.page}&_limit=${params.limit}&title_like=${params.q}&_sort=${params.sort}&_order=${params.order}&category=${params.category}`;
    else myApi = `https://products-list-two.vercel.app/products?_page=${params.page}&_limit=${params.limit}&title_like=${params.q}&_sort=${params.sort}&_order=${params.order}`;
    products.innerHTML = "";
    fetchApi(myApi)
    .then(data => {
      if(data.length < 18) {
        next.classList.add('hidden');
        prev.classList.add('hidden');
        document.querySelector('#page--num').classList.add('hidden');
      }
      data.map((item) => {
        const box = document.createElement('div');
        box.classList.add('products__box');
        box.innerHTML = `
          <div class="box__img">
            <img src="${item.thumbnail}">
            <div class="box__sale">${Math.round(item.discountPercentage)}%</div>
          </div>
          <div class="box__bottom">
            <div class="title">${item.title}</div>
            <div class="status">
              <div class="status__price">${item.price}$</div>
              <div class="status__remain">Còn lại: ${item.stock}</div>
            </div>
          </div>
        `
        products.appendChild(box);
      })
    })
  }
})
// Filter
let select = document.querySelector('select');
select.addEventListener('change', (e) => {
  products.innerHTML = "";
  if(e.target.value == 'default') {
    if(params.category != "" &&  params.all == 0)
      myApi = `https://products-list-two.vercel.app/products?_page=${params.page}&_limit=${params.limit}&q=${params.q}&category=${params.category}`;
    else myApi = `https://products-list-two.vercel.app/products?_page=${params.page}&_limit=${params.limit}&q=${params.q}`;
  }
  else {
    if(e.target.value == 'asc-price') {
      params.sort = 'price';
      params.order = 'asc';
      if(params.category != "" &&  params.all == 0)
        myApi = `https://products-list-two.vercel.app/products?_page=${params.page}&_limit=${params.limit}&q=${params.q}&_sort=${params.sort}&_order=${params.order}&category=${params.category}`;
      else myApi = `https://products-list-two.vercel.app/products?_page=${params.page}&_limit=${params.limit}&q=${params.q}&_sort=${params.sort}&_order=${params.order}`;
    }
    else if(e.target.value =='desc-price') {
      params.sort = 'price';
      params.order = 'desc';
      if(params.category != "" &&  params.all == 0)
        myApi = `https://products-list-two.vercel.app/products?_page=${params.page}&_limit=${params.limit}&q=${params.q}&_sort=${params.sort}&_order=${params.order}&category=${params.category}`;
      else myApi = `https://products-list-two.vercel.app/products?_page=${params.page}&_limit=${params.limit}&q=${params.q}&_sort=${params.sort}&_order=${params.order}`;
    }
    else if(e.target.value =='asc-stock') {
      params.sort = 'stock';
      params.order = 'asc';
      if(params.category != "" &&  params.all == 0)
        myApi = `https://products-list-two.vercel.app/products?_page=${params.page}&_limit=${params.limit}&q=${params.q}&_sort=${params.sort}&_order=${params.order}&category=${params.category}`;
      else myApi = `https://products-list-two.vercel.app/products?_page=${params.page}&_limit=${params.limit}&q=${params.q}&_sort=${params.sort}&_order=${params.order}`;
    }
    else if(e.target.value =='desc-dc') {
      params.sort = 'discountPercentage';
      params.order = 'desc';
      if(params.category != "" &&  params.all == 0)
        myApi = `https://products-list-two.vercel.app/products?_page=${params.page}&_limit=${params.limit}&q=${params.q}&_sort=${params.sort}&_order=${params.order}&category=${params.category}`;
      else myApi = `https://products-list-two.vercel.app/products?_page=${params.page}&_limit=${params.limit}&q=${params.q}&_sort=${params.sort}&_order=${params.order}`;
    }
  }
  fetchApi(myApi)
  .then(data => {
    data.map((item) => {
      const box = document.createElement('div');
      box.classList.add('products__box');
      box.innerHTML = `
        <div class="box__img">
          <img src="${item.thumbnail}">
          <div class="box__sale">${Math.round(item.discountPercentage)}%</div>
        </div>
        <div class="box__bottom">
          <div class="title">${item.title}</div>
          <div class="status">
            <div class="status__price">${item.price}$</div>
            <div class="status__remain">Còn lại: ${item.stock}</div>
          </div>
        </div>
      `
      products.appendChild(box);
    })
  })
})
// Pagination
prev.addEventListener('click', () => {
  if(params.page == 2) {
    params.page--;
    pageNum.innerHTML = params.page;
    if(params.category != "" && params.all == 0)
      myApi = `https://products-list-two.vercel.app/products?_page=${params.page}&_limit=${params.limit}&q=${params.q}&_sort=${params.sort}&_order=${params.order}&category=${params.category}`;
    else myApi = `https://products-list-two.vercel.app/products?_page=${params.page}&_limit=${params.limit}&q=${params.q}&_sort=${params.sort}&_order=${params.order}`;
    products.innerHTML = "";
    fetchApi(myApi)
    .then(data => {
      next.classList.remove('hidden');
      data.map((item) => {
        const box = document.createElement('div');
        box.classList.add('products__box');
        box.innerHTML = `
          <div class="box__img">
            <img src="${item.thumbnail}">
            <div class="box__sale">${Math.round(item.discountPercentage)}%</div>
          </div>
          <div class="box__bottom">
            <div class="title">${item.title}</div>
            <div class="status">
              <div class="status__price">${item.price}$</div>
              <div class="status__remain">Còn lại: ${item.stock}</div>
            </div>
          </div>
        `
        products.appendChild(box);
      })
    })
  }
})

next.addEventListener('click', () => {
  if(params.page == 1) {
    params.page++;
    if(params.category != "" && params.all == 0)
      myApi = `https://products-list-two.vercel.app/products?_page=${params.page}&_limit=${params.limit}&q=${params.q}&_sort=${params.sort}&_order=${params.order}&category=${params.category}`;
    else myApi = `https://products-list-two.vercel.app/products?_page=${params.page}&_limit=${params.limit}&q=${params.q}&_sort=${params.sort}&_order=${params.order}`;
    console.log(myApi);
    fetchApi(myApi)
    .then(data => {
      if(data.length != 0) {
        products.innerHTML = ""
        pageNum.innerHTML = params.page;
        next.classList.add('hidden');
        prev.classList.remove('hidden');
        data.map((item) => {
          const box = document.createElement('div');
          box.classList.add('products__box');
          box.innerHTML = `
            <div class="box__img">
              <img src="${item.thumbnail}">
              <div class="box__sale">${Math.round(item.discountPercentage)}%</div>
            </div>
            <div class="box__bottom">
              <div class="title">${item.title}</div>
              <div class="status">
                <div class="status__price">${item.price}$</div>
                <div class="status__remain">Còn lại: ${item.stock}</div>
              </div>
            </div>
          `
          products.appendChild(box);
        })
      }
      else {
        params.page--;
      }
    })
  }
})
fetchApi(myApi)
  .then(data => {
    next.classList.remove('hidden');
    data.map((item) => {
      const box = document.createElement('div');
      box.classList.add('products__box');
      box.innerHTML = `
        <div class="box__img">
          <img src="${item.thumbnail}">
          <div class="box__sale">${Math.round(item.discountPercentage)}%</div>
        </div>
        <div class="box__bottom">
          <div class="title">${item.title}</div>
          <div class="status">
            <div class="status__price">${item.price}$</div>
            <div class="status__remain">Còn lại: ${item.stock}</div>
          </div>
        </div>
      `
      products.appendChild(box);
    })
  })

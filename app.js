import { fetchApi } from "./fetchApi.js";
const productsList = document.querySelector('#products--list');
let currentPage = 1;
let myCurrentCategory = '';
let products = document.querySelector('#products');
let myApi = `http://localhost:3000/products?_page=${currentPage}&_limit=18`;
let prev = document.querySelector('#btn__pre');
let next = document.querySelector('#btn__next');
const myArr = [];
let select = document.querySelector('select');
select.addEventListener('change', (e) => {
  products.innerHTML = "";
  if(e.target.value == 'default') myApi = `http://localhost:3000/products?_page=1&_limit=18`
  else {
    if(e.target.value == 'asc-price')
      myApi = `http://localhost:3000/products?_page=${currentPage}&_limit=18&_sort=price&_order=asc`
    else if(e.target.value =='desc-price') myApi = `http://localhost:3000/products?_page=${currentPage}&_limit=18&_sort=price&_order=desc`
    else if(e.target.value =='asc-stock') myApi = `http://localhost:3000/products?_page=${currentPage}&_limit=18&_sort=stock&_order=asc`
    else if(e.target.value =='desc-dc') myApi = `http://localhost:3000/products?_page=${currentPage}&_limit=18&_sort=discountPercentage&_order=desc`
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
let input = document.querySelector('#search');
let find = document.querySelector('button');
find.addEventListener('click', () => {
  console.log(input.value);
  myApi = `http://localhost:3000/products?_page=1&_limit=18&q=${input.value}`;
  products.innerHTML = "";
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
fetchApi("http://localhost:3000/products")
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
        myApi = `http://localhost:3000/products?category=${item.innerHTML}`;
        myCurrentCategory = item.innerHTML;
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
    })
  })
prev.addEventListener('click', () => {
  if(currentPage == 2) {
  currentPage--;
  myApi = `http://localhost:3000/products?_page=${currentPage}&_limit=18`;
  if(myCurrentCategory != '') myApi += `&${myCurrentCategory}`;
  products.innerHTML = "";
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
  }
})

next.addEventListener('click', () => {
  if(currentPage == 1) {
  currentPage++;
  myApi = `http://localhost:3000/products?_page=${currentPage}&_limit=18`;
  if(myCurrentCategory != '') myApi += `&${myCurrentCategory}`;
  products.innerHTML = "";
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
}
})
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
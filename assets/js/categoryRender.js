import { fetchApi } from "./fetchApi.js";
import { productsList } from "./variables.js";
import { params, prev, next, pageNum, input } from "./variables.js";
import { productRender } from "./productRender.js";
import { apiHandle } from "./apiHandle.js";
let myArr = [];
export let categoryRender = () => {
    fetchApi("https://products-list-two.vercel.app/products")
    .then(data => {
    data.map((item) => {
        let check = 1;
        myArr.forEach((stuff) => {
            if(stuff == item.category) check = 0;
        })
        if(check === 1){ 
            myArr.push(item.category);
            let productsType = document.createElement('div');
            productsType.classList.add('products--type');
            productsType.innerHTML = item.category;
            productsList.appendChild(productsType);
        }
    })
    let type = document.querySelectorAll('.products--type');
    type.forEach((item) => {
        item.addEventListener('click', () => {
            if(item.innerHTML != 'All') {
                params.category = item.innerHTML;
                params.page = 1;
                params.all = 0;
                pageNum.innerHTML = 1;
                prev.style.display = "none";
            }
            else {
                params.page = 1;
                pageNum.innerHTML = 1;
                params.all = 1;
                params.q= '';
                params.category = "";
                input.value = "";
                params.sort = '';
                params.order = '';
                next.style.display = "block";
            }
            apiHandle();
            })
        })
    })
};
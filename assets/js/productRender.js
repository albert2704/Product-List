import { next, params, prev} from "./variables.js";
import { fetchApi } from "./fetchApi.js";
export let productRender = (api) => {
    fetchApi(api)
        .then(data => {
            let productsArr = data.map((item) => {
                return `
                <div class="products__box">
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
                </div>
                `;
            });
            if(data.length < 18) next.style.display = "none";
            if(params.page == 1) prev.style.display = "none";
            document.querySelector('#products').innerHTML = productsArr.join("");
        })
}
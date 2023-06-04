import { productRender } from "./productRender.js";
import { params } from "./variables.js";

export const apiHandle = () => {
    let category = "";
    if(params.category != "") {
        category = `&category=${params.category}`
    }
    let api = `https://products-list-two.vercel.app/products?_page=${params.page}&_limit=18&_sort=${params.sort}&_order=${params.order}&q=${params.q}${category}`;
    productRender(api);
};
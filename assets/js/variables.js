export let params = {
    sort: "",
    order: "",
    page: 1,
    limit: "18",
    q: "",
    category: "",
    all: 0,
};
export let productsList = document.querySelector('#products--list'); 
export let products = document.querySelector('#products');
export let find = document.querySelector('button');
export let prev = document.querySelector('#btn__pre');
export let next = document.querySelector('#btn__next');
export let input = document.querySelector('#search');
export let pageNum = document.querySelector('#page--num');
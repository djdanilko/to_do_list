const form = document.querySelector(".form");
const input = document.querySelector(".input");
const btn = document.querySelector(".btn");
const list = document.querySelector(".list")

const array = [];

form.addEventListener("submit", evt => {
    evt.preventDefault(); 
array.push(input.value)
console.log(array)
input.value = "";
});


import { renderList } from "./render.js";
import { array, filter }
from "./state.js";


const form = document.querySelector(".form");
const input = document.querySelector(".input");
const btn = document.querySelector(".btn");
const list = document.querySelector(".list")
const taskCount = document.querySelector(".tasks-counter");



const saved = localStorage.getItem("tasks");


if (saved) {
  array.push(...JSON.parse(saved));
}
renderList();

const filterButtons = document.querySelectorAll("[data-filter]");

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filter = btn.dataset.filter;
        renderList();
    });
});



form.addEventListener("submit", evt => {
    evt.preventDefault(); 

    if (input.value.trim() === "") return;
array.push({
  id: Date.now(),
  text: input.value.trim(),
  completed: false,
  deadline: null,
  subtasks: [
  ]
});

saveToLocalStorage();
renderList();
console.log(array)
input.value = "";
});





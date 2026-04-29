const form = document.querySelector(".form");
const input = document.querySelector(".input");
const btn = document.querySelector(".btn");
const list = document.querySelector(".list")

const array = [];

form.addEventListener("submit", evt => {
    evt.preventDefault(); 
array.push({
  text: input.value,
  completed: false
});
renderList();
console.log(array)
input.value = "";
});

function renderList() {
    list.innerHTML = "";

    array.forEach((item, index) => {
        const li = document.createElement("li");
        list.appendChild(li)

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        li.appendChild(checkbox)

        const span = document.createElement("span");
        span.textContent = item.text;
        li.appendChild(span)

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        li.appendChild(deleteBtn)

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        li.appendChild(editBtn)
    })
}

const form = document.querySelector(".form");
const input = document.querySelector(".input");
const btn = document.querySelector(".btn");
const list = document.querySelector(".list")

const array = [];

const saved = localStorage.getItem("tasks");

let filter = "all";

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
  text: input.value,
  completed: false
});

saveToLocalStorage();
renderList();
console.log(array)
input.value = "";
});

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(array));
}

function renderList() {
    list.innerHTML = "";

let filteredArray = array;

if (filter === "active") {
  filteredArray = array.filter(item => !item.completed);
}

if (filter === "completed") {
  filteredArray = array.filter(item => item.completed);
}

    filteredArray.forEach((item, index) => {
        const li = document.createElement("li");
        list.appendChild(li)

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        li.appendChild(checkbox)

        checkbox.checked = item.completed;
        checkbox.addEventListener("change", () => {
            item.completed = checkbox.checked;
            saveToLocalStorage();
            renderList();
        })
        li.classList.toggle("completed", item.completed);

        const span = document.createElement("span");
        span.textContent = item.text;
        li.appendChild(span)


        const editBtn = document.createElement("button");
        editBtn.classList.add("edit__btn")
        editBtn.textContent = "Edit";
        li.appendChild(editBtn)

        editBtn.addEventListener("click", () => {
            const newText = prompt("Edit:", item.text);

            if (newText !== null && newText.trim() !=="") {
                item.text = newText.trim();
                saveToLocalStorage();
                renderList();
            }
        })

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete__btn")
        deleteBtn.textContent = "Delete";
        li.appendChild(deleteBtn)

        deleteBtn.addEventListener("click", () => {
            array.splice(index, 1);
            saveToLocalStorage();
            renderList();
        })
    })
}

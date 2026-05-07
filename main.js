const form = document.querySelector(".form");
const input = document.querySelector(".input");
const btn = document.querySelector(".btn");
const list = document.querySelector(".list")

let array = [];

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
  id: Date.now(),
  text: input.value.trim(),
  completed: false,
  deleted: false
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

    filteredArray.forEach(item => {
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

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = item.text;
    editInput.classList.add("edit-input");
    li.replaceChild(editInput, span);

    editInput.focus();

    function saveEdit() {
        const newText = editInput.value.trim();

        if (newText !== "") {
            item.text = newText;

            saveToLocalStorage();
            renderList();
        }
    }

    editInput.addEventListener("keydown", e => {

        if (e.key === "Enter") {
            saveEdit();
        }

        if (e.key === "Escape") {
            renderList();
        }
    });

    editInput.addEventListener("blur", saveEdit);
});

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete__btn")
        deleteBtn.textContent = "Delete";
        li.appendChild(deleteBtn)

        deleteBtn.addEventListener("click", () => {
            array = array.filter(task => task.id !== item.id);

            saveToLocalStorage();
            renderList();
        })

    })

        if (filter === "completed" && filteredArray.length > 0) {

    const clearBtn = document.createElement("button");

    clearBtn.textContent = "Delete all completed";

    clearBtn.classList.add("clear-completed-btn");

    list.appendChild(clearBtn);

    clearBtn.addEventListener("click", () => {

        array = array.filter(item => !item.completed);

        saveToLocalStorage();
        renderList();
    });
}
}

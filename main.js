const form = document.querySelector(".form");
const input = document.querySelector(".input");
const btn = document.querySelector(".btn");
const list = document.querySelector(".list")
const taskCount = document.querySelector(".tasks-counter");

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
  deadline: null,
  subtasks: [
  ]
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
            item.subtasks.forEach(subtask => {
        subtask.completed = checkbox.checked;
    });
            saveToLocalStorage();
            renderList();
        })
        li.classList.toggle("completed", item.completed);

        const span = document.createElement("span");
        span.textContent = item.text;
        li.appendChild(span)

        if (item.deadline) {

    const deadlineWrapper =
        document.createElement("div");

    deadlineWrapper.classList.add(
        "deadline-wrapper"
    );

    const deadlineDateText =
        document.createElement("p");

    deadlineDateText.textContent =
        `📅 ${item.deadline}`;

    const countdownText =
        document.createElement("p");

    const now = new Date();

    const deadlineDate =
        new Date(item.deadline);

    const timeLeft =
        deadlineDate - now;

    if (timeLeft <= 0) {

        countdownText.textContent =
            "❌ Deadline expired";

    } else {

        const days =
            Math.floor(
                timeLeft / 1000 / 60 / 60 / 24
            );

        const hours =
            Math.floor(
                timeLeft / 1000 / 60 / 60
            ) % 24;

        const minutes =
            Math.floor(
                timeLeft / 1000 / 60
            ) % 60;

        countdownText.textContent =
            `⏰ ${days}d ${hours}h ${minutes}m left`;
    }

    deadlineWrapper.appendChild(
        deadlineDateText
    );

    deadlineWrapper.appendChild(
        countdownText
    );

    li.appendChild(deadlineWrapper);
}

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

const deadlineBtn = document.createElement("button");
deadlineBtn.classList.add("deadline__btn");
deadlineBtn.textContent = "Deadline";
li.appendChild(deadlineBtn);

deadlineBtn.addEventListener("click", () => {
      const deadlineInput =
    document.createElement("input");

    deadlineInput.type = "text";

li.appendChild(deadlineInput);

    flatpickr(deadlineInput, {

        enableTime: true,

        dateFormat: "Y-m-d H:i",
        minDate: new Date(),

        onChange: function(selectedDates, dateStr) {

            item.deadline = dateStr;

            saveToLocalStorage();

            renderList();
        }
    });
})

const subtaskBtn =
    document.createElement("button");

subtaskBtn.textContent =
    "+ subtask";

li.appendChild(subtaskBtn);

subtaskBtn.addEventListener("click", () => {

    const subtaskInput =
        document.createElement("input");

    subtaskInput.type = "text";

    subtaskInput.placeholder =
        "New subtask...";

    li.appendChild(subtaskInput);

    subtaskInput.focus();

    let isSaved = false;

    function saveSubtask() {

          if (isSaved) return;

    isSaved = true;

        const newSubtask =
            subtaskInput.value.trim();

        if (newSubtask !== "") {

            item.subtasks.push({

                id: Date.now(),

                text: newSubtask,

                completed: false
            });

            saveToLocalStorage();

            renderList();
        }
    }

    subtaskInput.addEventListener(
        "keydown",
        e => {

            if (e.key === "Enter") {
                saveSubtask();
            }

            if (e.key === "Escape") {
                renderList();
            }
        }
    );

    subtaskInput.addEventListener(
        "blur",
        saveSubtask
    );
});

if (item.subtasks && item.subtasks.length > 0) {

    const subtaskList =
        document.createElement("ul");

    item.subtasks.forEach(subtask => {

        const subtaskLi =
            document.createElement("li");

        const subtaskCheckbox =
            document.createElement("input");

        subtaskCheckbox.type =
            "checkbox";

        subtaskCheckbox.checked =
            subtask.completed;

subtaskLi.classList.toggle(
    "completed",
    subtask.completed
);

        subtaskCheckbox.addEventListener(
            "change",
            () => {

                subtask.completed =
                    subtaskCheckbox.checked;
                    item.completed =
    item.subtasks.every(
        subtask => subtask.completed
    );
                saveToLocalStorage();
                renderList();
            }
        );

        const subtaskSpan =
            document.createElement("span");

        subtaskSpan.textContent =
            subtask.text;

        subtaskLi.appendChild(
            subtaskCheckbox
        );

        subtaskLi.appendChild(
            subtaskSpan
        );
const editSubtaskBtn =
    document.createElement("button");

editSubtaskBtn.textContent =
    "Edit subtask";

subtaskLi.appendChild(
    editSubtaskBtn
);
editSubtaskBtn.addEventListener(
    "click",
    () => {

        const editInput =
            document.createElement("input");

        editInput.type = "text";

        editInput.value =
            subtask.text;

        subtaskLi.replaceChild(
            editInput,
            subtaskSpan
        );

        editInput.focus();

        function saveSubtaskEdit() {

            const newText =
                editInput.value.trim();

            if (newText !== "") {

                subtask.text = newText;

                saveToLocalStorage();

                renderList();
            }
        }

        editInput.addEventListener(
            "keydown",
            e => {

                if (e.key === "Enter") {
                    saveSubtaskEdit();
                }

                if (e.key === "Escape") {
                    renderList();
                }
            }
        );

        editInput.addEventListener(
            "blur",
            saveSubtaskEdit
        );
    }
);
const deleteSubtaskBtn =
    document.createElement("button");

deleteSubtaskBtn.textContent =
    "Delete subtask";

subtaskLi.appendChild(
    deleteSubtaskBtn
);
deleteSubtaskBtn.addEventListener(
    "click",
    () => {

        item.subtasks =
            item.subtasks.filter(
                task =>
                    task.id !== subtask.id
            );

        saveToLocalStorage();

        renderList();
    }
);
        subtaskList.appendChild(
            subtaskLi
        );
    });

    li.appendChild(subtaskList);
}

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

const activeTasks = array.filter(item => !item.completed);

const taskText = activeTasks.length === 1 ? "task" : "tasks";

taskCount.textContent = `${activeTasks.length} ${taskText} left`;

}

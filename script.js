
// Dodanie nowego zadania
function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();
    if (taskText === "") return;

    addTaskToList(taskText, false);
    input.value = "";
    saveList();
}

// Dodanie nowego zakupu
function addShoppingItem() {
    let input = document.getElementById("shoppingInput");
    let itemText = input.value.trim();
    if (itemText === "") return;

    addShoppingItemToList(itemText, false);
    input.value = "";
    saveList();
}

// Dodanie zadania z opcją stanu checkboxa
function addTaskToList(text, checked) {
    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = checked;
    checkbox.onclick = function() {
        toggleTaskCompletion(checkbox);
        saveList();
    };

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "&#10006;";
    deleteButton.onclick = function() {
        removeItem(li);
        saveList();
    };

    let span = document.createElement("span");
    span.textContent = text;

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);
    document.getElementById("taskList").appendChild(li);

    if (checked) {
        li.style.textDecoration = "line-through";
    }
}

// Dodanie zakupu z opcją stanu checkboxa
function addShoppingItemToList(text, checked) {
    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = checked;
    checkbox.onclick = function() {
        toggleTaskCompletion(checkbox);
        saveList();
    };

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "&#10006;";
    deleteButton.onclick = function() {
        removeItem(li);
        saveList();
    };

    let span = document.createElement("span");
    span.textContent = text;

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);
    document.getElementById("shoppingList").appendChild(li);

    if (checked) {
        li.style.textDecoration = "line-through";
    }
}

// Zmiana stylu (przekreślenie)
function toggleTaskCompletion(checkbox) {
    let li = checkbox.closest("li");
    li.style.textDecoration = checkbox.checked ? "line-through" : "none";
}

// Usuwanie elementu
function removeItem(item) {
    item.remove();
}

// Dodawanie propozycji zadania
function addPredefinedTask(text) {
    addTaskToList(text, false);
    saveList();
}

// Dodawanie propozycji zakupu
function addPredefinedItem(text) {
    addShoppingItemToList(text, false);
    saveList();
}

// Zapisywanie danych do localStorage
function saveList() {
    const tasks = [];
    const shoppingItems = [];

    document.querySelectorAll("#taskList li").forEach(item => {
        tasks.push({
            text: item.querySelector("span").textContent,
            checked: item.querySelector("input[type='checkbox']").checked
        });
    });

    document.querySelectorAll("#shoppingList li").forEach(item => {
        shoppingItems.push({
            text: item.querySelector("span").textContent,
            checked: item.querySelector("input[type='checkbox']").checked
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("shoppingItems", JSON.stringify(shoppingItems));
}

// Wczytywanie danych z localStorage
function loadList() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    const savedShoppingItems = JSON.parse(localStorage.getItem("shoppingItems"));

    if (savedTasks) {
        savedTasks.forEach(task => {
            addTaskToList(task.text, task.checked);
        });
    }

    if (savedShoppingItems) {
        savedShoppingItems.forEach(item => {
            addShoppingItemToList(item.text, item.checked);
        });
    }
}

// Tryb ciemny
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

// Załaduj dane po załadowaniu strony
window.onload = function() {
    loadList();
};


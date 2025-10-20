(() => {
  const LOCAL_STORAGE_KEY = "shoppingListApp";
  // state
  /**
 @type {string[]}
 */
  let items = [];

  let filterTerm = "";
  let lastEditedItem = null;
  let isEditMode = false;

  // constant dom references
  const _form = document.querySelector("#input-form");
  const _list = document.querySelector(".shopping-list");
  const _input = document.querySelector("#item-input");
  const _priority = document.querySelector("#priority");
  const _clearBtn = document.querySelector(".btn-clear");
  const _filter = document.querySelector("#filter-input");

  // Rendering
  const render = () => {
    const term = filterTerm.trim().toLowerCase();

    const visibleItems = term
      ? items.filter((it) => it.content.toLowerCase().includes(term))
      : items;

    _list.innerHTML = "";
    visibleItems.forEach((item) => _list.appendChild(createItem(item.content)));

    if (!visibleItems.length && term.length > 0) {
      const emptyMsg = document.createElement("li");
      emptyMsg.className = "item empty-msg";
      emptyMsg.textContent = `No items match “${filterTerm}”.`;
      _list.appendChild(emptyMsg);
    }
    checkUI();
  };

  const restoreEditItemOnBlur = () => {
    if (isEditMode && lastEditedItem.length > 0 && !items.includes(lastEditedItem))
      addOrUpdateItem();
  };

  // Filtering
  const onFilterInput = () => {
    filterTerm = _filter.value;
    render();
  };

  // Sorting
  const sortItems = () => {
    items
      .sort((a, b) => a.content.localeCompare(b.content))
      .sort((a, b) => b.priority - a.priority);
  };

  // Methods

  const createItem = (content) => {
    const item = document.createElement("li");
    item.className = "item";
    item.textContent = content;

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete";

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fa-solid fa-xmark";
    deleteBtn.appendChild(deleteIcon);

    item.appendChild(deleteBtn);
    return item;
  };

  const addOrUpdateItem = (e) => {
    e.preventDefault();

    const raw = _input.value.trim();
    const priority = Number(_priority.value);

    if (raw === "") {
      alert("Please fill in the shopping list item field.");
      return;
    }

    if (parseInt(priority) === 0) {
      alert("Please select a priority.");
      return;
    }

    if (items.some((item) => item.content === raw)) return;

    const itemObj = {
      content: raw,
      priority,
      dateUpdated: Date.now(),
    };

    items.push(itemObj);

    sortItems();
    saveToLocalStorage();
    render();

    _input.value = "";
    _priority.value = 0;
    _input.focus();
    isEditMode = false;
  };

  const selectEditItem = (item) => {
    isEditMode = true;
    const savedItem = items.filter((x) => x.content === item.textContent)[0];
    _input.value = savedItem.content;
    _priority.value = savedItem.priority;
    lastEditedItem = { content: savedItem.textContent, priority: savedItem.priority };
    deleteItem(item);
    _input.focus();
  };

  const deleteItem = (item) => {
    items = items.filter((x) => x.content !== item.textContent);
    sortItems();
    saveToLocalStorage();
    render();
  };

  const clearItems = () => {
    if (items.length <= 0) return;

    if (!confirm("Do you want to clear all shopping list items?")) return;

    items.length = 0;
    saveToLocalStorage();
    render();
  };

  // Debounce

  const debounce = (callback, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => callback.apply(this, args), wait);
    };
  };

  // Persistence
  const saveToLocalStorage = (optItems = null) => {
    const parsedItems = JSON.stringify(optItems || items);
    localStorage.setItem(LOCAL_STORAGE_KEY, parsedItems);
  };

  const loadFromLocalStorage = () => {
    const jsonString = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!jsonString) return [];
    const parsed = JSON.parse(jsonString);
    items.length = 0;
    parsed.forEach((x) => items.push(x));
    sortItems();
    render();
  };

  // ui state

  const checkUI = () => {
    if (items.length <= 0) {
      _filter.style.display = "none";
      _clearBtn.style.display = "none";
    } else {
      _filter.style.display = "block";
      _clearBtn.style.display = "block";
    }
  };

  // Attach handlers

  _form.addEventListener("submit", addOrUpdateItem);

  _form.addEventListener("onblur", restoreEditItemOnBlur);

  _list.addEventListener("click", (e) => {
    const item = e.target.closest("li");
    if (e.target.closest(".delete")) {
      deleteItem(item);
    } else {
      selectEditItem(item);
    }
  });

  _clearBtn.addEventListener("click", clearItems);

  _filter.addEventListener("keydown", debounce(onFilterInput, 350));

  document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();
    checkUI();
  });

  render();
})();

let selectedElement = null;

document.querySelectorAll(".element").forEach(el => {
  el.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("type", e.target.dataset.type);
  });
});

function allowDrop(e) {
  e.preventDefault();
}

function dropElement(e) {
  e.preventDefault();
  const type = e.dataTransfer.getData("type");
  let newEl;

  switch (type) {
    case "text":
      newEl = document.createElement("p");
      newEl.textContent = "Edit me!";
      break;
    case "image":
      newEl = document.createElement("img");
      newEl.src = "https://via.placeholder.com/150";
      newEl.style.maxWidth = "100%";
      break;
    case "button":
      newEl = document.createElement("button");
      newEl.textContent = "Click me";
      break;
  }

  newEl.setAttribute("contenteditable", "false");
  newEl.style.margin = "10px 0";
  newEl.onclick = () => loadEditor(newEl);
  e.target.appendChild(newEl);
  document.querySelector(".hint")?.remove();
}

function loadEditor(el) {
  selectedElement = el;
  const formFields = document.getElementById("formFields");
  formFields.innerHTML = "";

  if (el.tagName === "P" || el.tagName === "BUTTON") {
    formFields.innerHTML += `
      <label>Text Content</label>
      <input type="text" name="text" value="${el.textContent}">
      <label>Font Size (px)</label>
      <input type="number" name="fontSize" value="${parseInt(window.getComputedStyle(el).fontSize)}">
      <label>Text Color</label>
      <input type="color" name="color" value="#000000">
    `;
  } else if (el.tagName === "IMG") {
    formFields.innerHTML += `
      <label>Image URL</label>
      <input type="text" name="src" value="${el.src}">
    `;
  }
}

function updateElement(e) {
  e.preventDefault();
  const form = new FormData(e.target);

  if (selectedElement.tagName === "P" || selectedElement.tagName === "BUTTON") {
    selectedElement.textContent = form.get("text");
    selectedElement.style.fontSize = form.get("fontSize") + "px";
    selectedElement.style.color = form.get("color");
  } else if (selectedElement.tagName === "IMG") {
    selectedElement.src = form.get("src");
  }

  alert("Changes applied!");
}
function loadEditor(el) {
    selectedElement = el;
    const formFields = document.getElementById("formFields");
    formFields.innerHTML = "";
  
    if (el.tagName === "P" || el.tagName === "BUTTON") {
      formFields.innerHTML += `
        <label>Text Content</label>
        <input type="text" name="text" value="${el.textContent}">
        <label>Font Size (px)</label>
        <input type="number" name="fontSize" value="${parseInt(window.getComputedStyle(el).fontSize)}">
        <label>Text Color</label>
        <input type="color" name="color" value="#000000">
      `;
    } else if (el.tagName === "IMG") {
      formFields.innerHTML += `
        <label>Image URL</label>
        <input type="text" name="src" value="${el.src}">
      `;
    }
    const deleteBtn = document.createElement("button");
    deleteBtn.style.display = "block";
    deleteBtn.style.margin = "10px auto";

    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete Element";
    deleteBtn.style.backgroundColor = "crimson";
    deleteBtn.style.color = "white";
    deleteBtn.style.padding = "10px";
    deleteBtn.style.border = "none";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.style.borderRadius = "4px";
    deleteBtn.onclick = deleteElement;
  
    formFields.appendChild(deleteBtn);
  }
  function deleteElement() {
    if (selectedElement) {
      selectedElement.remove();
      selectedElement = null;
      document.getElementById("formFields").innerHTML = '';
      alert("Element deleted.");
    }
  }
  deleteBtn.style.display = "block";
  deleteBtn.style.margin = "10px auto";
  


  
  
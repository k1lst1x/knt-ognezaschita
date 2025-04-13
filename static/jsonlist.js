document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.querySelector("#id_benefits");
    if (!textarea) return;

    textarea.style.display = "none";

    const wrapper = document.createElement("div");
    wrapper.className = "json-list-wrapper";

    let list = [];
    try {
        list = JSON.parse(textarea.value);
    } catch (_) {
        list = [];
    }

    const ul = document.createElement("ul");
    ul.className = "list-group mb-2";
    ul.setAttribute("id", "sortableBenefits");

    list.forEach(item => addItemToList(item));

    const input = document.createElement("input");
    input.type = "text";
    input.className = "form-control mb-2";
    input.placeholder = "Add benefit and press Enter";

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && input.value.trim() !== "") {
            addItemToList(input.value.trim());
            input.value = "";
        }
    });

    function addItemToList(text) {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.setAttribute("draggable", "true");
        li.style.cursor = "move";

        const span = document.createElement("span");
        span.innerText = text;

        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className = "btn-close";
        removeBtn.onclick = () => {
            li.remove();
            syncToTextarea();
        };

        li.appendChild(span);
        li.appendChild(removeBtn);
        ul.appendChild(li);
        syncToTextarea();
    }

    function syncToTextarea() {
        const items = Array.from(ul.children).map(li => li.querySelector("span").innerText.trim());
        textarea.value = JSON.stringify(items, null, 2);
    }

    // Drag & drop
    let dragSrcEl = null;

    ul.addEventListener("dragstart", function (e) {
        dragSrcEl = e.target;
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target.innerHTML);
        e.target.classList.add("opacity-50");
    });

    ul.addEventListener("dragover", function (e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        const target = e.target.closest("li");
        if (target && target !== dragSrcEl) {
            const rect = target.getBoundingClientRect();
            const next = (e.clientY - rect.top) / (rect.bottom - rect.top) > 0.5;
            ul.insertBefore(dragSrcEl, next && target.nextSibling || target);
        }
    });

    ul.addEventListener("dragend", function () {
        dragSrcEl.classList.remove("opacity-50");
        syncToTextarea();
    });

    wrapper.appendChild(ul);
    wrapper.appendChild(input);
    textarea.parentNode.insertBefore(wrapper, textarea.nextSibling);
});

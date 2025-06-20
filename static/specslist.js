document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.querySelector("#id_specs");
    if (!textarea) return;

    textarea.style.display = "none";

    const wrapper = document.createElement("div");
    wrapper.className = "specs-list-wrapper";

    let list = [];
    try {
        list = JSON.parse(textarea.value);
    } catch (_) {
        list = [];
    }

    const table = document.createElement("table");
    table.className = "table table-bordered mb-2";
    table.style.background = "#fff";
    table.innerHTML = `
        <thead>
            <tr>
                <th>Параметр</th>
                <th>Значение</th>
                <th></th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    const tbody = table.querySelector("tbody");

    list.forEach(item => addItemToTable(item));

    const paramInput = document.createElement("input");
    paramInput.type = "text";
    paramInput.className = "form-control mb-2";
    paramInput.placeholder = "Параметр";

    const valueInput = document.createElement("input");
    valueInput.type = "text";
    valueInput.className = "form-control mb-2";
    valueInput.placeholder = "Значение";

    const addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.className = "btn btn-success mb-2 ms-2";
    addBtn.textContent = "Добавить";
    addBtn.onclick = () => {
        if (paramInput.value.trim() && valueInput.value.trim()) {
            addItemToTable({
                "Параметр": paramInput.value.trim(),
                "Значение": valueInput.value.trim()
            });
            paramInput.value = "";
            valueInput.value = "";
        }
    };

    function addItemToTable(item) {
        const tr = document.createElement("tr");
        const tdParam = document.createElement("td");
        tdParam.textContent = item["Параметр"] || "";
        const tdValue = document.createElement("td");
        tdValue.textContent = item["Значение"] || "";

        const tdRemove = document.createElement("td");
        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className = "btn btn-outline-danger btn-sm";
        removeBtn.innerText = "Удалить";
        removeBtn.onclick = () => {
            tr.remove();
            syncToTextarea();
        };
        tdRemove.appendChild(removeBtn);

        tr.appendChild(tdParam);
        tr.appendChild(tdValue);
        tr.appendChild(tdRemove);
        tbody.appendChild(tr);

        syncToTextarea();
    }

    function syncToTextarea() {
        const items = Array.from(tbody.children).map(tr => ({
            "Параметр": tr.children[0].textContent.trim(),
            "Значение": tr.children[1].textContent.trim(),
        }));
        textarea.value = JSON.stringify(items, null, 2);
    }

    wrapper.appendChild(table);

    const row = document.createElement("div");
    row.className = "d-flex mb-2 gap-2";
    row.appendChild(paramInput);
    row.appendChild(valueInput);
    row.appendChild(addBtn);

    wrapper.appendChild(row);
    textarea.parentNode.insertBefore(wrapper, textarea.nextSibling);
});

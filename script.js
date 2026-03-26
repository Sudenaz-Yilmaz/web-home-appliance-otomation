class SmartDevice {
    constructor({ n, s }) {
        this.name = n;
        this.stock = s;
        this.type = "Ev Eşyası";
        this.status = "Çalışıyor";
    }

    renderToTable() {
        const body = document.getElementById("tableContent");
        const row = document.createElement("tr");
        const { name, type, stock, status } = this;

        row.innerHTML = `
            <td>${name}</td>
            <td>${type}</td>
            <td>${stock}</td>
            <td style="color: green; font-weight: bold;">${status}</td>
        `;
        body.appendChild(row);
    }
}

document.getElementById("app-title").addEventListener("click", () => {
    const box = document.getElementById("input-container");
    box.style.display = (box.style.display === "none") ? "block" : "none";
});

document.getElementById("addBtn").addEventListener("click", () => {
    const n = document.getElementById("devName").value;
    const s = document.getElementById("devStock").value;

    if (n && s) {
        const item = new SmartDevice({ n, s });
        
        document.getElementById("table-wrapper").style.display = "block";
        
        item.renderToTable();

        document.getElementById("devName").value = "";
        document.getElementById("devStock").value = "";
    } else {
        alert("Lütfen tüm alanları doldurun!");
    }
});
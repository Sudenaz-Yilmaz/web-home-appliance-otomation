class SmartDevice {
    constructor({ n, c, s }) {
        this.name = n;
        this.category = c;
        this.stock = s;
    }

    async connect() {
        return new Promise(resolve => setTimeout(resolve, 500));
    }

    render() {
        const { name, category, stock } = this;
        return `
            <li style="background: white; border-left: 10px solid #4CAF50; margin: 10px 0; padding: 15px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); display: flex; justify-content: space-between; align-items: center; list-style: none; width: 350px; font-family: sans-serif;">
                <div>
                    <strong style="font-size: 1.1rem; color: #333;">${name}</strong><br>
                    <small style="color: #666;">Oda: ${category}</small>
                </div>
                <div style="background: #e8f5e9; color: #2e7d32; padding: 5px 15px; border-radius: 20px; font-weight: bold;">Stok: ${stock}</div>
            </li>`;
    }
}

let devices = [];

async function yeniCihazEkle(hazirVeri = null) {
    const input = document.getElementById("esyaInput");
    const list = document.getElementById("sonucListesi");

    let deviceData;
    if (hazirVeri) {
        deviceData = hazirVeri;
    } else {
        if (!input.value.trim()) return;
        deviceData = { n: input.value, c: "Genel", s: 10 };
    }

    const device = new SmartDevice(deviceData);
    await device.connect();
    devices.push(device);
    
    list.innerHTML = devices.map(d => d.render()).join("");
    if (!hazirVeri) input.value = "";
}

async function loadData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        await response.json();
        
        document.getElementById("anaBaslik").innerText = "🏠 Smart Home Dashboard";

        const defaults = [
            { n: "Buzdolabı", c: "Mutfak", s: 5 },
            { n: "Ütü", c: "Yatak Odası", s: 2 }
        ];

        for (const item of defaults) {
            await yeniCihazEkle(item);
        }
    } catch (err) {
        console.error(err);
    }
}

window.esyaEkle = () => yeniCihazEkle();
window.onload = loadData;

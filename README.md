Here’s a complete and clean **README.md** for your project, including the live demo link and a description of all the main features:

---

## 🧾 Data Table Component Admin Panel

A responsive admin panel built with **React**, **Axios**, and **JSON Server** to manage product data including CRUD operations, image uploads, multi-select fields, and interactive charts.

> 🔗 **Live Demo:** [https://data-table-component-admin-panel.vercel.app/](https://data-table-component-admin-panel.vercel.app/)

---

## 📦 Features

* 📋 **Create, Read, Update, Delete (CRUD)** for products
* 🖼️ **Image Upload** with preview
* 📦 **Warehouse selection** using checkboxes
* 📊 **Dynamic chart updates** every few seconds
* 🔍 **DataTable with sorting and search**
* 📢 **Toast notifications** using `react-toastify`
* 🛠️ Modular and clean component structure
* 🚀 **JSON Server** as a lightweight backend for mocking data

---

## 🧰 Tech Stack

* **React** (with `useState`, `useEffect`, `useRef`, `react-router-dom`)
* **Axios** for API requests
* **JSON Server** for fake REST API
* **Bootstrap** and **custom CSS** for UI
* **React Toastify** for user notifications
* **Charting logic** for simulated real-time data

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/data-table-admin-panel.git
cd data-table-admin-panel
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start JSON Server (mock backend)

```bash
npx json-server --watch db.json --port 3000
```

### 4. Start React App

```bash
npm start
```

App runs on `http://localhost:5173` (or another port, depending on Vite/CRA).

---

## 📁 Project Structure

```
├── src/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Form.jsx
│   │   └── Table.jsx
│   ├── components/
│   │   └── Aside.jsx
│   ├── assets/
│   │   └── css/...
│   └── App.jsx
├── db.json
├── package.json
└── README.md
```

---

## 📌 API Endpoints (via JSON Server)

* `GET    /product` → Fetch all products
* `POST   /product` → Add new product
* `PUT    /product/:id` → Update product
* `DELETE /product/:id` → Delete product

Make sure your API base URL is set to:

```js
const URL = "http://localhost:3000/product";
```

---

## ⚠️ Notes

* JSON Server must be running locally unless deployed separately (e.g., on Render or Railway).
* Uploaded images are stored as base64 URLs (not actual file uploads).

---

## 📚 Future Improvements

* Authentication layer
* File upload to cloud storage (e.g., Firebase or Cloudinary)
* Export to CSV or PDF
* Pagination support in table

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).



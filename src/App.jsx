import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import "./assets/css/bootstrap.min.css";
import "./assets/css/fonts.min.css";
import "./assets/css/kaiadmin.min.css";
import "./assets/css/plugins.min.css";

import Home from "./pages/Home";
import Form from "./pages/Form";
import Table from "./pages/Table";
import Aside from "./components/Aside";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";

const App = () => {
  // --------- S T A T E - H A N D L E ----------

  const [product, setProduct] = useState({});
  const [productData, setProductData] = useState([]);
  const [warehouse, setWarehouse] = useState([]);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState({});

  // --------- R E F R E N C E S - S T A T E -------------

  const navigate = useNavigate();
  const inputRef = useRef();
  const URL = "http://localhost:3000/product";

  // --------- U S E - E F F E C T  ------------

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    let res = await axios.get(URL);
    setProductData(res.data);
  };

  // --------- H A N D L E - C H A N G E -----------

  const handleChange = (e) => {
    const { name, value, checked, files } = e.target;

    if (name === "warehouse") {
      let newWarehouse = [...warehouse];

      // --------- CHECKED --------

      if (checked) {
        newWarehouse.push(value);
      } else {
        newWarehouse = newWarehouse.filter((val) => val != value);
      }

      setWarehouse(newWarehouse);
      setProduct((prev) => ({ ...prev, warehouse: newWarehouse }));
      return;
    }

    // ----------- IMAGES -----------

    if (files) {
      const selectFile = files[0];

      if (selectFile.size > 5242880) {
        alert("File should be less than 5mb");
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        const fileObj = {
          type: selectFile.type,
          name: selectFile.name,
          url: reader.result,
        };

        setProduct((prev) => ({ ...prev, [name]: fileObj }));
      };

      reader.readAsDataURL(selectFile);
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ---------- H A N D L E - S U B M I T -----------

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!handleValidation()) return;

    // --------- EDIT SECTION ----------

    if (editId !== null) {
      await axios.put(`${URL}/${editId}`, product);
      setEditId(null);
      toast.info("Update SuccessFull")
    } else {
      await axios.post(URL, { ...product, id: String(Date.now()) });
      toast.success("Added SuccessFull")
    }

    setProduct({});
    setWarehouse([]);
    inputRef.current.value = "";
    handleFetch();
    navigate("/Table");
  };

  // ---------- H A N D L E - C A N C E L -----------

  const handleCancel = () => {
    setProduct({});
    setWarehouse([]);
  };

  // ---------- H A N D L E - D E L E T E -------------

  const handleDelete = async (id) => {
    await axios.delete(`${URL}/${id}`);
    handleFetch();
    toast.error("Deleted SuccessFull")
  };

  // ---------- H A N D L E - E D I T -------------

  const handleEdit = (id) => {
    let editData = productData.find((val) => val.id === id);

    if (editData) {
      setProduct(editData);
      setWarehouse(editData.warehouse || []);
      setEditId(id);
    }

    navigate("/Form");
  };

  // ---------- H A N D L E - V A L I D A T I O N  -------------

  const handleValidation = () => {
    let errors = {};

    if (!product.productname) errors.productname = "Product name is required";
    if (!product.productprice)
      errors.productprice = "Product price is required";
    if (!product.stock) errors.stock = "Product stock is required";
    if (!product.description)
      errors.description = "Product description is required";
    if (!product.warehouse) errors.warehouse = "Product warehouse is required";

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  // ------------ C H A R T - D A T A --------------

  const xAxisData = [1, 2, 3, 5, 8, 10];
  const [seriesData, setSeriesData] = useState([2, 5.5, 2, 8.5, 1.5, 5]);

  useEffect(() => {
    const seriesInterval = setInterval(() => {
      const newData = xAxisData.map(() =>
        Number((Math.random() * 10).toFixed(2))
      );

      setSeriesData(newData);
    }, 3000);

    return () => clearInterval(seriesInterval);
  }, [xAxisData]);



// ------------------------------------ L O G I C S - E N D -------------------------------------------  

  return (
    <>
      <Aside />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              productData={productData}
              xAxisData={xAxisData}
              seriesData={seriesData}
            />
          }
        />
        <Route
          path="/Form"
          element={
            <Form
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
              product={product}
              warehouse={warehouse}
              error={error}
              inputRef={inputRef}
            />
          }
        />
        <Route
          path="/Table"
          element={
            <Table
              productData={productData}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          }
        />
      </Routes>

      {/* ------- T O A S T I F Y ------- */}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        pauseOnFocusLoss
        theme="colored"
      />
    </>
  );
};

export default App;

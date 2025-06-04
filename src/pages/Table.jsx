import React, { useRef, useState } from "react";
import Header from "../components/Header";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import DataTable from "react-data-table-component";

const Table = (props) => {

  const { productData, handleDelete, handleEdit } = props;

  const [selectedRow, setSelectedRow] = useState("");

  // ----------- H A N D L E - S E A R C H ------------

  const [textFilter, setTextFilter] = useState("");
  const searchRef = useRef();

  const products = productData.filter((item) =>
    item.productname.toLowerCase().includes(textFilter.toLowerCase())
  );

  // ------------ D A T A - T A B L E - C O M P O N E N T --------------

  const column = [
    {
      name: "Product Name",
      selector: (row) => row.productname,
      sortable: true,
    },
    {
      name: "Image",
      selector: (row) =>
        row.image ? (
          <img
            src={row.image.url}
            alt={row.productname}
            className="img-fluid"
            style={{ width: "40px", height: "40px", objectFit: "cover" }}
          />
        ) : (
          <span>No Image</span>
        ),
    },
    {
      name: "Price",
      selector: (row) => row.productprice,
      sortable: true,
    },
    {
      name: "Stock",
      selector: (row) => row.stock,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <button
            className="btn btn-warning text-white rounded-pill ms-2"
            onClick={() => handleEdit(row.id)}
          >
            {" "}
            <FaPencilAlt />
          </button>
        </>
      ),
    },
  ];

  // ---------------- D A T A - T A B L E - C O M P O N E N T - C U S T O M - S T Y L E -------------------

  const customStyle = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "16px",
      },
    },
  };

  return (
    <>
      <div className="main-panel">
        <Header />
        <div className="container">
          <div className="page-inner">
            <div className="page-header">
              <h3 className="fw-bold mb-3">Tables</h3>
              <ul className="breadcrumbs mb-3">
                <li className="nav-home">
                  <a href="#">
                    <i className="icon-home" />
                  </a>
                </li>
                <li className="separator">
                  <i className="icon-arrow-right" />
                </li>
                <li className="nav-item">
                  <a href="#">Tables</a>
                </li>
                <li className="separator">
                  <i className="icon-arrow-right" />
                </li>
                <li className="nav-item">
                  <a href="#">Basic Tables</a>
                </li>
              </ul>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="card p-3 position-relative">
                  <DataTable
                    columns={column}
                    data={products}
                    customStyles={customStyle}
                    title="Product Data"
                    pagination
                    selectableRows
                    highlightOnHover
                    pointerOnHover
                    responsive
                    onSelectedRowsChange={(e) => {
                      setSelectedRow(e.selectedRows);
                    }}
                  />

                  <input
                    type="search"
                    className="form-control rounded-pill position-absolute top-0 end-0 w-25 mt-3 me-3"
                    placeholder="Search"
                    onChange={(e) => setTextFilter(e.target.value)}
                    value={textFilter}
                    ref={searchRef}
                  />

                  <div>
                    <button
                      className="btn btn-danger rounded-pill position-absolute bottom-0 mb-3"
                      disabled={selectedRow.length === 0}
                      onClick={() => {
                        selectedRow.map((row) => handleDelete(row.id));
                        setSelectedRow("");
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer">
          <div className="container-fluid d-flex justify-content-between">
            <nav className="pull-left">
              <ul className="nav">
                <li className="nav-item">
                  <a className="nav-link" href="http://www.themekita.com">
                    ThemeKita
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    {" "}
                    Help{" "}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    {" "}
                    Licenses{" "}
                  </a>
                </li>
              </ul>
            </nav>
            <div className="copyright">
              {new Date().getFullYear()}, made with{" "}
              <i className="fa fa-heart heart text-danger" /> by
              <a href="http://www.themekita.com">ThemeKita</a>
            </div>
            <div>
              Distributed by
              <a target="_blank" href="https://themewagon.com/">
                ThemeWagon
              </a>
              .
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Table;

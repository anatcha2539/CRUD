import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  doc,
} from "firebase/firestore";

const FormInputData = () => {
  const [form, setForm] = useState({});
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const anatchaRef = collection(db, "Anatcha");

  // โหลดข้อมูล realtime
  useEffect(() => {
    const unsub = onSnapshot(anatchaRef, (snapshot) => {
      const newData = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setData(newData);
    });
    return () => unsub();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // CREATE
  const handleAddData = async () => {
    if (!form.name || !form.detail || !form.price) return alert("กรอกให้ครบ");
    await addDoc(anatchaRef, form);
    setForm({});
  };

  // DELETE
  const handleDelete = async (id) => {
    if (window.confirm("ยืนยันลบข้อมูล?")) {
      await deleteDoc(doc(anatchaRef, id));
    }
  };

  // UPDATE
  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({ name: item.name, detail: item.detail, price: item.price });
  };

  const handleUpdateData = async () => {
    if (!form.name || !form.detail || !form.price) return alert("กรอกให้ครบ");
    await updateDoc(doc(anatchaRef, editId), form);
    setEditId(null);
    setForm({});
  };

  // SORT
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // SEARCH + SORT รวมกัน
  const filteredData = sortedData.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h3>{editId ? "แก้ไขข้อมูล" : "เพิ่มข้อมูล"}</h3>
      <input
        name="name"
        value={form.name || ""}
        onChange={handleChange}
        placeholder="name"
        className="form-control mb-2"
      />
      <input
        name="detail"
        value={form.detail || ""}
        onChange={handleChange}
        placeholder="detail"
        className="form-control mb-2"
      />
      <input
        name="price"
        type="number"
        value={form.price || ""}
        onChange={handleChange}
        placeholder="price"
        className="form-control mb-2"
      />

      {editId ? (
        <button onClick={handleUpdateData} className="btn btn-warning me-2">
          Update
        </button>
      ) : (
        <button onClick={handleAddData} className="btn btn-primary me-2">
          Add
        </button>
      )}
      {editId && (
        <button
          onClick={() => {
            setEditId(null);
            setForm({});
          }}
          className="btn btn-secondary"
        >
          Cancel
        </button>
      )}

      <hr />

      {/* Search */}
      <input
        type="text"
        placeholder="🔍 ค้นหา..."
        className="form-control mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
              Name {sortConfig.key === "name" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
            </th>
            <th
              onClick={() => handleSort("detail")}
              style={{ cursor: "pointer" }}
            >
              Detail {sortConfig.key === "detail" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
            </th>
            <th
              onClick={() => handleSort("price")}
              style={{ cursor: "pointer" }}
            >
              Price {sortConfig.key === "price" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, i) => (
            <tr key={item.id}>
              <td>{i + 1}</td>
              <td>{item.name}</td>
              <td>{item.detail}</td>
              <td>{item.price}</td>
              <td>
                <button
                  onClick={() => handleEdit(item)}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormInputData;

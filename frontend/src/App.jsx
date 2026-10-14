import { useEffect, useState } from "react";
import api from "./api";

const emptyForm = {
  name: "",
  category: "",
  quantity: "1",
  price: "",
  description: ""
};

function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadItems() {
    setLoading(true);
    setError("");
    try {
      const response = await api.get("/items");
      setItems(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load items. Check the backend and API URL.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");

    const payload = {
      name: form.name.trim(),
      category: form.category.trim(),
      quantity: Number(form.quantity),
      price: Number(form.price),
      description: form.description.trim()
    };

    if (!payload.name || !payload.category || form.price === "" || form.quantity === "") {
      setError("Please complete the item name, category, quantity and price.");
      return;
    }
    if (payload.quantity < 0 || payload.price < 0) {
      setError("Quantity and price cannot be negative.");
      return;
    }

    try {
      if (editingId) {
        await api.put(`/items/${editingId}`, payload);
        setMessage("Item updated successfully.");
      } else {
        await api.post("/items", payload);
        setMessage("Item added successfully.");
      }
      resetForm();
      await loadItems();
    } catch (err) {
      setError(err.response?.data?.message || "Could not save item.");
    }
  }

  function startEdit(item) {
    setEditingId(item._id);
    setForm({
      name: item.name || "",
      category: item.category || "",
      quantity: String(item.quantity ?? 0),
      price: String(item.price ?? ""),
      description: item.description || ""
    });
    setMessage("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function deleteItem(id) {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    setMessage("");
    setError("");
    try {
      await api.delete(`/items/${id}`);
      setMessage("Item deleted successfully.");
      if (editingId === id) resetForm();
      await loadItems();
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete item.");
    }
  }

  return (
    <main className="page">
      <header className="hero">
        <p className="eyebrow">MERN STACK PRACTICE</p>
        <h1>Item Manager</h1>
        <p className="subtitle">Create, view, update and delete your items.</p>
      </header>

      <section className="panel">
        <h2>{editingId ? "Edit item" : "Add a new item"}</h2>
        <form onSubmit={handleSubmit} className="item-form">
          <label>
            Item name *
            <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Keyboard" required />
          </label>
          <label>
            Category *
            <input name="category" value={form.category} onChange={handleChange} placeholder="e.g. Electronics" required />
          </label>
          <label>
            Quantity *
            <input name="quantity" type="number" min="0" value={form.quantity} onChange={handleChange} required />
          </label>
          <label>
            Price (LKR) *
            <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} placeholder="4500" required />
          </label>
          <label className="wide">
            Description
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Add a short description" rows="3" />
          </label>
          <div className="actions wide">
            <button type="submit">{editingId ? "Save changes" : "Add item"}</button>
            {editingId && <button type="button" className="secondary" onClick={resetForm}>Cancel edit</button>}
          </div>
        </form>
        {message && <p className="notice success">{message}</p>}
        {error && <p className="notice error">{error}</p>}
      </section>

      <section className="panel">
        <div className="list-heading">
          <div>
            <h2>Items</h2>
            <p className="muted">{items.length} item(s) in the database</p>
          </div>
          <button type="button" className="secondary" onClick={loadItems}>Refresh</button>
        </div>

        {loading ? <p>Loading items...</p> : error && items.length === 0 ? <p className="muted">Items could not be displayed.</p> :
          items.length === 0 ? <p className="empty">No items yet. Add your first item above.</p> :
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Qty</th>
                  <th>Price (LKR)</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id}>
                    <td className="item-name">{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.quantity}</td>
                    <td>{Number(item.price).toLocaleString("en-LK", { maximumFractionDigits: 2 })}</td>
                    <td>{item.description || "—"}</td>
                    <td>
                      <div className="row-actions">
                        <button type="button" className="small secondary" onClick={() => startEdit(item)}>Edit</button>
                        <button type="button" className="small danger" onClick={() => deleteItem(item._id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      </section>
      <footer>Practice project · React · Express · MongoDB Atlas</footer>
    </main>
  );
}

export default App;

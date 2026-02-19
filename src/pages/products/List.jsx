 import React, { useEffect, useState } from "react";
import { getMenusApi, deleteMenuApi, updateMenuApi, getCategoriesApi } from "../../features/menu/menu.api";

const FoodList = () => {
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMenuId, setEditMenuId] = useState(null);
  const [editData, setEditData] = useState({});
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const menusRes = await getMenusApi();
        const catsRes = await getCategoriesApi();
        setMenus(menusRes.data.data);
        setCategories(catsRes.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this menu item?")) return;
    try {
      await deleteMenuApi(id);
      setMenus((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete menu");
    }
  };

  const handleToggleAvailability = async (menu) => {
    try {
      const updatedMenu = { ...menu, isAvailable: !menu.isAvailable };
      await updateMenuApi(menu._id, updatedMenu);
      setMenus((prev) => prev.map((m) => (m._id === menu._id ? updatedMenu : m)));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update menu");
    }
  };

  const handleEditClick = (menu) => {
    setEditMenuId(menu._id);
    setEditData({
      name: menu.name,
      description: menu.description,
      category: menu.category._id,
      price: menu.price,
      discountPrice: menu.discountPrice,
      stock: menu.stock,
      spiceLevel: menu.spiceLevel,
      isVeg: menu.isVeg,
      imageFile: null,
    });
    setPreview(menu.image);
  };

  const handleCancelEdit = () => {
    setEditMenuId(null);
    setEditData({});
    setPreview(null);
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setEditData({ ...editData, imageFile: files[0] });
      setPreview(files[0] ? URL.createObjectURL(files[0]) : null);
    } else {
      setEditData({ ...editData, [name]: type === "checkbox" ? checked : value });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      Object.keys(editData).forEach((key) => {
        if (["price", "discountPrice", "stock"].includes(key)) payload.append(key, Number(editData[key]));
        else if (key === "imageFile" && editData[key]) payload.append("imageFile", editData[key]);
        else payload.append(key, editData[key]);
      });

      await updateMenuApi(editMenuId, payload);
      handleCancelEdit();

      const menusRes = await getMenusApi();
      setMenus(menusRes.data.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update menu");
    }
  };

  if (loading) return <p className="text-center text-amber-700 font-medium">Loading...</p>;
  if (error) return <p className="text-center text-red-600 font-medium">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {menus.map((menu) => (
        <div key={menu._id} className="bg-white rounded-xl shadow-lg border border-amber-200 overflow-hidden flex flex-col">
          <div className="relative">
            <img src={menu.image || "/placeholder.png"} alt={menu.name} className="w-full h-48 object-cover" />
            <span className={`absolute top-2 left-2 text-xs px-2 py-1 rounded ${menu.isVeg ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
              {menu.isVeg ? "Veg" : "Non-Veg"}
            </span>
            <span className="absolute top-2 right-2 bg-amber-600 text-white text-xs px-2 py-1 rounded">
              {menu.spiceLevel === "mild" && "🌿 Mild"}
              {menu.spiceLevel === "medium" && "🌶 Medium"}
              {menu.spiceLevel === "hot" && "🔥 Hot"}
            </span>
          </div>

          <div className="p-4 flex flex-col gap-2 flex-1">
            {editMenuId === menu._id ? (
              <form className="flex flex-col gap-2" onSubmit={handleEditSubmit}>
                <input name="name" value={editData.name} onChange={handleEditChange} required className="border px-2 py-1 rounded" />
                <textarea name="description" value={editData.description} onChange={handleEditChange} className="border px-2 py-1 rounded" />
                <select name="category" value={editData.category} onChange={handleEditChange} className="border px-2 py-1 rounded">
                  {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                </select>
                <input name="price" type="number" value={editData.price} onChange={handleEditChange} className="border px-2 py-1 rounded" />
                <input name="discountPrice" type="number" value={editData.discountPrice} onChange={handleEditChange} className="border px-2 py-1 rounded" />
                <input name="stock" type="number" value={editData.stock} onChange={handleEditChange} className="border px-2 py-1 rounded" />
                <select name="spiceLevel" value={editData.spiceLevel} onChange={handleEditChange} className="border px-2 py-1 rounded">
                  <option value="mild">Mild 🌿</option>
                  <option value="medium">Medium 🌶️</option>
                  <option value="hot">Hot 🔥</option>
                </select>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="isVeg" checked={editData.isVeg} onChange={handleEditChange} />
                  Vegetarian
                </label>
                <input type="file" name="imageFile" onChange={handleEditChange} />
                {preview && <img src={preview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg" />}
                <div className="flex gap-2 mt-2">
                  <button type="submit" className="flex-1 bg-blue-500 text-white py-1 rounded">Save</button>
                  <button type="button" onClick={handleCancelEdit} className="flex-1 bg-gray-400 text-white py-1 rounded">Cancel</button>
                </div>
              </form>
            ) : (
              <>
                <h3 className="font-semibold text-lg text-amber-700">{menu.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{menu.description}</p>
                <p className="font-bold text-amber-800">₹{menu.price.toFixed(2)}</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => handleToggleAvailability(menu)} className={`flex-1 py-2 text-white rounded-lg text-sm font-medium transition ${menu.isAvailable ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"}`}>
                    {menu.isAvailable ? "Mark Unavailable" : "Unavailable"}
                  </button>
                  <button onClick={() => handleEditClick(menu)} className="flex-1 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium transition">Edit</button>
                  <button onClick={() => handleDelete(menu._id)} className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition">Delete</button>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodList;

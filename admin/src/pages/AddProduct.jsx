import { useState } from "react";
import axios from "axios";
import { FiX, FiUpload, FiCheck } from "react-icons/fi";

const colorOptions = ["Gold", "Silver", "Black"];
const categoryOptions = {
  Women: ["Necklaces", "Earrings", "Bracelets", "Rings", "Anklets"],
  Men: ["Necklaces", "Bracelets", "Rings", "Cufflinks"],
  Unisex: ["Necklaces", "Bracelets", "Rings", "Earrings"],
};

const AddProduct = ({ onClose, onSaved }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [colors, setColors] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleColorChange = (color) => {
    setColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (images.length === 0) return alert("Please select at least one product image");
    if (colors.length === 0) return alert("Please select at least one color");
    if (stock === "") return alert("Please enter the stock quantity");
    if (!category) return alert("Please select a category");
    if (!subCategory) return alert("Please select a sub category");

    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("color", JSON.stringify(colors));
      formData.append("bestseller", bestseller);
      images.forEach((image) => formData.append("images", image));

      const response = await axios.post(
        "http://localhost:4000/api/product/add",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        onSaved?.();
        onClose();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong while adding the product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-2xl max-h-[88vh] flex flex-col bg-white rounded-2xl overflow-hidden shadow-2xl">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Add Product</h2>
            <p className="text-sm text-slate-400 mt-0.5">Add a new product to your catalog</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50"
          >
            <FiX size={16} />
          </button>
        </div>

        <form onSubmit={onSubmitHandler} className="flex flex-col flex-1 min-h-0">

          {/* BODY */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-7">

            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Product Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
                className="w-full h-11 rounded-lg border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:bg-white focus:border-blue-400 transition"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description"
                rows="4"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:bg-white focus:border-blue-400 resize-none transition"
                required
              />
            </div>

            {/* Price / Stock / Category / Sub Category */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Price (₦)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0"
                  min="0"
                  className="w-full h-11 rounded-lg border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:bg-white focus:border-blue-400 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Stock Quantity</label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="e.g. 20"
                  min="0"
                  className="w-full h-11 rounded-lg border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:bg-white focus:border-blue-400 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => { setCategory(e.target.value); setSubCategory(""); }}
                  className="w-full h-11 rounded-lg border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-700 outline-none focus:bg-white focus:border-blue-400 transition"
                  required
                >
                  <option value="">Select category</option>
                  {Object.keys(categoryOptions).map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Sub Category</label>
                <select
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  disabled={!category}
                  className="w-full h-11 rounded-lg border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-700 outline-none focus:bg-white focus:border-blue-400 transition disabled:opacity-50"
                  required
                >
                  <option value="">{category ? "Select sub category" : "Select category first"}</option>
                  {category && categoryOptions[category].map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Colors */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">Colors</label>
              <div className="flex flex-wrap gap-2.5">
                {colorOptions.map((color) => {
                  const selected = colors.includes(color);
                  return (
                    <button
                      type="button"
                      key={color}
                      onClick={() => handleColorChange(color)}
                      className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-2.5 text-sm font-medium transition ${
                        selected
                          ? "border-blue-200 bg-blue-50 text-blue-700"
                          : "border-slate-200 bg-white text-slate-600 hover:border-blue-200"
                      }`}
                    >
                      <span className={`h-3.5 w-3.5 rounded-full border ${
                        color === "Gold" ? "border-yellow-500 bg-yellow-500"
                        : color === "Silver" ? "border-slate-400 bg-slate-300"
                        : "border-slate-900 bg-slate-900"
                      }`} />
                      {color}
                      {selected && <FiCheck size={14} className="text-blue-600" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bestseller */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={bestseller}
                onChange={(e) => setBestseller(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-blue-600"
              />
              <div>
                <p className="text-sm font-medium text-slate-700">Add to bestseller</p>
                <p className="text-xs text-slate-400 mt-0.5">Feature this product as a bestseller.</p>
              </div>
            </label>

            {/* Images */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-slate-700">Images</p>
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600">
                  {images.length}/5
                </span>
              </div>

              {images.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-4">
                  {images.map((image, index) => (
                    <div key={`${image.name}-${index}`} className="relative h-20 w-20">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Product ${index + 1}`}
                        className="h-full w-full rounded-lg border border-slate-200 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setImages((prev) => prev.filter((_, i) => i !== index))}
                        className="absolute -right-1.5 -top-1.5 h-6 w-6 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-red-500 hover:bg-red-50"
                      >
                        <FiX size={12} />
                      </button>
                      {index === 0 && (
                        <span className="absolute bottom-1 left-1 rounded-md bg-slate-900/75 px-1.5 py-0.5 text-[9px] font-medium text-white">
                          Main
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {images.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-lg bg-slate-50 py-8 mb-4">
                  <FiUpload size={22} className="mb-2 text-slate-300" />
                  <p className="text-sm text-slate-500">No images selected</p>
                </div>
              )}

              {images.length < 5 && (
                <label
                  htmlFor="add-product-images"
                  className="flex items-center justify-center gap-2 w-full h-11 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer transition text-sm text-slate-600"
                >
                  <FiUpload size={16} className="text-blue-500" />
                  Click to upload images
                  <input
                    id="add-product-images"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    multiple
                    onChange={(e) => {
                      const selectedFiles = Array.from(e.target.files);
                      if (images.length + selectedFiles.length > 5) {
                        alert("You can upload a maximum of 5 images");
                        e.target.value = "";
                        return;
                      }
                      setImages((prev) => [...prev, ...selectedFiles]);
                      e.target.value = "";
                    }}
                    className="hidden"
                  />
                </label>
              )}
            </div>

          </div>

          {/* FOOTER */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50 shrink-0">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-white transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-sm font-medium transition"
            >
              {loading ? "Adding Product..." : "Add Product"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddProduct;
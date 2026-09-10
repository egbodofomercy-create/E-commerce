
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FiX,
  FiUpload,
  FiCheck,
  FiImage,
  FiPackage,
} from "react-icons/fi";

const colorOptions = ["Gold", "Silver", "Black"];

const subCategoryOptions = {
  Women: ["Necklaces", "Earrings", "Bracelets", "Rings", "Anklets"],
  Men: ["Necklaces", "Bracelets", "Rings", "Cufflinks"],
  Unisex: ["Necklaces", "Bracelets", "Rings", "Earrings"],
};

const EditProduct = ({ productId, onClose, onSaved }) => {
  /* ================= FORM STATE ================= */

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [colors, setColors] = useState([]);
  const [bestseller, setBestseller] = useState(false);

  const [currentImages, setCurrentImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  /* ================= FETCH PRODUCT ================= */

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const response = await axios.get(
          `http://localhost:4000/api/product/single/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          const product = response.data.product;

          setName(product.name || "");
          setDescription(product.description || "");
          setPrice(product.price ?? "");
          setStock(product.stock ?? "");
          setCategory(product.category || "");
          setSubCategory(product.subCategory || "");
          setColors(product.color || []);
          setBestseller(product.bestseller || false);
          setCurrentImages(product.image || []);
        } else {
          alert(response.data.message);
          onClose();
        }
      } catch (error) {
        console.log(error);
        alert("Something went wrong while loading the product.");
        onClose();
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  /* ================= CATEGORY ================= */

  const handleCategoryChange = (value) => {
    setCategory(value);
    setSubCategory("");
  };

  /* ================= COLORS ================= */

  const handleColorChange = (color) => {
    setColors((prev) =>
      prev.includes(color)
        ? prev.filter((item) => item !== color)
        : [...prev, color]
    );
  };

  /* ================= CURRENT IMAGES ================= */

  const removeCurrentImage = (index) => {
    setCurrentImages((prev) =>
      prev.filter((_, imageIndex) => imageIndex !== index)
    );
  };

  /* ================= NEW IMAGES ================= */

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files || []);

    if (files.length === 0) return;

    const totalImages = currentImages.length + newImages.length;
    const availableSlots = 5 - totalImages;

    if (availableSlots <= 0) {
      alert("You already have 5 images.");
      event.target.value = "";
      return;
    }

    if (files.length > availableSlots) {
      alert(
        `You can only add ${availableSlots} more image${
          availableSlots === 1 ? "" : "s"
        }.`
      );

      event.target.value = "";
      return;
    }

    setNewImages((prev) => [...prev, ...files]);

    event.target.value = "";
  };

  const removeNewImage = (index) => {
    setNewImages((prev) =>
      prev.filter((_, imageIndex) => imageIndex !== index)
    );
  };

  /* ================= SUBMIT ================= */

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    /* ---------- VALIDATION ---------- */

    if (!name.trim()) {
      return alert("Please enter a product name.");
    }

    if (!description.trim()) {
      return alert("Please enter a product description.");
    }

    if (price === "" || Number(price) < 0) {
      return alert("Please enter a valid price.");
    }

    if (stock === "" || Number(stock) < 0) {
      return alert("Please enter a valid stock quantity.");
    }

    if (!category) {
      return alert("Please select a category.");
    }

    if (!subCategory) {
      return alert("Please select a sub category.");
    }

    if (colors.length === 0) {
      return alert("Please select at least one color.");
    }

    const totalImages = currentImages.length + newImages.length;

    if (totalImages > 5) {
      return alert("You can have a maximum of 5 images.");
    }

    /* ---------- UPDATE ---------- */

    try {
      setUpdating(true);

      const token = localStorage.getItem("adminToken");

      const formData = new FormData();

      formData.append("name", name.trim());
      formData.append("description", description.trim());
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("color", JSON.stringify(colors));
      formData.append("bestseller", bestseller);
      formData.append(
        "existingImages",
        JSON.stringify(currentImages)
      );

     newImages.forEach((file) => {
  formData.append("images", file);
});
      const response = await axios.put(
        `http://localhost:4000/api/product/update/${productId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        onSaved?.();
        onClose();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong while updating the product."
      );
    } finally {
      setUpdating(false);
    }
  };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-6 backdrop-blur-[2px]"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="w-full max-w-[1380px] rounded-2xl bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-200 px-10 py-7">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Edit Product
              </h2>

              <p className="mt-1.5 text-sm text-slate-400">
                Update your product information
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
            >
              <FiX size={20} />
            </button>
          </div>

          <div className="flex min-h-[420px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                <FiPackage
                  className="text-slate-400"
                  size={23}
                />
              </div>

              <p className="text-base font-medium text-slate-600">
                Loading product...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-5 backdrop-blur-[2px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex max-h-[94vh] w-full max-w-[1380px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* ===================================================== */}
        {/* HEADER */}
        {/* ===================================================== */}

        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-10 py-7">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              Edit Product
            </h2>

            <p className="mt-1.5 text-sm text-slate-400">
              Update your product information
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={updating}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* ===================================================== */}
        {/* FORM */}
        {/* ===================================================== */}

        <form
          onSubmit={onSubmitHandler}
          className="flex min-h-0 flex-1 flex-col"
        >
          {/* =================================================== */}
          {/* BODY */}
          {/* =================================================== */}

          <div className="flex-1 overflow-y-auto px-10 py-9">

            {/* ================================================ */}
            {/* BASIC INFORMATION */}
            {/* ================================================ */}

            <div className="mb-10">
              <div className="mb-6">
                <h3 className="text-base font-semibold text-slate-800">
                  Basic Information
                </h3>

                <p className="mt-1.5 text-sm text-slate-400">
                  Update the main details of your product.
                </p>
              </div>

              {/* PRODUCT NAME */}

              <div className="mb-6">
                <label className="mb-2.5 block text-sm font-medium text-slate-700">
                  Product Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter product name"
                  className="h-13 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-50"
                  required
                />
              </div>

              {/* DESCRIPTION */}

              <div>
                <label className="mb-2.5 block text-sm font-medium text-slate-700">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your product..."
                  rows={6}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm leading-7 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-50"
                  required
                />
              </div>
            </div>

            {/* ================================================ */}
            {/* PRICING & INVENTORY */}
            {/* ================================================ */}

            <div className="mb-10">
              <div className="mb-6">
                <h3 className="text-base font-semibold text-slate-800">
                  Pricing & Inventory
                </h3>

                <p className="mt-1.5 text-sm text-slate-400">
                  Manage the price and available stock.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                {/* PRICE */}

                <div>
                  <label className="mb-2.5 block text-sm font-medium text-slate-700">
                    Price
                    <span className="ml-1 text-xs font-normal text-slate-400">
                      (₦)
                    </span>
                  </label>

                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0"
                    min="0"
                    className="h-13 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-50"
                    required
                  />
                </div>

                {/* STOCK */}

                <div>
                  <label className="mb-2.5 block text-sm font-medium text-slate-700">
                    Stock Quantity
                  </label>

                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="0"
                    min="0"
                    className="h-13 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-50"
                    required
                  />
                </div>

              </div>
            </div>

            {/* ================================================ */}
            {/* CATEGORY */}
            {/* ================================================ */}

            <div className="mb-10">
              <div className="mb-6">
                <h3 className="text-base font-semibold text-slate-800">
                  Product Category
                </h3>

                <p className="mt-1.5 text-sm text-slate-400">
                  Choose where this product belongs in your catalog.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                {/* CATEGORY */}

                <div>
                  <label className="mb-2.5 block text-sm font-medium text-slate-700">
                    Category
                  </label>

                  <select
                    value={category}
                    onChange={(e) =>
                      handleCategoryChange(e.target.value)
                    }
                    className="h-13 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-50"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="Women">Women</option>
                    <option value="Men">Men</option>
                    <option value="Unisex">Unisex</option>
                  </select>
                </div>

                {/* SUB CATEGORY */}

                <div>
                  <label className="mb-2.5 block text-sm font-medium text-slate-700">
                    Sub Category
                  </label>

                  <select
                    value={subCategory}
                    onChange={(e) =>
                      setSubCategory(e.target.value)
                    }
                    disabled={!category}
                    className="h-13 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  >
                    <option value="">
                      Select sub category
                    </option>

                    {(subCategoryOptions[category] || []).map(
                      (option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      )
                    )}
                  </select>
                </div>

              </div>
            </div>

            {/* ================================================ */}
            {/* COLORS */}
            {/* ================================================ */}

            <div className="mb-10">
              <div className="mb-6">
                <h3 className="text-base font-semibold text-slate-800">
                  Available Colors
                </h3>

                <p className="mt-1.5 text-sm text-slate-400">
                  Select all colors available for this product.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                {colorOptions.map((color) => {
                  const selected = colors.includes(color);

                  return (
                    <button
                      key={color}
                      type="button"
                      onClick={() => handleColorChange(color)}
                      className={`flex items-center gap-3 rounded-xl border px-5 py-3 text-sm font-medium transition ${
                        selected
                          ? "border-blue-200 bg-blue-50 text-blue-700"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <span
                        className={`h-4 w-4 rounded-full border ${
                          color === "Gold"
                            ? "border-yellow-500 bg-yellow-500"
                            : color === "Silver"
                            ? "border-slate-400 bg-slate-300"
                            : "border-slate-900 bg-slate-900"
                        }`}
                      />

                      <span>{color}</span>

                      {selected && (
                        <FiCheck
                          size={16}
                          className="text-blue-600"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ================================================ */}
            {/* BESTSELLER */}
            {/* ================================================ */}

            <div className="mb-10">
              <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 px-5 py-5 transition hover:border-slate-300 hover:bg-white">
                <input
                  type="checkbox"
                  checked={bestseller}
                  onChange={(e) =>
                    setBestseller(e.target.checked)
                  }
                  className="h-5 w-5 rounded border-slate-300 accent-blue-600"
                />

                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Add to bestseller
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Feature this product as a bestseller in your store.
                  </p>
                </div>
              </label>
            </div>

            {/* ================================================ */}
            {/* IMAGES */}
            {/* ================================================ */}

            <div>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-slate-800">
                    Product Images
                  </h3>

                  <p className="mt-1.5 text-sm text-slate-400">
                    Upload up to 5 images for this product.
                  </p>
                </div>

                <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
                  {currentImages.length + newImages.length}/5
                </span>
              </div>

              {/* IMAGE GRID */}

              {currentImages.length > 0 ||
              newImages.length > 0 ? (
                <div className="mb-6 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">

                  {/* CURRENT IMAGES */}

                  {currentImages.map((url, index) => (
                    <div
                      key={`current-${index}`}
                      className="group relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
                    >
                      <img
                        src={url}
                        alt={`Product ${index + 1}`}
                        className="h-full w-full object-cover"
                      />

                      {/* REMOVE */}

                      <button
                        type="button"
                        onClick={() =>
                          removeCurrentImage(index)
                        }
                        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-500 shadow-md transition hover:bg-red-50 hover:text-red-500"
                      >
                        <FiX size={16} />
                      </button>

                      {/* MAIN */}

                      {index === 0 && (
                        <span className="absolute bottom-3 left-3 rounded-md bg-slate-900/80 px-3 py-1.5 text-[10px] font-medium text-white">
                          Main
                        </span>
                      )}
                    </div>
                  ))}

                  {/* NEW IMAGES */}

                  {newImages.map((file, index) => (
                    <div
                      key={`new-${index}`}
                      className="relative aspect-square overflow-hidden rounded-2xl border border-blue-200 bg-blue-50"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`New product ${index + 1}`}
                        className="h-full w-full object-cover"
                      />

                      {/* REMOVE */}

                      <button
                        type="button"
                        onClick={() =>
                          removeNewImage(index)
                        }
                        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-500 shadow-md transition hover:bg-red-50 hover:text-red-500"
                      >
                        <FiX size={16} />
                      </button>

                      {/* NEW LABEL */}

                      <span className="absolute bottom-3 left-3 rounded-md bg-blue-600 px-3 py-1.5 text-[10px] font-medium text-white">
                        New
                      </span>
                    </div>
                  ))}

                </div>
              ) : (
                <div className="mb-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-16">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                    <FiImage
                      size={24}
                      className="text-slate-300"
                    />
                  </div>

                  <p className="text-sm font-medium text-slate-500">
                    No images selected
                  </p>

                  <p className="mt-1.5 text-sm text-slate-400">
                    Add product images below
                  </p>
                </div>
              )}

              {/* UPLOAD */}

              {currentImages.length + newImages.length < 5 && (
                <label
                  htmlFor="edit-product-images"
                  className="flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 text-sm font-medium text-slate-600 transition hover:border-blue-300 hover:bg-blue-50/50"
                >
                  <FiUpload
                    size={19}
                    className="text-blue-500"
                  />

                  <span>Click to add images</span>

                  <input
                    id="edit-product-images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* =================================================== */}
          {/* FOOTER */}
          {/* =================================================== */}

          <div className="flex shrink-0 items-center justify-end gap-4 border-t border-slate-200 bg-slate-50 px-10 py-5">
            <button
              type="button"
              onClick={onClose}
              disabled={updating}
              className="rounded-xl border border-slate-200 bg-white px-7 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={updating}
              className="rounded-xl bg-blue-600 px-7 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              {updating
                ? "Saving Changes..."
                : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;

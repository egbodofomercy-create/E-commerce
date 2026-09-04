import { useState } from "react";
import axios from "axios";
import {
  FiUpload,
  FiCheck,
} from "react-icons/fi";

const AddProduct = ({ setCurrentPage }) => {
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

  const colorOptions = [
  "Gold",
  "Silver",
  "Black",
];

const categoryOptions = {
  Women: [
    "Necklaces",
    "Earrings",
    "Bracelets",
    "Rings",
    "Anklets",
  ],
  Men: [
    "Necklaces",
    "Bracelets",
    "Rings",
    "Cufflinks",
  ],
  Unisex: [
    "Necklaces",
    "Bracelets",
    "Rings",
    "Earrings",
  ],
};
  const handleColorChange = (color) => {
    setColors((prev) =>
      prev.includes(color)
        ? prev.filter((item) => item !== color)
        : [...prev, color]
    );
  };
 
  const onSubmitHandler = async (event) => {
    event.preventDefault();

   if (images.length === 0) {
  alert("Please select at least one product image");
  return;
}
    if (colors.length === 0) {
      alert("Please select at least one color");
      return;
    }

    if (stock === "") {
      alert("Please enter the stock quantity");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("color", JSON.stringify(colors));
      formData.append("bestseller", bestseller);
      images.forEach((image) => {
  formData.append("images", image);
});

      const response = await axios.post(
        "http://localhost:4000/api/product/add",
        formData
      );

      if (response.data.success) {
        alert("Product added successfully");

        setName("");
        setDescription("");
        setPrice("");
        setStock("");
        setCategory("");
        setSubCategory("");
        setColors([]);
        setBestseller(false);
      setImages([]);

        setCurrentPage("products");
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
    <div className="max-w-6xl">
  


      {/* ================= FORM ================= */}
     <form
  onSubmit={onSubmitHandler}
  className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 items-start"
>

        {/* ================= BASIC INFORMATION ================= */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">

          <div className="px-6 py-5 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-blue-500">
              Basic Information
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              Enter the main details of your product.
            </p>
          </div>


          <div className="p-6 space-y-6">

            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Product Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
                className="
                  w-full
                  border
                  border-slate-200
                  bg-slate-50
                  rounded-lg
                  px-4
                  py-3
                  text-sm
                  text-slate-700
                  placeholder:text-slate-400
                  outline-none
                  focus:bg-white
                  focus:border-blue-400
                  transition
                "
                required
              />
            </div>


            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description"
                rows="5"
                className="
                  w-full
                  border
                  border-slate-200
                  bg-slate-50
                  rounded-lg
                  px-4
                  py-3
                  text-sm
                  text-slate-700
                  placeholder:text-slate-400
                  outline-none
                  focus:bg-white
                  focus:border-blue-400
                  resize-none
                  transition
                "
                required
              />
            </div>


            {/* Price / Stock / Category / Sub Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Price (₦)
                </label>

                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0"
                  min="0"
                  className="
                    w-full
                    border
                    border-slate-200
                    bg-slate-50
                    rounded-lg
                    px-4
                    py-3
                    text-sm
                    text-slate-700
                    placeholder:text-slate-400
                    outline-none
                    focus:bg-white
                    focus:border-blue-400
                    transition
                  "
                  required
                />
              </div>


              {/* Stock */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Stock Quantity
                </label>

                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="e.g. 20"
                  min="0"
                  className="
                    w-full
                    border
                    border-slate-200
                    bg-slate-50
                    rounded-lg
                    px-4
                    py-3
                    text-sm
                    text-slate-700
                    placeholder:text-slate-400
                    outline-none
                    focus:bg-white
                    focus:border-blue-400
                    transition
                  "
                  required
                />
              </div>


              {/* Category */}
<div>
  <label className="block text-sm font-medium text-slate-700 mb-2">
    Category
  </label>

  <select
    value={category}
    onChange={(e) => {
      setCategory(e.target.value);
      setSubCategory("");
    }}
    className="
      w-full
      border
      border-slate-200
      bg-slate-50
      rounded-lg
      px-4
      py-3
      text-sm
      text-slate-700
      outline-none
      focus:bg-white
      focus:border-blue-400
      transition
    "
    required
  >
    <option value="">Select category</option>

    {Object.keys(categoryOptions).map((item) => (
      <option key={item} value={item}>
        {item}
      </option>
    ))}
  </select>
</div>


            {/* Sub Category */}
<div>
  <label className="block text-sm font-medium text-slate-700 mb-2">
    Sub Category
  </label>

  <select
    value={subCategory}
    onChange={(e) => setSubCategory(e.target.value)}
    disabled={!category}
    className="
      w-full
      border
      border-slate-200
      bg-slate-50
      rounded-lg
      px-4
      py-3
      text-sm
      text-slate-700
      outline-none
      focus:bg-white
      focus:border-blue-400
      transition
      disabled:opacity-50
      disabled:cursor-not-allowed
    "
    required
  >
    <option value="">
      {category ? "Select sub category" : "Select category first"}
    </option>

    {category &&
      categoryOptions[category].map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
  </select>
</div>

            </div>

          </div>
        </div>


        {/* ================= PRODUCT OPTIONS ================= */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">

          <div className="px-6 py-5 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">
              Product Options
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              Select the available colors and product settings.
            </p>
          </div>


          <div className="p-6 space-y-7">

            {/* Colors */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Colors
              </label>

              <div className="flex flex-wrap gap-3">

                {colorOptions.map((color) => {
                  const selected = colors.includes(color);

                  return (
                    <button
                      type="button"
                      key={color}
                      onClick={() => handleColorChange(color)}
                      className={`
                        inline-flex
                        items-center
                        gap-2
                        px-4
                        py-2.5
                        rounded-lg
                        border
                        text-sm
                        transition
                        ${
                          selected
                            ? "border-blue-400 bg-blue-50 text-blue-600"
                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                        }
                      `}
                    >

                      {/* Color Circle */}
                      <span
                        className={`
                          w-3.5
                          h-3.5
                          rounded-full
                          border
                          ${
                            color === "Gold"
                              ? "bg-yellow-500 border-yellow-500"
                              : color === "Silver"
                              ? "bg-gray-300 border-gray-400"
                              : "bg-black border-black"
                          }
                        `}
                      />

                      {color}

                      {selected && (
                        <FiCheck size={14} />
                      )}

                    </button>
                  );
                })}

              </div>
            </div>


           

{/* Bestseller */}
<div className="border-t border-slate-100 pt-6">

  <div className="inline-flex items-center gap-3">

    <p className="text-sm font-medium text-slate-700">
      Add to bestseller
    </p>

    {/* Toggle Button */}
    <button
      type="button"
      onClick={() => setBestseller(!bestseller)}
      className={`
        relative
        inline-flex
        h-5
        w-9
        items-center
        rounded-full
        transition
        duration-200
        ${
          bestseller
            ? "bg-blue-500"
            : "bg-slate-200"
        }
      `}
    >
      <span
        className={`
          inline-block
          h-3.5
          w-3.5
          rounded-full
          bg-white
          shadow-sm
          transition
          duration-200
          ${
            bestseller
              ? "translate-x-5"
              : "translate-x-0.5"
          }
        `}
      />
    </button>

  </div>

</div>




          </div>
        </div>


   
{/* ================= PRODUCT IMAGES ================= */}

<div className="bg-white border border-slate-200 rounded-xl overflow-hidden">

  <div className="px-6 py-5 border-b border-slate-200">
    <h2 className="text-lg font-semibold text-slate-900">
      Product Images
    </h2>

    <p className="text-sm text-slate-400 mt-1">
      Upload up to 5 images for this product.
    </p>
  </div>


  <div className="p-6">

    {/* Upload Area */}

    <label
      htmlFor="product-images"
      className="
        flex
        flex-col
        items-center
        justify-center
        w-full
        min-h-48
        border-2
        border-dashed
        border-slate-200
        rounded-xl
        bg-slate-50
        hover:bg-blue-50/40
        hover:border-blue-300
        cursor-pointer
        transition
      "
    >

      <div className="
        w-12
        h-12
        rounded-full
        bg-blue-50
        flex
        items-center
        justify-center
        mb-3
      ">
        <FiUpload
          size={20}
          className="text-blue-500"
        />
      </div>


      <p className="text-sm font-medium text-slate-700">
        Click to upload product images
      </p>


      <p className="text-xs text-slate-400 mt-1">
        PNG, JPG or JPEG • Maximum 5 images
      </p>


      <input
        id="product-images"
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

          // Allows the same image to be selected again later
          e.target.value = "";
        }}
        className="hidden"
      />

    </label>


    {/* Image Previews */}

    {images.length > 0 && (

      <div className="mt-5">

        <p className="text-sm font-medium text-slate-700 mb-3">
          Selected Images ({images.length}/5)
        </p>


        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">

          {images.map((image, index) => (

            <div
              key={`${image.name}-${index}`}
              className="relative group"
            >

              <img
                src={URL.createObjectURL(image)}
                alt={`Product ${index + 1}`}
                className="
                  w-full
                  aspect-square
                  object-cover
                  rounded-lg
                  border
                  border-slate-200
                "
              />


              {/* Image Number */}

              <div className="
                absolute
                top-2
                left-2
                w-6
                h-6
                rounded-full
                bg-white
                shadow-sm
                flex
                items-center
                justify-center
                text-xs
                font-semibold
                text-slate-700
              ">
                {index + 1}
              </div>


              {/* Remove Image */}

              <button
                type="button"
                onClick={() => {
                  setImages((prev) =>
                    prev.filter((_, imageIndex) => imageIndex !== index)
                  );
                }}
                className="
                  absolute
                  top-2
                  right-2
                  w-7
                  h-7
                  rounded-full
                  bg-white
                  shadow-md
                  flex
                  items-center
                  justify-center
                  text-slate-500
                  hover:text-red-500
                  hover:bg-red-50
                  transition
                "
                title="Remove image"
              >
                ×
              </button>

            </div>

          ))}

        </div>

      </div>

    )}

  </div>

</div>
```



        {/* ================= BUTTONS ================= */}
        <div className="flex items-center justify-end gap-3">

          <button
            type="button"
            onClick={() => setCurrentPage("products")}
            className="
              px-5
              py-2.5
              rounded-lg
              border
              border-slate-200
              text-sm
              font-medium
              text-slate-600
              hover:bg-slate-50
              transition
            "
          >
            Cancel
          </button>


          <button
            type="submit"
            disabled={loading}
            className="
              px-5
              py-2.5
              rounded-lg
              bg-blue-500
              hover:bg-blue-600
              disabled:bg-blue-300
              text-white
              text-sm
              font-medium
              transition
            "
          >
            {loading
              ? "Adding Product..."
              : "Add Product"}
          </button>

        </div>

      </form>
    </div>
  );
};

export default AddProduct;
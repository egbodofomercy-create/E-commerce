import { useEffect, useState } from "react";
import axios from "axios";

import {
  FiArrowLeft,
  FiUpload,
  FiCheck,
} from "react-icons/fi";

const EditProduct = ({
  setCurrentPage,
  selectedProductId,
}) => { console.log("SELECTED PRODUCT ID:", selectedProductId);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [colors, setColors] = useState([]);
  const [bestseller, setBestseller] = useState(false);

  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const colorOptions = [
    "Gold",
    "Silver",
    "Black",
  ];

  /* ================= FETCH PRODUCT ================= */

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/product/single/${selectedProductId}`
        );

        if (response.data.success) {
          const product = response.data.product;

          setName(product.name || "");
          setDescription(product.description || "");
          setPrice(product.price || "");
          setStock(product.stock ?? "");
          setCategory(product.category || "");
          setSubCategory(product.subCategory || "");
          setColors(product.color || []);
          setBestseller(product.bestseller || false);

          if (product.image?.[0]) {
            setCurrentImage(product.image[0]);
          }
        } else {
          alert(response.data.message);
          setCurrentPage("products");
        }
      } catch (error) {
        console.log(error);
        alert("Something went wrong while loading the product");
        setCurrentPage("products");
      } finally {
        setLoading(false);
      }
    };

    if (selectedProductId) {
      fetchProduct();
    }
  }, [selectedProductId, setCurrentPage]);

  /* ================= COLOR ================= */

  const handleColorChange = (color) => {
    setColors((prev) =>
      prev.includes(color)
        ? prev.filter((item) => item !== color)
        : [...prev, color]
    );
  };

  /* ================= UPDATE PRODUCT ================= */

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (colors.length === 0) {
      alert("Please select at least one color");
      return;
    }

    if (stock === "") {
      alert("Please enter the stock quantity");
      return;
    }

    try {
      setUpdating(true);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("color", JSON.stringify(colors));
      formData.append("bestseller", bestseller);

      if (image) {
        formData.append("image", image);
      }

      const response = await axios.put(
        `http://localhost:4000/api/product/update/${selectedProductId}`,
        formData
      );

      if (response.data.success) {
        alert("Product updated successfully");

        setCurrentPage("products");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);

      alert(
        "Something went wrong while updating the product"
      );
    } finally {
      setUpdating(false);
    }
  };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-sm text-slate-500">
          Loading product...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl space-y-8">

      {/* ================= HEADER ================= */}

      <div>
        <button
          type="button"
          onClick={() => setCurrentPage("products")}
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            text-slate-500
            hover:text-blue-500
            transition
            mb-4
          "
        >
          <FiArrowLeft size={15} />

          Back to Products
        </button>

        <h1 className="text-2xl font-semibold text-slate-900">
          Edit Product
        </h1>

        <p className="mt-1.5 text-sm text-slate-500">
          Update your product information
        </p>
      </div>


      {/* ================= FORM ================= */}

      <form
        onSubmit={onSubmitHandler}
        className="space-y-6"
      >

        {/* ================= BASIC INFORMATION ================= */}

        <div className="
          bg-white
          border
          border-slate-200
          rounded-xl
          overflow-hidden
        ">

          <div className="
            px-6
            py-5
            border-b
            border-slate-200
          ">

            <h2 className="
              text-lg
              font-semibold
              text-slate-900
            ">
              Basic Information
            </h2>

            <p className="
              text-sm
              text-slate-400
              mt-1
            ">
              Update the main details of your product.
            </p>

          </div>


          <div className="p-6 space-y-6">

            {/* PRODUCT NAME */}

            <div>

              <label className="
                block
                text-sm
                font-medium
                text-slate-700
                mb-2
              ">
                Product Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              />

            </div>


            {/* DESCRIPTION */}

            <div>

              <label className="
                block
                text-sm
                font-medium
                text-slate-700
                mb-2
              ">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
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
                  outline-none
                  focus:bg-white
                  focus:border-blue-400
                  resize-none
                  transition
                "
                required
              />

            </div>


            {/* PRICE / STOCK / CATEGORY / SUBCATEGORY */}

            <div className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
              gap-5
            ">

              {/* PRICE */}

              <div>

                <label className="
                  block
                  text-sm
                  font-medium
                  text-slate-700
                  mb-2
                ">
                  Price (₦)
                </label>

                <input
                  type="number"
                  value={price}
                  onChange={(e) =>
                    setPrice(e.target.value)
                  }
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
                    outline-none
                    focus:bg-white
                    focus:border-blue-400
                    transition
                  "
                  required
                />

              </div>


              {/* STOCK */}

              <div>

                <label className="
                  block
                  text-sm
                  font-medium
                  text-slate-700
                  mb-2
                ">
                  Stock Quantity
                </label>

                <input
                  type="number"
                  value={stock}
                  onChange={(e) =>
                    setStock(e.target.value)
                  }
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
                    outline-none
                    focus:bg-white
                    focus:border-blue-400
                    transition
                  "
                  required
                />

              </div>


              {/* CATEGORY */}

              <div>

                <label className="
                  block
                  text-sm
                  font-medium
                  text-slate-700
                  mb-2
                ">
                  Category
                </label>

                <input
                  type="text"
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
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
                />

              </div>


              {/* SUB CATEGORY */}

              <div>

                <label className="
                  block
                  text-sm
                  font-medium
                  text-slate-700
                  mb-2
                ">
                  Sub Category
                </label>

                <input
                  type="text"
                  value={subCategory}
                  onChange={(e) =>
                    setSubCategory(e.target.value)
                  }
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
                />

              </div>

            </div>

          </div>

        </div>


        {/* ================= PRODUCT OPTIONS ================= */}

        <div className="
          bg-white
          border
          border-slate-200
          rounded-xl
          overflow-hidden
        ">

          <div className="
            px-6
            py-5
            border-b
            border-slate-200
          ">

            <h2 className="
              text-lg
              font-semibold
              text-slate-900
            ">
              Product Options
            </h2>

            <p className="
              text-sm
              text-slate-400
              mt-1
            ">
              Update colors and product settings.
            </p>

          </div>


          <div className="p-6 space-y-7">

            {/* COLORS */}

            <div>

              <label className="
                block
                text-sm
                font-medium
                text-slate-700
                mb-3
              ">
                Colors
              </label>

              <div className="flex flex-wrap gap-3">

                {colorOptions.map((color) => {

                  const selected =
                    colors.includes(color);

                  return (

                    <button
                      type="button"
                      key={color}
                      onClick={() =>
                        handleColorChange(color)
                      }
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


            {/* BESTSELLER */}

            <div className="
              border-t
              border-slate-100
              pt-6
            ">

              <label className="
                flex
                items-center
                gap-3
                cursor-pointer
              ">

                <input
                  type="checkbox"
                  checked={bestseller}
                  onChange={(e) =>
                    setBestseller(
                      e.target.checked
                    )
                  }
                  className="
                    w-4
                    h-4
                    accent-blue-500
                  "
                />

                <div>

                  <p className="
                    text-sm
                    font-medium
                    text-slate-700
                  ">
                    Add to bestseller
                  </p>

                  <p className="
                    text-xs
                    text-slate-400
                    mt-0.5
                  ">
                    Feature this product as a bestseller in your store.
                  </p>

                </div>

              </label>

            </div>

          </div>

        </div>


        {/* ================= PRODUCT IMAGE ================= */}

        <div className="
          bg-white
          border
          border-slate-200
          rounded-xl
          overflow-hidden
        ">

          <div className="
            px-6
            py-5
            border-b
            border-slate-200
          ">

            <h2 className="
              text-lg
              font-semibold
              text-slate-900
            ">
              Product Image
            </h2>

            <p className="
              text-sm
              text-slate-400
              mt-1
            ">
              Change the main image for this product.
            </p>

          </div>


          <div className="p-6">

            {/* CURRENT IMAGE */}

            {currentImage && !image && (

              <div className="mb-5">

                <p className="
                  text-sm
                  font-medium
                  text-slate-700
                  mb-3
                ">
                  Current Image
                </p>

                <img
                  src={currentImage}
                  alt={name}
                  className="
                    w-32
                    h-32
                    object-cover
                    rounded-xl
                    border
                    border-slate-200
                  "
                />

              </div>

            )}


            {/* NEW IMAGE */}

            {image && (

              <div className="mb-5">

                <p className="
                  text-sm
                  font-medium
                  text-slate-700
                  mb-3
                ">
                  New Image
                </p>

                <img
                  src={URL.createObjectURL(image)}
                  alt="New product"
                  className="
                    w-32
                    h-32
                    object-cover
                    rounded-xl
                    border
                    border-slate-200
                  "
                />

              </div>

            )}


            <label
              htmlFor="product-image"
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


              <p className="
                text-sm
                font-medium
                text-slate-700
              ">
                {image
                  ? image.name
                  : "Click to change image"}
              </p>


              <p className="
                text-xs
                text-slate-400
                mt-1
              ">
                PNG, JPG or JPEG
              </p>


              <input
                id="product-image"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage(e.target.files[0])
                }
                className="hidden"
              />

            </label>

          </div>

        </div>


        {/* ================= BUTTONS ================= */}

        <div className="
          flex
          items-center
          justify-end
          gap-3
        ">

          <button
            type="button"
            onClick={() =>
              setCurrentPage("products")
            }
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
            disabled={updating}
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
            {updating
              ? "Saving Changes..."
              : "Save Changes"}
          </button>

        </div>

      </form>

    </div>
  );
};

export default EditProduct;
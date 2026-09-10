import React, {
  useContext,
  useMemo,
  useState,
  useEffect,
  useRef,
} from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [subCategoryOpen, setSubCategoryOpen] = useState(false);

  const [sortType, setSortType] = useState("relevant");

  const categoryRef = useRef(null);
  const subCategoryRef = useRef(null);

  // ================= FILTER OPTIONS =================

  const categories = [
    "Men",
    "Women",
    "Unisex",
  ];

  const subCategories = [
    "Necklace",
    "Bracelet",
    "Cufflinks",
    "Rings",
  ];

  // ================= CLOSE DROPDOWNS =================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target)
      ) {
        setCategoryOpen(false);
      }

      if (
        subCategoryRef.current &&
        !subCategoryRef.current.contains(event.target)
      ) {
        setSubCategoryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // ================= TOGGLE CATEGORY =================

  const toggleCategory = (value) => {
    if (category.includes(value)) {
      setCategory((prev) =>
        prev.filter((item) => item !== value)
      );
    } else {
      setCategory((prev) => [...prev, value]);
    }
  };

  // ================= TOGGLE SUBCATEGORY =================

  const toggleSubCategory = (value) => {
    if (subCategory.includes(value)) {
      setSubCategory((prev) =>
        prev.filter((item) => item !== value)
      );
    } else {
      setSubCategory((prev) => [...prev, value]);
    }
  };

  // ================= FILTER + SORT =================

  const filterProducts = useMemo(() => {
    let productsCopy = [...products];

    // Search
    if (showSearch && search.trim()) {
      productsCopy = productsCopy.filter((item) =>
        item.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    // Category
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    // Subcategory
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    // Sort
    if (sortType === "low-high") {
      productsCopy.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      productsCopy.sort((a, b) => b.price - a.price);
    }

    return productsCopy;
  }, [
    products,
    search,
    showSearch,
    category,
    subCategory,
    sortType,
  ]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">

      {/* ================= FILTERS ================= */}

      <div className="w-full sm:w-60">

        {/* Filter heading */}
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS

          <img
            className={`h-3 sm:hidden transition-transform ${
              showFilter ? "rotate-90" : ""
            }`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* ================= CATEGORY + SUBCATEGORY ================= */}

        <div
          className={`flex gap-2 mt-5 ${
            showFilter ? "" : "hidden"
          } sm:flex`}
        >

          {/* ================= CATEGORY ================= */}

          <div
            ref={categoryRef}
            className="relative flex-1"
          >
            <button
              type="button"
              onClick={() => {
                setCategoryOpen(!categoryOpen);
                setSubCategoryOpen(false);
              }}
              className="w-full border border-gray-300 px-2.5 py-2 text-xs flex items-center justify-between bg-white"
            >
              <span className="font-medium text-gray-700">
                CATEGORY
              </span>

              <img
                src={assets.dropdown_icon}
                alt=""
                className={`w-2.5 transition-transform ${
                  categoryOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Category dropdown */}
            {categoryOpen && (
              <div className="absolute z-30 top-full left-0 w-full mt-1 bg-white border border-gray-200 shadow-md">
                {categories.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 px-2.5 py-2 text-xs text-gray-600 cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={category.includes(item)}
                      onChange={() =>
                        toggleCategory(item)
                      }
                      className="w-3 h-3"
                    />

                    <span>{item}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* ================= SUBCATEGORY ================= */}

          <div
            ref={subCategoryRef}
            className="relative flex-1"
          >
            <button
              type="button"
              onClick={() => {
                setSubCategoryOpen(!subCategoryOpen);
                setCategoryOpen(false);
              }}
              className="w-full border border-gray-300 px-2.5 py-2 text-xs flex items-center justify-between bg-white"
            >
              <span className="font-medium text-gray-700">
                SUBCATEGORY
              </span>

              <img
                src={assets.dropdown_icon}
                alt=""
                className={`w-2.5 transition-transform ${
                  subCategoryOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Subcategory dropdown */}
            {subCategoryOpen && (
              <div className="absolute z-30 top-full left-0 w-full mt-1 bg-white border border-gray-200 shadow-md">
                {subCategories.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 px-2.5 py-2 text-xs text-gray-600 cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={subCategory.includes(item)}
                      onChange={() =>
                        toggleSubCategory(item)
                      }
                      className="w-3 h-3"
                    />

                    <span>{item}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ================= PRODUCTS ================= */}

      <div className="flex-1">

        {/* Heading + Sort */}
        <div className="flex justify-between items-center text-base sm:text-2xl mb-4">

          <Title
            text1="ALL"
            text2="COLLECTION"
          />

          <select
            value={sortType}
            onChange={(e) =>
              setSortType(e.target.value)
            }
            className="border border-gray-300 text-xs sm:text-sm px-2 py-2 outline-none"
          >
            <option value="relevant">
              Sort by: Relevant
            </option>

            <option value="low-high">
              Sort by: Low to High
            </option>

            <option value="high-low">
              Sort by: High to Low
            </option>
          </select>

        </div>

        {/* ================= PRODUCT GRID ================= */}

        {filterProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">

            {filterProducts.map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            ))}

          </div>
        ) : (
          <div className="py-20 text-center text-gray-500">

            <p className="text-lg">
              No products found.
            </p>

            <p className="text-sm mt-2">
              Try changing your search or filters.
            </p>

          </div>
        )}

      </div>
    </div>
  );
};

export default Collection;

import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) =>
        prev.filter((item) => item !== e.target.value)
      );
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  // derive filtered and sorted products without causing synchronous setState inside effects
  const filteredAndSorted = React.useMemo(() => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    switch (sortType) {
      case "low-high":
        return productsCopy.sort((a, b) => a.price - b.price);
      case "high-low":
        return productsCopy.sort((a, b) => b.price - a.price);
      default:
        return productsCopy;
    }
  }, [products, showSearch, search, category, subCategory, sortType]);

  useEffect(() => {
    setFilterProducts(filteredAndSorted);
  }, [filteredAndSorted]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filters */}
      <div className="w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-blue-600 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORY</p>

          <div className="flex flex-col gap-2 text-sm font-light text-blue-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Necklace"
                onChange={toggleCategory}
              />
              Necklace
            </p>

            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Bracelet"
                onChange={toggleCategory}
              />
              Bracelet
            </p>

            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Ring"
                onChange={toggleCategory}
              />
              Ring
            </p>

            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Earrings"
                onChange={toggleCategory}
              />
              Earrings
            </p>

            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Grills"
                onChange={toggleCategory}
              />
              Grills
            </p>

            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Wallet Chain"
                onChange={toggleCategory}
              />
              Wallet Chain
            </p>
          </div>
        </div>

        {/* Subcategory Filter */}
        <div
          className={`border border-blue-600 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">SUBCATEGORY</p>

          <div className="flex flex-col gap-2 text-sm font-light text-blue-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Silver"
                onChange={toggleSubCategory}
              />
              Silver
            </p>

            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Gold"
                onChange={toggleSubCategory}
              />
              Gold
            </p>

            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Stainless Steel"
                onChange={toggleSubCategory}
              />
              Stainless Steel
            </p>

            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Chrome Hearts"
                onChange={toggleSubCategory}
              />
              Chrome Hearts
            </p>

            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Zirconia"
                onChange={toggleSubCategory}
              />
              Zirconia
            </p>

            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Heart"
                onChange={toggleSubCategory}
              />
              Heart
            </p>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTION"} />

          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

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
      </div>
    </div>
  );
};

export default Collection;
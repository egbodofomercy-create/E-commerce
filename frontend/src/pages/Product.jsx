import React, { useContext, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();

  const {
    products,
    addToCart,
    currency,
  } = useContext(ShopContext);

  const [image, setImage] = useState("");
  const [color, setColor] = useState("");

  // Find the current product directly from the products list.
  const productData = useMemo(() => {
    return products.find((item) => item._id === productId);
  }, [products, productId]);

  // Set the first product image when the product changes.
  const selectedImage =
    image && productData?.image?.includes(image)
      ? image
      : productData?.image?.[0] || "";

  // Loading state
  if (!products.length) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading product...
      </div>
    );
  }

  // Product not found
  if (!productData) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-medium">
          Product not found
        </h2>

        <p className="text-gray-500 mt-2">
          This product may have been removed or is no longer available.
        </p>
      </div>
    );
  }

  const isOutOfStock = productData.stock <= 0;

  return (
    <div className="border-t pt-10 transition-opacity ease-in duration-500 opacity-100">

      {/* ================= PRODUCT SECTION ================= */}
      <div className="flex gap-12 flex-col sm:flex-row">

        {/* ================= PRODUCT IMAGES ================= */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">

          {/* Thumbnails */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-normal sm:w-[18.7%] w-full gap-2">

            {productData.image?.map((img, index) => (
              <img
                key={index}
                onClick={() => setImage(img)}
                src={img}
                alt={`${productData.name} ${index + 1}`}
                className={`w-[24%] sm:w-full sm:mb-1 flex-shrink-0 cursor-pointer border ${
                  selectedImage === img
                    ? "border-black"
                    : "border-transparent"
                }`}
              />
            ))}

          </div>

          {/* Main Image */}
          <div className="w-full sm:w-[80%]">
            <img
              className="w-full h-auto"
              src={selectedImage}
              alt={productData.name}
            />
          </div>

        </div>

        {/* ================= PRODUCT INFO ================= */}
        <div className="flex-1">

          {/* Product Name */}
          <h1 className="font-medium text-2xl mt-2">
            {productData.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2 text-sm">
            <p>⭐⭐⭐⭐☆</p>
            <p className="pl-2 text-gray-500">
              (0 reviews)
            </p>
          </div>

          {/* Price */}
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {Number(productData.price).toLocaleString()}
          </p>

          {/* Description */}
          <p className="mt-5 text-gray-500 md:w-4/5 leading-relaxed">
            {productData.description}
          </p>

          {/* ================= STOCK ================= */}
          <div className="mt-5">

            {isOutOfStock ? (
              <p className="text-red-600 text-sm font-medium">
                Out of Stock
              </p>
            ) : productData.stock <= 5 ? (
              <p className="text-orange-600 text-sm font-medium">
                Only {productData.stock} left in stock
              </p>
            ) : (
              <p className="text-green-600 text-sm font-medium">
                In Stock
              </p>
            )}

          </div>

          {/* ================= COLOR ================= */}
          {productData.color?.length > 0 && (
            <div className="flex flex-col gap-4 my-8">

              <p className="font-medium">
                Select Color
              </p>

              <div className="flex gap-2 flex-wrap">

                {productData.color.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setColor(item)}
                    className={`border py-2 px-5 text-sm transition ${
                      color === item
                        ? "border-black bg-black text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:border-black"
                    }`}
                  >
                    {item}
                  </button>
                ))}

              </div>

              {!color && (
                <p className="text-xs text-gray-400">
                  Please select a color before adding to cart.
                </p>
              )}

            </div>
          )}

          {/* ================= ADD TO CART ================= */}
          <button
            onClick={() => {
              if (isOutOfStock) return;

              if (productData.color?.length > 0 && !color) {
                return;
              }

              addToCart(productData._id, color);
            }}
            disabled={isOutOfStock}
            className={`px-8 py-3 text-sm transition ${
              isOutOfStock
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800 active:bg-gray-700"
            }`}
          >
            {isOutOfStock ? "OUT OF STOCK" : "ADD TO CART"}
          </button>

          <hr className="mt-8 sm:w-4/5" />

          {/* ================= PRODUCT DETAILS ================= */}
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Secure packaging and delivery.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>

          {/* ================= DESCRIPTION & REVIEWS ================= */}
          <div className="mt-20">

            <div className="flex">

              <b className="border px-5 py-3 text-sm">
                Description
              </b>

              <p className="border px-5 py-3 text-sm text-gray-500">
                Reviews (0)
              </p>

            </div>

            <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500 leading-relaxed">

              <p>
                Discover timeless elegance with our beautifully
                crafted jewelry, designed to complement every
                occasion. Made with high-quality materials and
                attention to detail, each piece combines
                durability, style, and sophistication.
              </p>

              <p>
                Whether you're dressing up for a special event
                or adding a touch of luxury to your everyday
                look, our collection offers the perfect
                accessory. Enjoy premium craftsmanship, secure
                packaging, and a seamless shopping experience
                with every purchase.
              </p>

            </div>

          </div>

        </div>
      </div>

      {/* ================= RELATED PRODUCTS ================= */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
        currentProductId={productData._id}
      />

    </div>
  );
};

export default Product;
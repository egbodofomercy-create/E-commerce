import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [color, setColor] = useState("");



  useEffect(() => {
    const fetchProductData = async () => {
      const product = products.find((item) => item._id === productId);

    
      if (product) {
  setProductData(product);
  setImage(product.image[0]);
  setColor("");
  
}
    };

    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className ='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
       {/*  Product data  */}


      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
          {/* Product images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-normal sm:w-[18.7%] w-full'>

            {productData.image.map((img, index) => (
              <img onClick={()=>setImage(img)} src={img} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
            ))}


      </div>
        <div className="w-full sm:w-[80%]">

              <img className="w-full h-auto" src={image} alt={productData.name}/>
              
           </div>
        </div>

       {/*  -------product info----------  */}
{/* Product Info */}
<div className="flex-1">
  <h1 className="font-medium text-2xl mt-2">
    {productData.name}
  </h1>

  {/* Rating */}
  <div className="flex items-center gap-1 mt-2">
    <p>⭐⭐⭐⭐☆</p>
    <p className="pl-2">(157)</p>
  </div>

  {/* Price */}
  <p className="mt-5 text-3xl font-medium">
    ₦{productData.price}
  </p>

  {/* Description */}
  <p className="mt-5 text-gray-500 md:w-4/5">
    {productData.description}
  </p>

  {/* Color */}
  <div className="flex flex-col gap-4 my-8">
    <p>Color</p>

    <div className="flex gap-2">
      {productData.color.map((item, index) => (
        <button
          key={index}
          onClick={() => setColor(item)}
          className={`border py-2 px-4 ${
            color === item
              ? "border-black bg-blue-200"
              : "bg-gray-100"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  </div>

  {/* Add to Cart */}
  <button
  onClick={() => addToCart(productData._id, color)}
  className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
>
  ADD TO CART
</button>
  <hr className="mt-8 sm:w-4/5" />

  {/* Product Details */}
  <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
    <p>100% Original product.</p>
    <p>Cash on delivery is not available on this product.</p>
    <p>Easy return and exchange policy within 7 days.</p>
  </div>

{/* Description & Reviews */}
<div className="mt-20">
  <div className="flex">
    <b className="border px-5 py-3 text-sm">Description</b>
    <p className="border px-5 py-3 text-sm">Reviews (157)</p>
  </div>

  <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
    <p>
      Discover timeless elegance with our beautifully crafted jewelry,
      designed to complement every occasion. Made with high-quality
      materials and attention to detail, each piece combines durability,
      style, and sophistication.
    </p>

    <p>
      Whether you're dressing up for a special event or adding a touch of
      luxury to your everyday look, our collection offers the perfect
      accessory. Enjoy premium craftsmanship, secure packaging, and a
      seamless shopping experience with every purchase.
    </p>
  </div>
</div>

{/* Close Product Info */}
</div>

{/* Close Product Section */}
</div>

{/* Related Products */}
<RelatedProducts
  category={productData.category}
  subCategory={productData.subCategory}
  currentProductId={productData._id}
/>

</div>
) : (
<div className="opacity-0"></div>
);
};
export default Product;
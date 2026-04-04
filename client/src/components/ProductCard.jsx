import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const [count, setCount] = React.useState(0);
  const { currency, addtocart, cartitems, removeFromCart, navigate } =
    useAppContext();

  return (
    product && (
      <div onClick={()=> {navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0,0)}} className="border border-gray-300 rounded-md px-3 py-3 bg-white min-w-[190px] max-w-[190px] w-full">
        <div className="group cursor-pointer flex items-center justify-center">
          <img
            className="group-hover:scale-105 transition max-w-[90px] sm:max-w-[100px]"
            src={product.image[0]}
            alt={product.name}
          />
        </div>
        <div className="text-gray-500/70 text-sm mt-2">
          <p>{product.category}</p>
          <p className="text-gray-700 font-medium text-base truncate">
            {product.name}
          </p>
          <div className="flex items-center gap-0.5 mt-1">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  className="w-4 h-4"
                />
              ))}
            <p className="text-xs">(4)</p>
          </div>
          <div className="flex items-end justify-between mt-3">
            <p className="text-[15px] font-medium text-primary">
              {currency} {product.offerPrice}
              <span className="text-gray-500/60 text-sm line-through ml-1">
                {currency}
                {product.price}
              </span>
            </p>
            <div onClick={(e) => e.stopPropagation()} className="text-primary">
              {!cartitems?.[product._id] ? (
                <button
                  className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/40 w-[72px] h-[30px] text-sm rounded cursor-pointer"
                  onClick={() => addtocart(product._id)}
                >
                  <img
                    src={assets.cart_icon}
                    className="w-4 h-4"
                    alt="cart_icon"
                  />
                  Add
                </button>
              ) : (
                <div className="flex items-center justify-center gap-1 w-[72px] h-[30px] bg-primary/25 rounded text-sm select-none">
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="px-1"
                  >
                    -
                  </button>
                  <span className="w-5 text-center">
                    {cartitems[product._id]}
                  </span>
                  <button
                    onClick={() => addtocart(product._id)}
                    className="px-1"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;

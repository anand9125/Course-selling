import  { useEffect } from "react";
import { useRecoilState } from "recoil";
import { cartState } from "../../store/cart/atom";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface Courses {
  id: string;
  title: string;
  courseId: string;
  price: number;
  actualPrice: number;
  description: string;
  categoryId: string;
  mentorId: string;
  image: string;
  index: number;
}

function Checkout() {
  const [cartItems, setCartItems] = useRecoilState<Courses[]>(cartState);
  const navigate = useNavigate();

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Save cart items to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Clear Cart with confirmation
  const handleClearFromCart = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Your cart will be emptied!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, clear it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setCartItems([]);
        localStorage.removeItem("cartItems");
        Swal.fire("Cleared!", "Your cart is now empty.", "success");
      }
    });
  };

  // Remove single item from cart
  const handleRemoveFromCart = (product: Courses) => {
    const updatedCart = cartItems.filter((item) => item.id !== product.id);
    setCartItems(updatedCart);
  };

  // Calculate total
  const Subtotal = cartItems.reduce((acc, curr) => acc + curr.price, 0);

  // Prevent checkout if cart is empty
  const handleClick = (event: any) => {
    if (cartItems.length === 0) {
      event.preventDefault();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Your cart is empty!",
        footer: '<a href="#">Please add items before proceeding to checkout.</a>',
      });
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl p-6 rounded-lg">
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Shopping Cart</h2>
          {cartItems.length > 0 && (
            <button
              type="button"
              onClick={handleClearFromCart}
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
            >
              Clear Cart
            </button>
          )}
        </div>

        {/* Cart Items List */}
        <div className="mt-8">
          {cartItems.length > 0 ? (
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {cartItems.map((product) => (
                <li key={product.id} className="flex py-6 items-center">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      alt={product.title}
                      src={product.image}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                         {/* @ts-ignore */}
                        <Link to="/">{product.title}</Link>
                      </h3>
                      <p className="sm:ml-4">${product.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      <strong>Category:</strong> {product.title}
                    </p>
                    <div className="flex justify-between mt-2 text-sm">
                      <p className="text-gray-500">
                        <strong>Qty:</strong> 1
                      </p>
                      <button
                        type="button"
                        onClick={() => handleRemoveFromCart(product)}
                        className="text-red-500 hover:text-red-700 transition-all"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500 text-lg">Your cart is empty.</p>
             {/* @ts-ignore */}
              <Link
                to="/"
                className="mt-4 inline-block bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition-all"
              >
                Browse Courses
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Cart Summary */}
      {cartItems.length > 0 && (
        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${Subtotal.toFixed(2)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>

          <div className="mt-6">
            <button
              onClick={handleClick}
              className={`w-full px-6 py-3 rounded-md text-white font-medium transition-all ${
                cartItems.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>

          <div className="mt-6 text-center">
            {/* @ts-ignore */}
            <Link to="/" className="text-indigo-600 hover:text-indigo-500">
              &larr; Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;

import  { useEffect, useState } from "react";
import {  useRecoilState } from "recoil";
import { cartState } from "../../store/cart/atom";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useUserStore } from "../../store/useUserStore";
import axios from "axios";
import { userEndPoint } from "../../config";
import toast from "react-hot-toast";
import Spinner from "../../componets/Skeleton/ButtonSkeleton";

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

function CartItem() {
  const [cartItems, setCartItems] = useRecoilState<Courses[]>(cartState);
  const{walletBalance}=useUserStore()
  const navigate = useNavigate();
  const [checkbox,setCheckbox]= useState(false)
  const[referralCode,setReferralCode]=useState("")
  const[isValid,setIsValid] = useState(false)
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const[isLoading,setIsLoading]=useState(false)
 
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckbox(event.target.checked);
  }
  console.log(userData?.id)

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  
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

  
  const handleRemoveFromCart = (product: Courses) => {
    const updatedCart = cartItems.filter((item) => item.id !== product.id);
    setCartItems(updatedCart);
  };

 
 
  
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

  const handleApplyReferralCode = async() => {
    if(!referralCode){
      toast.error("Provide referral code")
      return
    }
    
    if(!userData.id){
      toast.error("User not found please login")
      return
    }
    setIsLoading(true)
    const response = await axios.post(
      `${userEndPoint}/user/verify/referralCode`,
      {
        referralCode: referralCode,
        userId: userData.id,
      }
    ); 
    console.log(response.status)
   
  
    if(response.status==200){
      setIsLoading(false)
      toast.success("Referral code applied")
      setIsValid(true)
    }
    else if(response.status==401){
      setIsLoading(false)
        toast.error("Please provide correct referral code")
      
    }
  }
  const Subtotal = cartItems.reduce((acc, curr) => acc + curr.price, 0);
  let Total = Subtotal + 5; 
  if (checkbox) {
      Total -= walletBalance ?? 0; 
  }
  if (isValid) {
      Total -= 20; 
  }
  return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {cartItems.length === 0 ? (
          // Empty Cart State Spanning Full Width
          <div className="flex flex-col items-center justify-center h-full py-12">
            {/* Optional illustration */}
           
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Your Cart is Empty
            </h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven’t added any items to your cart yet.
            </p>
            <Link
              to="/"
              className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          // Cart with items: Two sections – Cart Items and Summary
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8">
            {/* Shopping Cart Section */}
            <div className="col-span-2 bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Shopping Cart
                </h2>
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
              <div className="mt-8 overflow-y-auto max-h-96">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cartItems.map((product) => (
                    <li key={product.id} className="flex py-6">
                      <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          loading="lazy"
                          alt={product.title}
                          src={product.image}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div className="flex justify-between items-center">
                          <h3 className="text-base font-medium text-gray-900">
                            <Link to="/">{product.title}</Link>
                          </h3>
                          <p className="text-base text-gray-900">₹{product.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.description}
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
              </div>

              {/* Referral Code Section */}
              <div className="mt-8">
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    placeholder="Enter Referral Code..."
                    className="flex-1 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 border border-gray-300 
                    focus:ring-2 focus:ring-gray-600 focus:outline-none transition-shadow"
                    onChange={(e) => setReferralCode(e.target.value)}
                  />
                  <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                   onClick={()=> handleApplyReferralCode()}>
                    {isLoading ? <Spinner size={20} className="mx-auto" /> : "Apply"}
                  </button>
                </div>
                <div className="pt-3">
                  <h2 className="text-xl font-bold text-gray-800">
                    Redeem Your Referral Code
                  </h2>
                  <p className="mt-2 text-gray-600">
                    Enter your referral code above and get ₹20 discout on your first purchase.
                  </p>
                </div>
              </div>
            </div>

            {/* Cart Summary Section */}
            <div className="bg-white p-6 rounded-lg shadow flex flex-col">
              <div className="border border-gray-200 bg-gray-100 p-5 rounded-md">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>₹{Subtotal.toFixed(2)}</p>
                </div>
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Total</p>
                    <p>₹{Total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Shipping and taxes calculated
              </p>
              <div className="flex justify-center items-center mt-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checkbox}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                  <span className="text-gray-700">Add wallet balance</span>
                </label>
              </div>
              <button
                onClick={handleClick}
                className={`mt-4 w-full px-6 py-3 rounded-md text-white font-medium transition-all ${
                  cartItems.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
              <div className="mt-6 text-center">
                <Link to="/" className="text-indigo-600 hover:text-indigo-500">
                  &larr; Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

export default CartItem;

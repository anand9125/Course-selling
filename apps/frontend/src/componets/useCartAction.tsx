
import { useRecoilState } from 'recoil'
import { cartState } from '../store/cart/atom'

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

function useCartAction() {
    // Creating a custom hook for encapsulation and reusability
    const [cartItems, setCartItems] = useRecoilState<Courses[]>(cartState);

    const addToCart = (item:Courses) => {
        const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
        if (!existingItem) {
            const updatedCart = [...cartItems, item];
            setCartItems(updatedCart);
        }
    };

    return { addToCart };
}

export default useCartAction;

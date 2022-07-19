import React, {
	createContext,
	useContext,
	useState,
	PropsWithChildren,
} from "react";
//define type of cart Items
type cartItemsType = {
	title: string;
	description: string;
	price: number;
	quantity: number;
	slug: string;
	image: {
		data: {
			attributes: {
				formats: {
					small: { url: string; name: string };
					thumbnail: { url: string; name: string };
				};
			};
		};
	};
};
//define type of context
interface AppContextInterface {
	qty: number;
	increaseQty: () => void;
	decreaseQty: () => void;
	cartItems: cartItemsType[];
	setCartItems: React.Dispatch<React.SetStateAction<cartItemsType[]>>;
	onAdd: (product: cartItemsType, quantity: number) => void;
	onRemove: (product: cartItemsType, quantity: number) => void;
	showCart: boolean;
	setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
	totalQty: number;
	totalPrice: number;
	setQuty: React.Dispatch<React.SetStateAction<number>>;
}

const ShopContext = createContext<AppContextInterface | null>(null);

export const StateContext = (props: PropsWithChildren<{}>) => {
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useState<cartItemsType[]>([]);
	const [qty, setQuty] = useState(1);
	const [totalQty, setTotalQty] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);

	//increase product qty
	const increaseQty = () => {
		setQuty((prev) => prev + 1);
	};
	//decrease product qty
	const decreaseQty = () => {
		setQuty((prev) => {
			if (prev < 2) {
				return 1;
			}
			return prev - 1;
		});
	};
	//Add product to Cart
	const onAdd = (product: cartItemsType, quantity: number) => {
		//increate total qty
		setTotalQty((prev) => prev + quantity);
		//increate total price
		setTotalPrice((prev) => prev + product.price * quantity);
		//CHeck if the product is alredy in the cart
		const exist = cartItems?.find((item) => item.slug === product.slug);
		if (exist) {
			const newCartItems = cartItems?.map((item) =>
				item.slug === product.slug
					? { ...exist, quantity: exist.quantity + quantity }
					: item
			);
			setCartItems(newCartItems);
		} else {
			if (cartItems) {
				setCartItems([
					...cartItems,
					{ ...product, quantity: quantity },
				]);
			} else {
				product.quantity = quantity;
				setCartItems([product]);
			}
		}
	};
	const onRemove = (product: cartItemsType, quantity: number) => {
		//Decrease total qty
		setTotalQty((prev) => prev - 1);
		//increate total price
		setTotalPrice((prev) => prev - product.price);
		//CHeck if the product is alredy in the cart
		const exist = cartItems?.find((item) => item.slug === product.slug);
		if (exist?.quantity === 1) {
			setCartItems(
				cartItems.filter((ittem) => ittem.slug !== product.slug)
			);
		} else if (exist) {
			const newCartItems = cartItems?.map((item) =>
				item.slug === product.slug
					? { ...exist, quantity: exist.quantity - quantity }
					: item
			);
			setCartItems(newCartItems);
		}
	};

	return (
		<ShopContext.Provider
			value={{
				qty,
				increaseQty,
				decreaseQty,
				cartItems,
				setCartItems,
				onAdd,
				onRemove,
				showCart,
				setShowCart,
				totalQty,
				totalPrice,
				setQuty,
			}}>
			{props.children}
		</ShopContext.Provider>
	);
};

export const useStateContext = () => useContext(ShopContext);

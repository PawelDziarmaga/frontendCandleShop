//Import State
import { useStateContext } from "../../lib/context";
//Import Stripe
import getStripe from "../../lib/getStripe";
//import lib
import formatMoney from "../../lib/formatMoney";
//Import Style
import {
	CardWrapper,
	CardStyle,
	OneCartStyle,
	CardsStyle,
	CardInfoStyle,
	EmptyStyle,
	Checkout,
} from "./Cart.styles";
//Import Animations
import { cardStyleAnimation, cardsStyleAnimation } from "./Cart.styles";
import { Quantity } from "../../styles/productsDetails.style";
//import react icons
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";

const Cart = () => {
	const contextItems = useStateContext();

	//Payment
	const handleCheckout = async () => {
		const stripe = await getStripe();
		const response = await fetch("/api/stripe", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(contextItems?.cartItems),
		});
		const data = await response.json();

		await stripe?.redirectToCheckout({ sessionId: data.id });
	};

	return (
		<CardWrapper
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			onClick={() => contextItems?.setShowCart(false)}>
			<CardStyle
				initial={{ x: "50%" }}
				animate={{ x: 0 }}
				exit={{ x: "50%" }}
				transition={{ type: "tween" }}
				onClick={(e: any) => e.stopPropagation()}>
				{contextItems?.cartItems && contextItems?.cartItems.length < 1 && (
					<EmptyStyle
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.2 }}
						onClick={() => contextItems?.setShowCart(false)}>
						<h3>You have more shopping to do</h3>
						<FaShoppingCart />
					</EmptyStyle>
				)}
				<CardsStyle
					variants={cardsStyleAnimation}
					initial='hidden'
					animate='show'
					layout>
					{contextItems?.cartItems &&
						contextItems?.cartItems.length >= 1 &&
						contextItems?.cartItems.map((item) => {
							const { name, url } =
								item.image.data.attributes.formats.thumbnail;

							return (
								<OneCartStyle
									variants={cardStyleAnimation}
									layout
									key={item.slug}>
									<img src={url} alt={name} />
									<CardInfoStyle>
										<h3>{item.title}</h3>
										<h3>{item.price} zł</h3>
										<Quantity>
											<span>Quantity</span>
											<button
												onClick={() =>
													contextItems.onRemove(
														item,
														1
													)
												}>
												<AiOutlineMinusCircle />
											</button>
											<p>{item.quantity}</p>
											<button
												onClick={() =>
													contextItems.onAdd(item, 1)
												}>
												<AiOutlinePlusCircle />
											</button>
										</Quantity>
									</CardInfoStyle>
								</OneCartStyle>
							);
						})}
				</CardsStyle>

				{contextItems?.cartItems &&
					contextItems?.cartItems.length >= 1 && (
						<Checkout layout>
							<h3>
								Subtotal:{" "}
								{formatMoney(contextItems.totalPrice * 100)}
							</h3>
							<button onClick={handleCheckout}>Purchase</button>
						</Checkout>
					)}
			</CardStyle>
		</CardWrapper>
	);
};

export default Cart;

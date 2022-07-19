import { useRouter } from "next/router";

import {
	Wrapper,
	Card,
	InfoWrapper,
	Address,
	OrderInfo,
} from "../styles/success";
// STRIPE_SECRET_KEY
const stripe = require("stripe")(
	`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY} `
);

export async function getServerSideProps(params: {
	query: { session_id: string };
}) {
	const order = await stripe.checkout.sessions.retrieve(
		params.query.session_id,
		{
			expand: ["line_items"],
		}
	);
	return { props: { order } };
}
const Success = (props: {
	order: {
		customer_details: {
			email: string;
			address: {
				city: string;
				line1: string;
				line2: string;
				postal_code: string;
			};
		};
		line_items: {
			data: {
				description: string;
				quantity: number;
				price: { unit_amount: number };
				id: string;
			}[];
		};
	};
}) => {
	const route = useRouter();
	return (
		<Wrapper>
			<Card
				animate={{
					opacity: 1,
					scale: 1,
					transition: { duration: 0.75 },
				}}
				initial={{ opacity: 0, scale: 0.75 }}>
				<h1>Thank you for your order!</h1>
				<h2>A confirmation email has been sent to</h2>
				<h2>{props.order.customer_details.email}</h2>
				<InfoWrapper>
					<Address>
						<h3>Adress</h3>
						<p>{props.order.customer_details.address.city}</p>
						<p>
							{props.order.customer_details.address.postal_code}
						</p>
						<p>
							{props.order.customer_details.address.line1}{" "}
							{props.order.customer_details.address.line2}
						</p>
					</Address>
					<OrderInfo>
						<h3>Products</h3>
						{props.order.line_items.data.map(
							(item: {
								description: string;
								quantity: number;
								price: { unit_amount: number };
								id: string;
							}) => (
								<div key={item.id}>
									<p>Product: {item.description}</p>
									<p>Qty: {item.quantity}</p>
									<p>Price: {item.price.unit_amount / 100}</p>
								</div>
							)
						)}
					</OrderInfo>
				</InfoWrapper>
				<button onClick={() => route.push("/")}>
					Continue Shopping
				</button>
			</Card>
		</Wrapper>
	);
};

export default Success;

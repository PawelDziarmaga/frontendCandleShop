import { useRouter } from "next/router";
//Import auth)
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
//import style
import styled from "styled-components";
//import lib
import formatMoney from "../lib/formatMoney";

// Specify Stripe secret api key here
const stripe = require("stripe")(
	`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps(ctx) {
		// access the user session
		const session = getSession(ctx.req, ctx.res);
		const stripeId =
			session?.user[`${process.env.BASE_URL}/stripe_customer_id`];
		const paymentIntents = await stripe.paymentIntents.list({
			customer: stripeId,
		});
		return { props: { orders: paymentIntents.data } };
	},
});

export default function Profile(props: {
	user: { name: string; email: string };
	orders: { id: string; amount: number; receipt_email: string }[];
}) {
	const route = useRouter();
	console.log(props.orders);
	return (
		props.user && (
			<div>
				<h2>{props.user.name}</h2>
				<p>{props.user.email}</p>
				<div>
					{props.orders.map((order) => {
						return (
							<Order key={order.id}>
								<div>
									<h1>Order Number: {order.id}</h1>
									<h2>{formatMoney(order.amount)}</h2>
								</div>
								<div>
									<h1>Receipt Email {props.user.email}</h1>
								</div>
							</Order>
						);
					})}
				</div>
				<button onClick={() => route.push("/api/auth/logout")}>
					Log out
				</button>
			</div>
		)
	);
}

const Order = styled.div`
	background: white;
	margin: 2rem 0rem;
	padding: 3rem;
	display: flex;
	justify-content: space-between;
	h1 {
		font-size: 1rem;
		color: var(--primary);
		margin-bottom: 0.5rem;
	}
	h2 {
		font-size: 1rem;
		color: var(--secondary);
	}
`;

import Stripe from "stripe";

import { getSession, Session } from "@auth0/nextjs-auth0";
import { IncomingMessage } from "http";
import { NextApiRequest } from "next";

type itemsType = {
	title: string;
	description: string;
	price: number;
	quantity: number;
	slug: string;
	image: {
		data: {
			attributes: {
				formats: { thumbnail: { url: string; name: string } };
			};
		};
	};
};

const stripe = new Stripe(
	`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string}`,
	{ apiVersion: "2020-08-27" }
);
//{ method: string; body: itemsType[]; headers: { origin: any } }
export default async function handler(
	req: { method: string; body: itemsType[]; headers: { origin: any } },
	res: any
) {
	const getUser = getSession(req as IncomingMessage | NextApiRequest, res);
	const user = getUser?.user;
	if (user) {
		const stripeId = user["http://localhost:3000/stripe_customer_id"];
		if (req.method === "POST") {
			try {
				//Create Checkout Session

				const session = await stripe.checkout.sessions.create({
					submit_type: "pay",
					customer: stripeId,
					mode: "payment",
					payment_method_types: ["card"],
					shipping_address_collection: { allowed_countries: ["PL"] },
					allow_promotion_codes: true,
					shipping_options: [
						{ shipping_rate: "shr_1LLUkQL5Mz2wiejPeRZxCEb3" },
					],

					line_items: req.body.map((item: itemsType) => {
						return {
							price_data: {
								currency: "pln",
								product_data: {
									name: item.title,
									images: [
										item.image.data.attributes.formats
											.thumbnail.url,
									],
								},
								unit_amount: item.price * 100,
							},
							quantity: item.quantity,
						};
					}),
					success_url: `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
					cancel_url: `${req.headers.origin}/canceled`,
				});

				res.status(200).json(session);
			} catch (error: any) {
				res.status(error.statusCode || 500).json(error.message);
			}
		}
	} else {
		if (req.method === "POST") {
			try {
				//Create Checkout Session

				const session = await stripe.checkout.sessions.create({
					submit_type: "pay",
					mode: "payment",
					payment_method_types: ["card"],
					shipping_address_collection: { allowed_countries: ["PL"] },
					allow_promotion_codes: true,
					shipping_options: [
						{ shipping_rate: "shr_1LLUkQL5Mz2wiejPeRZxCEb3" },
					],

					line_items: req.body.map((item: itemsType) => {
						return {
							price_data: {
								currency: "pln",
								product_data: {
									name: item.title,
									images: [
										item.image.data.attributes.formats
											.thumbnail.url,
									],
								},
								unit_amount: item.price * 100,
							},
							quantity: item.quantity,
						};
					}),
					success_url: `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
					cancel_url: `${req.headers.origin}/canceled`,
				});

				res.status(200).json(session);
			} catch (error: any) {
				res.status(error.statusCode || 500).json(error.message);
			}
		}
	}
}

//import next elements
import type { NextPage } from "next";
import Head from "next/head";
//import data from strapi
import { useQuery } from "urql";
import { PRODUCT_QUERY } from "../lib/query";
//import components
import Product from "../components/product/product";
//Import styled components
import { GaleryStyle } from "../styles/galery.style";

const Home: NextPage = () => {
	//Fetch result from strapi
	const [result] = useQuery({ query: PRODUCT_QUERY });
	const { data, fetching, error } = result;
	if (error) return <p>Oh no... </p>;
	if (fetching) return <p>Loading...</p>;
	const products = data.products.data;

	return (
		<div>
			<Head>
				<title>Candle Fox</title>
				<meta
					name='description'
					content='Generated by create next app'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				<GaleryStyle>
					{products.map(
						(product: {
							attributes: {
								title: string;
								description: string;
								price: number;
								quantity: number;
								slug: string;
								image: {
									data: {
										attributes: {
											formats: {
												small: {
													url: string;
													name: string;
												};
											};
										};
									};
								};
							};
						}) => (
							<Product
								key={product.attributes.slug}
								data={product}
							/>
						)
					)}
				</GaleryStyle>
			</main>
		</div>
	);
};

export default Home;

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "../../lib/query";
//Import styled components
import {
	DetailsStyle,
	ProductInfo,
	Quantity,
	Buy,
} from "../../styles/productsDetails.style";
//Import react icons
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
//Import context
import { useStateContext } from "../../lib/context";
//Toasr
import { toast } from "react-hot-toast";

const ProductDetails = () => {
	//context
	const context = useStateContext();
	//Featch Slug
	const { query } = useRouter();
	//Featch Graphql data
	const [result] = useQuery({
		query: GET_PRODUCT_QUERY,
		variables: { slug: query.slug },
	});
	// use state
	const { data, fetching, error } = result;
	// Reset Qty
	useEffect(() => {
		context?.setQuty(1);
	}, []);

	if (fetching) return <p>Loading...</p>;
	if (error) return <p>Oh no... {error.message}</p>;

	const { title, description, image } = data.products.data[0].attributes;

	//Create a toast
	const notify = () => {
		toast.success(`${title} added to your card`, { duration: 1500 });
	};

	return (
		<DetailsStyle>
			<img
				src={image.data.attributes.formats.small.url}
				alt={image.data.attributes.formats.small.name}></img>
			<ProductInfo>
				<h3>{title}</h3>
				<p>{description}</p>
				<Quantity>
					<span>Quantuty</span>
					<button>
						<AiOutlineMinusCircle onClick={context?.decreaseQty} />
					</button>
					<p>{context?.qty}</p>
					<button>
						<AiOutlinePlusCircle onClick={context?.increaseQty} />
					</button>
				</Quantity>
				<Buy
					onClick={() => {
						context?.onAdd(
							data.products.data[0].attributes,
							context?.qty
						);
						notify();
					}}>
					Add to card
				</Buy>
			</ProductInfo>
		</DetailsStyle>
	);
};

export default ProductDetails;

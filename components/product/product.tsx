//Import styled components
import { ProductStyle } from "./product.style";
//Import types of props
import { placeProps } from "./product.type";
//import next elements
import Link from "next/link";

const Product = (props: placeProps) => {
	//Extract the info from props
	const { title, description, price, quantity, slug, image } =
		props.data.attributes;
	return (
		<ProductStyle>
			<div>
				<Link href={`/product/${slug}`}>
					<img
						src={image.data.attributes.formats.small.url}
						alt={image.data.attributes.formats.small.name}></img>
				</Link>

				<h2>{title}</h2>
				<h3>{price} zł</h3>
			</div>
		</ProductStyle>
	);
};

export default Product;

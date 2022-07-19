//Import styled components
import { NavigationStyle, NavigationItems } from "./nav.styles";
//Import next components
import Link from "next/link";
//Import react icons
import { FiShoppingCart } from "react-icons/fi";
//Import components
import Cart from "../Cart/cart";
//Import State
import { useStateContext } from "../../lib/context";
import User from "../User/user";
//Import auth0
import { useUser } from "@auth0/nextjs-auth0";
//import animate
const { AnimatePresence, motion } = require("framer-motion");

const Nav = () => {
	const contextItems = useStateContext();
	const { user, error, isLoading } = useUser();
	return (
		<NavigationStyle>
			<Link href={"/"}>Styled.</Link>
			<NavigationItems>
				<User />
				<div onClick={() => contextItems?.setShowCart(true)}>
					{contextItems?.totalQty
						? contextItems?.totalQty > 0 && (
								<motion.span
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}>
									{contextItems?.totalQty}
								</motion.span>
						  )
						: null}
					<FiShoppingCart />
					<h3>cart</h3>
				</div>
			</NavigationItems>
			<AnimatePresence>
				{contextItems?.showCart && <Cart />}
			</AnimatePresence>
		</NavigationStyle>
	);
};

export default Nav;

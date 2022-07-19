//Import animation
const { motion } = require("framer-motion");
import styled from "styled-components";

export const CardWrapper = styled(motion.div)`
	position: fixed;
	right: 0;
	top: 0;
	height: 100vh;
	width: 100%;
	background: rgba(0, 0, 0, 0.4);
	z-index: 100;
	display: flex;
	justify-content: flex-end;
`;
export const CardStyle = styled(motion.div)`
	width: 30%;
	background: #f1f1f1;
	overflow-y: scroll;
	position: relative;
	padding: 0 1rem;
`;
export const OneCartStyle = styled(motion.div)`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-radius: 0.3rem;
	overflow: hidden;
	background: white;
	padding: 1rem;
	margin: 1rem;
	img {
		width: 30%;
	}
`;
export const CardInfoStyle = styled(motion.div)`
	width: 70%;
`;
export const EmptyStyle = styled(motion.div)`
	position: absolute;
	top: 0;
	transform: translate(-50%, 0%);
	height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	h3 {
		font-size: 2rem;
		padding: 2rem;
	}
	svg {
		font-size: 10rem;
		color: var(--secondary);
	}
`;
export const Checkout = styled(motion.div)`
	padding: 2rem;

	button {
		background: var(--primary);
		padding: 1rem 2rem;
		width: 100%;
		color: white;
		margin-top: 2rem;
		border: none;
		cursor: pointer;
	}
`;
export const CardsStyle = styled(motion.div)``;

//Animation Variants
export const cardStyleAnimation = {
	hidden: { opacity: 0, scale: 0.8 },
	show: { opacity: 1, scale: 1 },
};
export const cardsStyleAnimation = {
	hidden: { opacity: 1 },
	show: {
		opacity: 1,
		transition: {
			delayChildren: 0.5,
			staggerChildren: 0.1,
		},
	},
};

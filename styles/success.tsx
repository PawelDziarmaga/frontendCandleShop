import styled from "styled-components";
const { motion } = require("framer-motion");

export const Wrapper = styled.div`
	margin: 5rem 5rem;
`;

export const Card = styled(motion.div)`
	display: flex;
	flex-direction: column;
	align-items: center;
	background: white;
	border-radius: 2rem;
	padding: 3rem 3rem;
	h1 {
		color: var(--primary);
		margin-bottom: 1rem;
	}
	h2 {
		color: var(--secondary);
		font-weight: 500;
		margin-bottom: 0.5rem;
	}
	button {
		background: var(--primary);
		color: white;
		font-weight: 500;
		font-size: 1.2rem;
		padding: 1rem 2rem;
		margin-top: 2rem;
		cursor: pointer;
	}
`;
export const Address = styled.div`
	font-size: 1rem;
	width: 50%;
`;
export const OrderInfo = styled.div`
	font-size: 1rem;
	width: 100%;
	div {
		width: 100%;
		display: flex;
		justify-content: left;

		p {
			padding: 0.5rem;
		}
		p:first-child {
			width: 50%;
		}
		p:nth-child(2n) {
			width: 20%;
		}
	}
`;
export const InfoWrapper = styled.div`
	margin-top: 2rem;
	display: flex;
	justify-content: center;
	width: 100%;
`;

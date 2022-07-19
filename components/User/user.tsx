import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import styled from "styled-components";

export default function User() {
	const route = useRouter();
	const auth0Data: { user: { picture: string; name: string } } | any =
		useUser();

	if (!auth0Data.user) {
		return (
			<div onClick={() => route.push(`/api/auth/login`)}>
				<FaUserCircle className='profile' />
				<h3>Login</h3>
			</div>
		);
	}

	return (
		<Profile onClick={() => route.push(`/profile`)}>
			<img src={auth0Data.user.picture} alt={auth0Data.user.name} />
			<h3>{auth0Data.user.name}</h3>
		</Profile>
	);
}

const Profile = styled.div`
	img {
		border-radius: 50%;
		width: 1.5rem;
		height: 1.5rem;
	}
`;

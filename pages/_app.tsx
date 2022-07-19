//import components
import Nav from "../components/Nav/nav";
//import context
import { StateContext } from "../lib/context";
//import styless
import { GlobalStyle } from "../styles/global.style";
import type { AppProps } from "next/app";
//import auth0
import { UserProvider } from "@auth0/nextjs-auth0";

import { Toaster } from "react-hot-toast";
import { Provider, createClient } from "urql";

const client = createClient({
	url: process.env.NEXT_PUBLIC_BACKEND_API as string,
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<UserProvider>
			<StateContext>
				<Provider value={client}>
					<Toaster />
					<Nav />
					<Component {...pageProps} />
					<GlobalStyle />
				</Provider>
			</StateContext>
		</UserProvider>
	);
}

export default MyApp;

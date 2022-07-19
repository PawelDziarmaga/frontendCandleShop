export type placeProps = {
	data: {
		attributes: {
			title: string;
			description: string;
			price: number;
			quantity: number;
			slug: string;
			image: {
				data: {
					attributes: {
						formats: { small: { url: string; name: string } };
					};
				};
			};
		};
	};
};

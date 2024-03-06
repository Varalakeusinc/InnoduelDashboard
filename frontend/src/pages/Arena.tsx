import * as React from "react";
import { useParams } from "react-router-dom";

const Arena = () => {
	// React router params usage. Id = Arena id
	const { id } = useParams();

	return <h1>Arena page: {id}</h1>;
};

export default Arena;

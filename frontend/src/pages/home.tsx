import { useEffect, useState } from "react";
import { arenaService, Arena } from "../services/arena";

const HomePage = () => {
	const [arenas, setArenas] = useState<Arena[]>([]);

	async function fetchData() {
		try {
			const data: Arena[] = await arenaService.getAllArenas();
			setArenas(data);
		} catch (error) {
			// Handle error here
			// Show toast or something
			console.log("Probably problem with database or server", error);
		}
	}
	useEffect(() => {
		fetchData();
	}, []);
	return (
		<div>
			HomePage
			<h1 className="text-xl">Arena Page</h1>
			<p>
				This is the arena page, below should be a list of database
				"Arenas"
			</p>
			<hr className="my-4" />
			{arenas?.length > 0 &&
				arenas.map((arena: Arena) => (
					<div key={arena.id}>
						<p>Id: {arena.id}</p>
						<p>Name: {arena.name}</p>
						<p>Info text: {arena.info_text}</p>
					</div>
				))}
		</div>
	);
};

export default HomePage;

import { useEffect, useState } from "react";
import { arenaService, Arena } from "../services/arena";
import ArenaCard from "@/components/arena/arena-card";

const HomePage = () => {
	const [arenas, setArenas] = useState<Arena[]>([]);

    useEffect(() => {
        arenaService.getAllMockArenas()
            .then(data => {
                setArenas(data);
            })
            .catch(error => {
                console.error("Error fetching arenas:", error);
                // Handle error here (e.g., set error state, show notification)
            });
        arenaService.getAllArenas().then(data => {
            console.log(data);
        });
    }, []);

	return (
		<div>
			<h1 className="text-3xl font-semibold text-center my-5">Arenas</h1>
			{arenas.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
					{arenas.map(arena => (
						<ArenaCard key={arena.id} arena={arena} />
					))}
				</div>
			) : (
				<p>No arenas to display.</p>
			)}
		</div>
	);
};

export default HomePage;

import * as React from "react";
import { arenaService, Arena, Idea } from "../services/arena";
import ArenaCard from "@/components/arena/arena-card";
import { Company, companyService } from "../services/companies";
import { ideaService } from "../services/ideas";
import { UserInfo, userService } from "../services/users";

const HomePage = () => {
	const [arenas, setArenas] = React.useState<Arena[]>([]);
	const [companies, setCompanies] = React.useState<ReadonlyArray<Company>>(
		[]
	);
	const [ideas, setIdeas] = React.useState<ReadonlyArray<Idea>>([]);
	const [users, setUsers] = React.useState<ReadonlyArray<UserInfo>>([]);

	React.useEffect(() => {
		arenaService
			.getAllMockArenas()
			.then(data => {
				setArenas(data);
			})
			.catch(error => {
				console.error("Error fetching arenas:", error);
				// Handle error here (e.g., set error state, show notification)
			});

		// All arenas
		// The mock data needs to be removed and changed to user this
		// arenaService.getAllArenas().then(setArenas);

		// All companies
		companyService.getAllCompanies().then(setCompanies);

		// All ideas
		ideaService.getAllIdeas().then(setIdeas);

		// All users
		userService.getAllUsers().then(setUsers);
	}, []);

	return (
		<>
			<div
				style={{
					width: "100%",
					height: "100px",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-around",
				}}
			>
				<div>Total Company amount: {companies.length}</div>
				<div>Total Idea amount: {ideas.length}</div>
				<div>Total User amount: {users.length}</div>
			</div>
			<div>
				<h1 className="text-3xl font-semibold text-center my-5">
					Arenas
				</h1>
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
		</>
	);
};

export default HomePage;

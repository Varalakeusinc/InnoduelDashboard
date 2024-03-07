import * as React from "react";
import { Arena, arenaService } from "../services/arena";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { selectCompanyId } from "@/store/userSlice";

const Arenas = () => {
	const [arenas, setArenas] = React.useState<Arena[]>([]);

	// Use this to fetch all arenas for specifc company
	const companyId = useAppSelector(selectCompanyId);

	React.useEffect(() => {
		// All arenas -> has to be company specific
		arenaService.getArenas(companyId).then(setArenas);
	}, []);

	return (
		<>
			<div className="mx-auto container">
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-8 gap-x-4 max-w-screen-xl">
					{arenas.map(arena => (
						<Link to={`/arena/${arena.id}`}>
							<div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
								<hr className="border-t-[#bfdadf]" />
								<div className="p-4">
									<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
										{arena.name}
									</h5>
									<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
										{!!arena.info_text && arena.info_text}
									</p>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</>
	);
};

export default Arenas;

import * as React from "react";
import { arenaService } from "../services/arena";
import { useAppSelector } from "@/store/hooks";
import { selectCompanyId } from "@/store/userSlice";

const Compare = () => {
	const companyId = useAppSelector(selectCompanyId);

	React.useEffect(() => {
		arenaService.findMatchingArenas(companyId, 645).then(console.log);
		arenaService.compareWinRate(companyId, 645, 646).then(console.log);
	}, [companyId]);

	return <h1>Compare page</h1>;
};

export default Compare;

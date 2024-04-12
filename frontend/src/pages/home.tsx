import * as React from "react";
import { useTranslation } from 'react-i18next';
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { arenaService, Arena } from "../services/arena";
import { Idea } from "../services/ideas";
import { Company, companyService } from "../services/companies";
import { ideaService } from "../services/ideas";
import { Vote, voteService } from "../services/vote";
import LoadingIndicator from "@/components/loadingIndicator/LoadingIndicator";
import { useAppSelector } from "@/store/hooks";
import { selectCompanyId } from "@/store/userSlice";
import {
	Tooltip,
	Legend,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
} from "recharts";
import { getWeek } from "date-fns";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";

const HomePage = () => {
	const companyId = useAppSelector(selectCompanyId);

	const { t } = useTranslation();

	const [arenas, setArenas] = React.useState<Arena[]>([]);
	const [companies, setCompanies] = React.useState<ReadonlyArray<Company>>(
		[]
	);
	const [ideas, setIdeas] = React.useState<ReadonlyArray<Idea>>([]);
	const [votes, setVotes] = React.useState<ReadonlyArray<Vote>>([]);
	const [startDate, setStartDate] = React.useState(
		// 18 months back from now
		new Date(new Date().setMonth(new Date().getMonth() - 18))
	);
	const [endDate, setEndDate] = React.useState(new Date());
	const [mode, setMode] = React.useState("week");
	const [summary, setSummary] = React.useState({
		totalArenas: 0,
		totalIdeas: 0,
		totalVotes: 0,
		averageWinRate: 0,
	});

	React.useEffect(() => {
		arenaService
			.getArenas(companyId)
			.then(data => {
				setArenas(data);
				const totalArenas = data.length;
				const totalIdeas = data.reduce(
					(acc, arena) => acc + arena.total_ideas,
					0
				);
				const totalVotes = data.reduce(
					(acc, arena) => acc + arena.total_votes,
					0
				);
				const averageWinRate =
					data.reduce(
						(acc, arena) =>
							acc + parseFloat(arena.overall_win_rate),
						0
					) / totalArenas;
				setSummary({
					totalArenas,
					totalIdeas,
					totalVotes,
					averageWinRate:
						!isNaN(averageWinRate) && isFinite(averageWinRate)
							? parseFloat(averageWinRate.toFixed(2))
							: 0,
				});
			})
			.catch(error => {
				console.error("Error fetching arenas:", error);
				// Handle error here
			});

		// All companies
		companyService.getAllCompanies().then(setCompanies);

		// All ideas
		ideaService.getCompanyIdeas(companyId).then(setIdeas);

		// All votes
		voteService.getAllVotes(companyId).then(setVotes);
	}, [companyId]);

	const barData = arenas.map(arena => ({
		name: arena.name,
		votes: arena.total_votes,
	}));

	// Function to format the date label based on the selected mode
	const formatDateLabel = (date: any) => {
		switch (mode) {
			case "week":
				return `W ${getWeek(date)}-${date.getFullYear()}`;
			case "month":
				return `${date.getMonth() + 1}-${date.getFullYear()}`;
			case "year":
				return date.getFullYear().toString();
			default:
				return date.toISOString().slice(0, 10);
		}
	};

	// Filter and aggregate ideas based on the selected dates and mode
	const aggregatedData = React.useMemo(() => {
		const filteredIdeas = ideas.filter(idea => {
			const ideaDate = new Date(idea.created);
			return ideaDate >= startDate && ideaDate <= endDate;
		});

		const ideaCounts: Record<
			string,
			{ count: number; sortableDate: Date }
		> = {};

		// Initialize ideaCounts for all timeframes within the range
		let currentDate = new Date(startDate);
		while (currentDate <= endDate) {
			const label = formatDateLabel(currentDate);
			ideaCounts[label] = {
				count: 0,
				sortableDate: new Date(currentDate),
			};

			// Move to the next timeframe based on the mode
			if (mode === "week") {
				currentDate.setDate(currentDate.getDate() + 7);
			} else if (mode === "month") {
				currentDate.setMonth(currentDate.getMonth() + 1);
			} else {
				currentDate.setFullYear(currentDate.getFullYear() + 1);
			}
		}

		filteredIdeas.forEach(idea => {
			const date = new Date(idea.created);
			const label = formatDateLabel(date); // Used for display

			if (ideaCounts[label]) {
				ideaCounts[label].count += 1;
			}
		});

		const sortedData = Object.entries(ideaCounts).map(
			([label, { count, sortableDate }]) => ({
				name: label,
				Ideas: count,
				sortableDate,
			})
		);

		sortedData.sort(
			(a, b) => a.sortableDate.getTime() - b.sortableDate.getTime()
		);

		return sortedData.map(({ name, Ideas }) => ({ name, Ideas }));
	}, [ideas, startDate, endDate, mode]);

	const customFormatter = (value: any) => {
		const maxLength = 7; 
		return value.length > maxLength ? `${value.substring(0, maxLength)}...` : value;
	  };

	return (
		<div className="homepage-container"
		style={{
			color: "#333",
			height: "100%",
			backgroundColor: "#f5f5f5",
			borderRadius: "10px"
		}}>
		  <div
			style={{
				width: "100%",
				height: "100px",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-around",
				fontWeight: "bold",
				color: "white"
			}}
		  >
			<div className="p-7 w-1/4 mx-5 bg-sky-900 rounded-xl shadow-md flex flex-col items-center">
			  {t('total_arenas')}:{" "}
			  {summary.totalArenas === 0 ? (
				<LoadingIndicator />
			  ) : (
				summary.totalArenas
			  )}
			</div>
			<div className="p-7 w-1/4 mx-5 bg-cyan-700 rounded-xl shadow-md flex flex-col items-center">
			  {t('total_ideas')}:{" "}
			  {summary.totalIdeas === 0 ? (
				<LoadingIndicator />
			  ) : (
				summary.totalIdeas
			  )}
			</div>
			<div className="p-7 w-1/4 mx-5 bg-orange-500 rounded-xl shadow-md flex flex-col items-center">
			  {t('total_votes')}:{" "}
			  {summary.totalVotes === 0 ? (
				<LoadingIndicator />
			  ) : (
				summary.totalVotes
			  )}
			</div>
			<div className="p-7 w-1/4 mx-5 bg-sky-500 rounded-xl shadow-md flex flex-col items-center">
			  {t('avg_winrate')}:{" "}
			  {summary.averageWinRate === 0 ? (
				<LoadingIndicator />
			  ) : (
				`${summary.averageWinRate}%`
			  )}
			</div>
		  </div>
	  
		  <div className="flex space-x-4 w-1/3 my-5">
			<ReactDatePicker
			  selected={startDate}
			  onChange={(date: any) => setStartDate(date)}
			  selectsStart
			  startDate={startDate}
			  endDate={endDate}
			  className="bg-white border mx-5 border-gray-300 rounded-md shadow-sm p-2 text-base leading-6 text-gray-700 focus:outline-none"
			/>
			<ReactDatePicker
			  selected={endDate}
			  onChange={(date: any) => setEndDate(date)}
			  selectsEnd
			  startDate={startDate}
			  endDate={endDate}
			  minDate={startDate}
			  className="bg-white border border-gray-300 rounded-md shadow-sm p-2 text-base leading-6 text-gray-700 focus:outline-none"
			/>
			<Select onValueChange={setMode} value={mode}>
				<SelectTrigger aria-label="Mode">
					<SelectValue placeholder="Select mode" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="week">Week</SelectItem>
					<SelectItem value="month">Month</SelectItem>
					<SelectItem value="year">Year</SelectItem>
				</SelectContent>
			</Select>
		  </div>
	  
		  <div className="chart-container"
		   style={{
				display: "flex",
				justifyContent: "space-around",
				flexWrap: "wrap",
				padding: "20px"
			}}>
			{arenas.length === 0 ? (
			  <LoadingIndicator />
			) : (
			  <>
				<div 
				 style={{
					backgroundColor: "#fff",
					borderRadius: "10px",
					boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
				}}>
				  <h2 className="mx-10 my-5 p-2 font-semibold">Ideas Distribution</h2>
				  <BarChart
					width={750}
					height={500}
					data={aggregatedData}
					margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
				  >
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" tickFormatter={(value) => customFormatter(value)} />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey="Ideas" fill="#8884d8" />
				  </BarChart>
				</div>
	  
				<div style={{
					backgroundColor: "#fff",
					borderRadius: "10px",
					boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
				}}>
				  <h2 className="mx-10 my-5 p-2 font-semibold">Votes per Arena</h2>
				  <BarChart
					width={750}
					height={500}
					data={barData}
					margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
				  >
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" tickFormatter={(value) => customFormatter(value)} />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey="votes" fill="#82ca9d" />
				  </BarChart>
				</div>
			  </>
			)}
		  </div>
		</div>
	  );
	  
};

export default HomePage;
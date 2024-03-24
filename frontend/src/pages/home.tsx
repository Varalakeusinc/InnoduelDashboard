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
	Notification,
	NotificationType,
} from "@/components/notification/Notification";
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

	// Delete (This is just a sample code)
	const notifications = [
		{
			id: "1",
			notificationType: NotificationType.Success,
			title: "Success!",
			description: "Operation completed successfully.",
		},
		{
			id: "2",
			notificationType: NotificationType.Error,
			title: "Error!",
			description: "Operation failed.",
			actionText: "Retry",
			onActionClick: () => {
				console.log("Retry action clicked");
			},
		},
		{
			id: "3",
			notificationType: NotificationType.Warning,
			title: "Warning!",
			description: "Operation failing...",
			actionText: "Retry",
			onActionClick: () => {
				console.log("Retry action clicked");
			},
		},
		{
			id: "4",
			notificationType: NotificationType.Info,
			title: "Info!",
			description: "Operation info...",
		},
	];
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
		ideaService.getAllIdeas().then(setIdeas);

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
				return `Week ${getWeek(date)}-${date.getFullYear()}`;
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

	return (
		<>
			<Notification notifications={notifications} />{" "}
			{/* Consider moving or removing as per comment */}
			<div
				style={{
					width: "100%",
					height: "100px",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-around",
					borderRadius: "20px",
					backgroundColor: "#ADD8E6",
				}}
			>
				<div>
					{t('total_arenas')}:{' '}
					{summary.totalArenas === 0 ? (
						<LoadingIndicator />
					) : (
						summary.totalArenas
					)}
				</div>
				<div>
					{t('total_ideas')}:{" "}
					{summary.totalIdeas === 0 ? (
						<LoadingIndicator />
					) : (
						summary.totalIdeas
					)}
				</div>
				<div>
					{t('total_votes')}:{" "}
					{summary.totalVotes === 0 ? (
						<LoadingIndicator />
					) : (
						summary.totalVotes
					)}
				</div>
				<div>
					{t('avg_winrate')}:{" "}
					{summary.averageWinRate === 0 ? (
						<LoadingIndicator />
					) : (
						summary.averageWinRate
					)}
					%
				</div>
			</div>
			<div className="flex flex-col space-y-4 mt-4">
				<div className="flex space-x-4">
					<ReactDatePicker
						selected={startDate}
						onChange={(date: any) => setStartDate(date)}
						selectsStart
						startDate={startDate}
						className="bg-white border border-gray-300 rounded-md shadow-sm p-2 text-base leading-6 text-gray-700 focus:outline-none"
					/>
					<ReactDatePicker
						selected={endDate}
						onChange={(date: any) => setEndDate(date)}
						selectsEnd
						endDate={endDate}
						minDate={startDate}
						className="bg-white border border-gray-300 rounded-md shadow-sm p-2 text-base leading-6 text-gray-700 focus:outline-none"
					/>
				</div>
				<div className="w-48">
					<Select onValueChange={setMode} value={mode}>
						<SelectTrigger aria-label="Mode">
							<SelectValue placeholder="Select mode" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="week">{t('week')}</SelectItem>
							<SelectItem value="month">{t('month')}</SelectItem>
        					<SelectItem value="year">{t('year')}</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
			{/* Chart Section */}
			<div className="flex justify-center space-x-8">
				{arenas.length === 0 ? (
					<LoadingIndicator />
				) : (
					<>
						{/* Ideas Bar Chart */}
						<div>
							<h2>{t("ideas_distribution")}</h2>
							<BarChart
								width={900}
								height={500}
								data={aggregatedData}
								margin={{
									top: 5,
									right: 30,
									left: 20,
									bottom: 5,
								}}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Bar dataKey="Ideas" label={t("ideas")} fill="#8884d8" />
							</BarChart>
						</div>

						{/* Votes Bar Chart */}
						<div>
							<h2>{t("votes_per_arena")}</h2>
							<BarChart width={900} height={500} data={barData}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Bar dataKey="votes" fill="#82ca9d" />
							</BarChart>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default HomePage;

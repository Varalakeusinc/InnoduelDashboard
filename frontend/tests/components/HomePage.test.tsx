import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from "@/src/pages/home";
import { arenaService } from "@/src/services/arena";
import { ideaService } from "@/src/services/ideas";

const { expect, describe, it } = require("@jest/globals");
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

jest.mock("@/src/services/arena", () => ({
	arenaService: {
		getArenas: jest.fn().mockResolvedValue([
			{
				id: "1",
				name: "Arena 1",
				description: "Description of Arena 1",
				info_text: "Some info text",
				total_ideas: 10,
				total_votes: 50,
				overall_win_rate: "60%",
				company_id: 123,
				ideas: [],
				vote_count: 5,
			},
		]),
	},
}));

jest.mock("@/src/services/ideas", () => ({
	ideaService: {
		getCompanyIdeas: jest.fn().mockResolvedValue([]),
	},
}));

const mockStore = configureStore();
const store = mockStore({
	user: {
		currentCompany: "some-company",
	},
});

const mockedArenaService = arenaService as jest.Mocked<typeof arenaService>;
const mockedIdeaService = ideaService as jest.Mocked<typeof ideaService>;

describe("HomePage", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("loads arenas without crashing", async () => {
		render(
			<Provider store={store}>
				<HomePage />
			</Provider>
		);

		await waitFor(() => {
			expect(screen.getByText("Arena 1")).toBeInTheDocument();
		});
		const arenaElement = await screen.findByText("Arena 1");
		expect(arenaElement).toBeInTheDocument();
	});

	it("loads arenas and ideas on component mount", async () => {
		const mockArenas = [
			{
				id: "1",
				name: "Arena 1",
				description: "Description of Arena 1",
				info_text: "Some info text",
				total_ideas: 10,
				total_votes: 50,
				overall_win_rate: "60%",
				company_id: 123,
				ideas: [],
				vote_count: 5,
			},
		];
		mockedArenaService.getArenas.mockResolvedValue(mockArenas);

		const mockIdeas = [
			{
				id: 1,
				idea_text: "New idea",
				user_id: 456,
				arena_id: 1,
				created: new Date(),
				active: true,
				win_rate: 75,
				win_rate_updated: new Date(),
				is_deleted: false,
				is_deleted_time: null,
				is_deleted_by_user_id: null,
				is_seed: true,
				arena: mockArenas[0],
				vote: [],
				vote_count: 10,
			},
		];
		mockedIdeaService.getCompanyIdeas.mockResolvedValue(mockIdeas);

		render(
			<Provider store={store}>
				<HomePage />
			</Provider>
		);
		await waitFor(() => {
			expect(screen.getByText("Arena 1")).toBeInTheDocument();
		});
	});

	it("handles API errors gracefully", async () => {
		mockedArenaService.getArenas.mockRejectedValue(new Error("API error"));
		render(
			<Provider store={store}>
				<HomePage />
			</Provider>
		);
		await waitFor(() => {
			expect(screen.getByText("Error!")).toBeInTheDocument();
		});
	});
});

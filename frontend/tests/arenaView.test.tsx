const { expect, describe, it } = require("@jest/globals");
import {
	sortIdeasByWinRate,
	calculateMaxLabelLength,
} from "../components/charts/idea-win-rate-chart";
import { sortIdeasByVotesDescending } from "../components/charts/bar-chart-horizontal";
import { Idea } from "@/src/services/ideas";

const created = new Date();

const ideaData: Idea[] = [
	{
		id: 1,
		idea_text: "Idea 1",
		user_id: 0,
		arena_id: 0,
		created: created,
		active: false,
		win_rate: 80,
		win_rate_updated: null,
		is_deleted: null,
		is_deleted_time: null,
		is_deleted_by_user_id: null,
		is_seed: null,
		arena: {
			company_id: 0,
			description: "",
			id: "",
			ideas: [],
			info_text: "",
			name: "",
			overall_win_rate: "",
			total_ideas: 0,
			total_votes: 0,
		},
		vote: [],
		vote_count: 50,
	},
	{
		id: 2,
		idea_text: "Idea 2",
		user_id: 0,
		arena_id: 0,
		created: created,
		active: false,
		win_rate: 60,
		win_rate_updated: null,
		is_deleted: null,
		is_deleted_time: null,
		is_deleted_by_user_id: null,
		is_seed: null,
		arena: {
			company_id: 0,
			description: "",
			id: "",
			ideas: [],
			info_text: "",
			name: "",
			overall_win_rate: "",
			total_ideas: 0,
			total_votes: 0,
		},
		vote: [],
		vote_count: 10,
	},
	{
		id: 3,
		idea_text: "Idea 3",
		user_id: 0,
		arena_id: 0,
		created: created,
		active: false,
		win_rate: 90,
		win_rate_updated: null,
		is_deleted: null,
		is_deleted_time: null,
		is_deleted_by_user_id: null,
		is_seed: null,
		arena: {
			company_id: 0,
			description: "",
			id: "",
			ideas: [],
			info_text: "",
			name: "",
			overall_win_rate: "",
			total_ideas: 0,
			total_votes: 0,
		},
		vote: [],
		vote_count: 100,
	},
];

const sortedData: Idea[] = [
	{
		id: 3,
		idea_text: "Idea 3",
		user_id: 0,
		arena_id: 0,
		created: created,
		active: false,
		win_rate: 90,
		win_rate_updated: null,
		is_deleted: null,
		is_deleted_time: null,
		is_deleted_by_user_id: null,
		is_seed: null,
		arena: {
			company_id: 0,
			description: "",
			id: "",
			ideas: [],
			info_text: "",
			name: "",
			overall_win_rate: "",
			total_ideas: 0,
			total_votes: 0,
		},
		vote: [],
		vote_count: 100,
	},
	{
		id: 1,
		idea_text: "Idea 1",
		user_id: 0,
		arena_id: 0,
		created: created,
		active: false,
		win_rate: 80,
		win_rate_updated: null,
		is_deleted: null,
		is_deleted_time: null,
		is_deleted_by_user_id: null,
		is_seed: null,
		arena: {
			company_id: 0,
			description: "",
			id: "",
			ideas: [],
			info_text: "",
			name: "",
			overall_win_rate: "",
			total_ideas: 0,
			total_votes: 0,
		},
		vote: [],
		vote_count: 50,
	},
	{
		id: 2,
		idea_text: "Idea 2",
		user_id: 0,
		arena_id: 0,
		created: created,
		active: false,
		win_rate: 60,
		win_rate_updated: null,
		is_deleted: null,
		is_deleted_time: null,
		is_deleted_by_user_id: null,
		is_seed: null,
		arena: {
			company_id: 0,
			description: "",
			id: "",
			ideas: [],
			info_text: "",
			name: "",
			overall_win_rate: "",
			total_ideas: 0,
			total_votes: 0,
		},
		vote: [],
		vote_count: 10,
	},
];

describe("Idea winrate chart", () => {
	it("sorts ideas by win rate correctly", () => {
		const sortedIdeas = sortIdeasByWinRate(ideaData);
		expect(sortedIdeas).toEqual(sortedData);
	});

	it("calculates max label length correctly", () => {
		const maxLabelLength = calculateMaxLabelLength(ideaData);
		expect(maxLabelLength).toBe(6);
	});
});

describe("Idea vote chart", () => {
	it("sorts ideas by votes correctly", () => {
		const sortedIdeas = sortIdeasByVotesDescending(ideaData);
		expect(sortedIdeas).toEqual(sortedData);
	});
});

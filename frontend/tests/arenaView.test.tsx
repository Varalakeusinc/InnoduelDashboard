const { expect, describe, it } = require('@jest/globals'); 
import { sortIdeasByWinRate, calculateMaxLabelLength } from '../components/charts/idea-win-rate-chart'; 
import { sortIdeasByVotesDescending } from '../components/charts/bar-chart-horizontal'; 
 
// have to change other idea attributes to conditional in ideas.ts file 
type Idea = { 
  id: number; 
  idea_text: string; 
  win_rate: number; 
  vote_count: number; 
}; 
 
const ideaData: Idea[] = [ 
  { id: 1, idea_text: 'Idea 1', win_rate: 80, vote_count: 50 }, 
  { id: 2, idea_text: 'Idea 2', win_rate: 60, vote_count: 10}, 
  { id: 3, idea_text: 'Idea 3', win_rate: 90, vote_count: 100 }, 
]; 
 
const sortedData: Idea[] = [ 
  { id: 3, idea_text: 'Idea 3', win_rate: 90, vote_count: 100}, 
  { id: 1, idea_text: 'Idea 1', win_rate: 80, vote_count: 50}, 
  { id: 2, idea_text: 'Idea 2', win_rate: 60, vote_count: 10}, 
]; 
 
describe('Idea winrate chart', () => { 
  it('sorts ideas by win rate correctly', () => { 
    const sortedIdeas = sortIdeasByWinRate(ideaData); 
    expect(sortedIdeas).toEqual(sortedData); 
  }); 
 
  it('calculates max label length correctly', () => { 
    const maxLabelLength = calculateMaxLabelLength(ideaData); 
    expect(maxLabelLength).toBe(6);  
  }); 
}); 
 
describe('Idea vote chart', () => { 
  it('sorts ideas by votes correctly', () => { 
    const sortedIdeas = sortIdeasByVotesDescending(ideaData); 
    expect(sortedIdeas).toEqual(sortedData); 
  }); 
 
   
});
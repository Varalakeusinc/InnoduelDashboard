
import { render, waitFor } from '@testing-library/react';
import HomePage from '../../src/pages/home';
import { getArenas } from '../../src/services/arena';
const { expect, describe, it } = require('@jest/globals');

// Mock the arena service
jest.mock('../../src/services/arena', () => ({
    getArenas: jest.fn()
}));

describe('HomePage', () => {
    it('loads arenas and displays them', async () => {
        (getArenas as jest.Mock).mockResolvedValue([{ id: 1, name: 'Arena 1', total_ideas: 10, total_votes: 100, overall_win_rate: '50%' }]);

        const { getByText } = render(<HomePage />);
        await waitFor(() => {
            expect(getByText('Arena 1')).toBeInTheDocument();
        });
    });

    it('handles no arenas found', async () => {
        (getArenas as jest.Mock).mockResolvedValue([]);

        const { getByText } = render(<HomePage />);
        await waitFor(() => {
            expect(getByText('No data found for ideas or votes.')).toBeInTheDocument();
        });
    });
});
import { calculatePageRange } from '../../src/utils/paginationHelper';
const { expect, describe, it } = require('@jest/globals');

describe('calculatePageRange', () => {
    it('should handle fewer total pages than max page numbers', () => {
        expect(calculatePageRange(1, 5, 10)).toEqual({ startPage: 1, endPage: 5 });
    });

    it('should handle current page at the start', () => {
        expect(calculatePageRange(1, 100, 10)).toEqual({ startPage: 1, endPage: 10 });
    });

    it('should handle current page at the end', () => {
        expect(calculatePageRange(100, 100, 10)).toEqual({ startPage: 91, endPage: 100 });
    });

    it('should handle current page in the middle', () => {
        expect(calculatePageRange(50, 100, 10)).toEqual({ startPage: 45, endPage: 55 });
    });
});
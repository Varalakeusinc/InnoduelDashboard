//import Compare from "@/src/pages/Compare";
//import { useState } from 'react';
//import { render,/* waitFor, /*fireEvent */} from '@testing-library/react';
//import { Provider } from 'react-redux';
//import { store } from "@/store/store";
import "@testing-library/jest-dom";
import { getRandomColor } from "@/src/pages/ArenaCompare";
import { expect, describe, it } from "@jest/globals";

/* FOR CHAI:
import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from "chai";
*/

describe("getRandomColor", () => {
	it("always returns a color", () => {
		const colors = Array(100)
			.fill(null)
			.map(() => getRandomColor());
		colors.every(color => expect(color).toMatch(/^#[\da-f]{6}$/));
	});

	it("doesn't always return the same color", () => {
		const colors = Array(100)
			.fill(null)
			.map(() => getRandomColor());
		const uniqueColors = new Set(colors);
		// Check if the number of unique colors is greater than 1
		expect(uniqueColors.size).toBeGreaterThan(1);
	});
});

/*
chai.should();
chai.use(chaiHttp);
const serverUrl = "http://localhost:5173"; 
// this doesn't work because of some syntaxerror
describe('Compare API Endpoints', () => {
  it('should compare two items successfully', done => {
    chai.request(serverUrl)
        .get('/api/compare') // Adjust the method and endpoint
        .query({ item1: 'apple', item2: 'orange' }) // Example query params
        .end((_err: any, res: { body: { result: any; }; }) => {
            expect(res.body).to.be.an('object');
            expect(res.body.result).to.exist; // Example assertion
            done();
        });
  });
});
*/

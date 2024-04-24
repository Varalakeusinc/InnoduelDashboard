//import Compare from "@/src/pages/Compare";
//import { useState } from 'react';
//import { render,/* waitFor, /*fireEvent */} from '@testing-library/react';
import '@testing-library/jest-dom';
//import { Provider } from 'react-redux';
//import { store } from "@/store/store";
import { getRandomColor } from '@/src/pages/ArenaCompare';
import { expect, describe, it } from '@jest/globals';
//import { type Request, type Response } from 'express';

describe("getRandomColor", () => {

  it("always returns a color", () => {
    const colors = Array(100).fill(null).map(() => getRandomColor());
    colors.every((color) => expect(color).toMatch(/^#[\da-f]{6}$/));
  });

  it("doesn't always return the same color", () => {
    const colors = Array(100).fill(null).map(() => getRandomColor());
    const uniqueColors = new Set(colors);
    // Check if the number of unique colors is greater than 1
    expect(uniqueColors.size).toBeGreaterThan(1);
    });
}); 

/*
const createMockReq = (options = {}) => ({
  method: 'GET',
  path: '/',
  body: {},
  cookies: {token: 'mockToken'},
  ...options
} as unknown as Request);


const createMockRes = () => {
  const res: Partial<Response> = {};
  res.send = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};


jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
  useRef: jest.fn(),
}));



describe("Compare component", () => {
  /*
  it("should add a new view on button click", () => {
    const { getByText } = render(<Compare />);
    fireEvent.click(getByText('+'));
    expect(getByText('view2')).toBeInTheDocument();
  });

  it("should remove a view", () => {
    const { getByText, queryByText } = render(<Compare />);
    fireEvent.click(getByText('+')); // Add a view
    fireEvent.click(getByText('+')); // Add another view
    fireEvent.click(getByText('-')); // Remove a view
    expect(queryByText('view2')).toBeNull(); // View 2 should be removed
  });

  it("should disable remove button when there is only one view", () => {
    const { getByText } = render(<Compare />);
    expect(getByText('-')).toBeDisabled(); // Only one view, so remove button should be disabled
  });
});

*/


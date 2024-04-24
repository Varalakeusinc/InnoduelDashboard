//import Compare from "@/src/pages/Compare";
//import { useState } from 'react';
//import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
//import { Provider } from 'react-redux';
//import { store } from "@/store/store";
const { expect, describe, it } = require('@jest/globals');
import { getRandomColor } from '@/src/pages/ArenaCompare';


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
import { render, screen, fireEvent } from "@testing-library/react";
import Noun_Adj from "./Noun_Adj";
import "@testing-library/jest-dom";

describe("Noun_Adj Component", () => {
  test("renders the header", () => {
    render(<Noun_Adj />);
    const header = screen.getByText(/ASL Nouns and Adjective Lessons/i);
    expect(header).toBeInTheDocument();
  });

  test("renders noun section and video links", () => {
    render(<Noun_Adj />);

    // Check for the noun section header
    const nounHeader = screen.getByText(/Nouns/i);
    expect(nounHeader).toBeInTheDocument();

    // Check for iframe elements in the noun section
    const nounVideos = screen.getAllByTitle(
      /Dog Sign ASL|House Sign ASL|Cat Sign ASL/i
    );
    expect(nounVideos).toHaveLength(3);
  });

  test("renders adjective section and video links", () => {
    render(<Noun_Adj />);

    // Check for the adjective section header
    const adjHeader = screen.getByText(/Adjectives/i);
    expect(adjHeader).toBeInTheDocument();

    // Check for iframe elements in the adjective section
    const adjVideos = screen.getAllByTitle(/Adjective Sign ASL/i);
    expect(adjVideos).toHaveLength(3);
  });

  test("renders buttons and handles navigation", () => {
    const { getByText } = render(<Noun_Adj />);

    // Noun buttons
    const nounButton1 = getByText(/Go to Drag and Drop Noun Excercise/i);
    const nounButton2 = getByText(/Go to Translation Noun Excercise/i);
    expect(nounButton1).toBeInTheDocument();
    expect(nounButton2).toBeInTheDocument();

    // Adjective button
    const adjButton = getByText(/Go to Adjective Assignment/i);
    expect(adjButton).toBeInTheDocument();
  });

  test("simulates button navigation", () => {
    delete window.location;
    window.location = { href: "" };

    render(<Noun_Adj />);

    // Simulate click on Drag and Drop Noun Exercise button
    const nounButton = screen.getByText(/Go to Drag and Drop Noun Excercise/i);
    fireEvent.click(nounButton);
    expect(window.location.href).toBe("/units/lesson5/N_A/Noun_Assigment1");

    // Simulate click on Adjective Assignment button
    const adjButton = screen.getByText(/Go to Adjective Assignment/i);
    fireEvent.click(adjButton);
    expect(window.location.href).toBe("/units/lesson5/N_A/Adj_Assigment");
  });
});

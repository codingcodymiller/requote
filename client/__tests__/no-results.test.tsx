import React from "react";
import { render, screen } from "@testing-library/react";
import NoResults from "../components/no-results";

describe("<NoResults />", () => {
  test("should have 'No results found' as text content", async () => {
    render(<NoResults />);

    const noResults = screen.getByText(/No results found/i);

    expect(noResults).toBeInTheDocument();
  });

});

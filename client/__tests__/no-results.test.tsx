import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

import NoResults from "../components/no-results";

function renderNoResults() {
  return render(<NoResults />);
}

describe("<NoResults />", () => {
  test("should have 'No results found' as its text content", async () => {
    const { findByTestId } = renderNoResults();

    const noResults = await findByTestId("no-results");

    expect(noResults).toHaveTextContent("No results found")
  });

});

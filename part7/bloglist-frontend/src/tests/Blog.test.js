import Blog from "../components/Blog";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";

describe("Blog tests", () => {
  const blog = {
    title: "sometitle",
    author: "someauthor",
    url: "someurl.com",
    likes: 2,
    user: {
      id: "236423vb4623784v238",
      username: "someusername",
      name: "somename",
    },
  };

  test("only title and author are shown initially", () => {
    const update = jest.fn();
    const deleteBlog = jest.fn();
    const component = render(
      <Blog blog={blog} update={update} deleteBlog={deleteBlog} />
    );

    expect(component.container).toHaveTextContent("sometitle");
    expect(component.container).toHaveTextContent("someauthor");
    expect(component.container).not.toHaveTextContent("likes");
    expect(component.container).not.toHaveTextContent("someurl.com");
    expect(component.container).not.toHaveTextContent("somename");
  });

  test('all information is shown on pressing "show"', () => {
    const update = jest.fn();
    const deleteBlog = jest.fn();
    const component = render(
      <Blog blog={blog} update={update} deleteBlog={deleteBlog} />
    );

    const button = component.getByText("show");

    fireEvent.click(button);

    expect(component.container).toHaveTextContent("sometitle");
    expect(component.container).toHaveTextContent("someauthor");
    expect(component.container).toHaveTextContent("likes");
    expect(component.container).toHaveTextContent("someurl.com");
    expect(component.container).toHaveTextContent("somename");
  });

  test("pressing like calls the event handler", () => {
    const update = jest.fn();
    const deleteBlog = jest.fn();
    const component = render(
      <Blog blog={blog} update={update} deleteBlog={deleteBlog} />
    );

    const show = component.getByText("show");

    fireEvent.click(show);

    const like = component.getByText("like");

    fireEvent.click(like);
    fireEvent.click(like);

    expect(update.mock.calls).toHaveLength(2);
  });
});

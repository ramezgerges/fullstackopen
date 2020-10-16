import NewBlogForm from "../components/NewBlogForm";
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

  test("calls functions accurately", () => {
    const create = jest.fn();
    const blogs = [];
    const setBlogs = jest.fn();
    const setMessage = jest.fn();

    const component = render(
      <NewBlogForm
        create={create}
        blogs={blogs}
        setBlogs={setBlogs}
        setMessage={setMessage}
      />
    );

    const title = component.container.querySelector('input[name="Title"]');
    const author = component.container.querySelector('input[name="Author"]');
    const url = component.container.querySelector('input[name="Url"]');
    const button = component.container.querySelector('input[type="button"]');

    fireEvent.change(title, {
      target: { value: blog.title },
    });

    fireEvent.change(author, {
      target: { value: blog.author },
    });

    fireEvent.change(url, {
      target: { value: blog.url },
    });

    fireEvent.click(button);

    expect(create.mock.calls[0][0]).toEqual({
      title: blog.title,
      author: blog.author,
      url: blog.url,
    });
  });
});

import { render, screen } from "@testing-library/react";
import CommentBox from "./CommentBox";
import userEvent from "@testing-library/user-event";

test("renders CommentBox when show is true", () => {
  render(<CommentBox show={true} onClose={() => {}} />);
  expect(screen.getByText("Comments")).toBeInTheDocument();
});

test("does not render CommentBox when show is false", () => {
  render(<CommentBox show={false} onClose={() => {}} />);
  // We expect the heading "Comments" to NOT be in the document
  expect(screen.queryByText("Comments")).not.toBeInTheDocument();
});

test("updates the textarea value when typing", async () => {
  render(<CommentBox show={true} onClose={() => {}} />);

  const textarea = screen.getByPlaceholderText("Enter your comments here");

  await userEvent.type(textarea, "Testing comment input");

  expect(textarea).toHaveValue("Testing comment input");
});

test("does not add an empty comment when Post is clicked", async () => {
  render(<CommentBox show={true} onClose={() => {}} />);

  const postButton = screen.getByRole("button", { name: /Post/i });

  // Click "Post" without typing anything
  await userEvent.click(postButton);

  // Ensure "No comments yet." is still present (no new comments added)
  expect(screen.getByText("No comments yet.")).toBeInTheDocument();
});

test("adds a comment when Post is clicked", async () => {
  render(<CommentBox show={true} onClose={() => {}} />);

  const textarea = screen.getByPlaceholderText("Enter your comments here");
  const postButton = screen.getByRole("button", { name: /Post/i });

  // Type a comment
  await userEvent.type(textarea, "Hello, world!");

  // Click "Post"
  await userEvent.click(postButton);

  // Ensure the comment appears in the list
  expect(screen.getByText("Hello, world!")).toBeInTheDocument();
});

test('removes "No comments yet." when a comment is added', async () => {
  render(<CommentBox show={true} onClose={() => {}} />);

  const textarea = screen.getByPlaceholderText("Enter your comments here");
  const postButton = screen.getByRole("button", { name: /Post/i });

  // Ensure "No comments yet." is initially present
  expect(screen.getByText("No comments yet.")).toBeInTheDocument();

  // Type a comment and post
  await userEvent.type(textarea, "This is a test comment");
  await userEvent.click(postButton);

  // "No comments yet." should disappear
  expect(screen.queryByText("No comments yet.")).not.toBeInTheDocument();
});

test('shows "No comments yet." when there are no comments', () => {
  render(<CommentBox show={true} onClose={() => {}} />);

  // Ensure "No comments yet." is visible at first
  expect(screen.getByText("No comments yet.")).toBeInTheDocument();
});

test("renders correctly with no comments initially", () => {
  render(<CommentBox show={true} onClose={() => {}} />);

  // Expect the "No comments yet." message to be visible
  expect(screen.getByText("No comments yet.")).toBeInTheDocument();

  // Ensure no comment items are present
  expect(screen.queryAllByRole("listitem")).toHaveLength(0);
});

test("renders only the 'No comments yet.' message when there are no comments", () => {
  render(<CommentBox show={true} onClose={() => {}} />);

  // Expect the "No comments yet." message to be visible
  expect(screen.getByText("No comments yet.")).toBeInTheDocument();

  // Ensure no comment items are present
  expect(screen.queryAllByRole("listitem")).toHaveLength(0);
});

import api from "./api";
import type { Comment } from "../types/comment";
import { getStoredComments, setStoredComments } from "./mockData";

export const getComments = async (): Promise<Comment[]> => {
  try {
    const response = await api.get<Comment[]>("/comments");
    if (response.data && response.data.length > 0) {
      setStoredComments(response.data);
      return response.data;
    }
  } catch {
    // fallback to local storage
  }
  return getStoredComments();
};

export const getCommentsByTicketId = async (
  ticketId: string
): Promise<Comment[]> => {
  try {
    const response = await api.get<Comment[]>(
      `/comments?ticketId=${ticketId}`
    );
    if (response.data) {
      return response.data;
    }
  } catch {
    // fallback to local storage
  }
  const comments = getStoredComments();
  return comments.filter((c) => c.ticketId === ticketId);
};

export const createComment = async (
  comment: Comment
): Promise<Comment> => {
  const comments = getStoredComments();
  const updatedComments = [...comments, comment];
  setStoredComments(updatedComments);

  try {
    const response = await api.post<Comment>("/comments", comment);
    return response.data;
  } catch {
    return comment;
  }
};

export const deleteComment = async (id: string): Promise<void> => {
  const comments = getStoredComments();
  const updated = comments.filter((c) => c.id !== id);
  setStoredComments(updated);

  try {
    await api.delete(`/comments/${id}`);
  } catch {
    // handled locally
  }
};
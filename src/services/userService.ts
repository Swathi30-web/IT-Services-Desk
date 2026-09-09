import api from "./api";
import type { User } from "../types/user";
import { getStoredUsers, setStoredUsers } from "./mockData";

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get<User[]>("/users");
    if (response.data && response.data.length > 0) {
      setStoredUsers(response.data);
      return response.data;
    }
  } catch {
    // fallback to local storage
  }
  return getStoredUsers();
};

export const getUserById = async (id: string): Promise<User> => {
  try {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  } catch {
    const users = getStoredUsers();
    const user = users.find((u) => u.id === id);
    if (!user) throw new Error("User not found");
    return user;
  }
};

export const createUser = async (user: User): Promise<User> => {
  const users = getStoredUsers();
  const updatedUsers = [...users, user];
  setStoredUsers(updatedUsers);

  try {
    const response = await api.post<User>("/users", user);
    return response.data;
  } catch {
    return user;
  }
};

export const updateUser = async (
  id: string,
  userUpdate: Partial<User>
): Promise<User> => {
  const users = getStoredUsers();
  const index = users.findIndex((u) => u.id === id);
  let updatedUser: User;
  if (index !== -1) {
    updatedUser = { ...users[index], ...userUpdate };
    users[index] = updatedUser;
    setStoredUsers(users);
  } else {
    throw new Error("User not found");
  }

  try {
    const response = await api.patch<User>(`/users/${id}`, userUpdate);
    return response.data;
  } catch {
    return updatedUser;
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  const users = getStoredUsers();
  const updated = users.filter((u) => u.id !== id);
  setStoredUsers(updated);

  try {
    await api.delete(`/users/${id}`);
  } catch {
    // handled locally
  }
};
import api from "./api";
import type { Category } from "../types/category";
import { getStoredCategories, setStoredCategories } from "./mockData";

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get<Category[]>("/categories");
    if (response.data && response.data.length > 0) {
      setStoredCategories(response.data);
      return response.data;
    }
  } catch {
    // fallback to local storage
  }
  return getStoredCategories();
};

export const getCategoryById = async (id: string): Promise<Category> => {
  try {
    const response = await api.get<Category>(`/categories/${id}`);
    return response.data;
  } catch {
    const categories = getStoredCategories();
    const category = categories.find((c) => c.id === id);
    if (!category) throw new Error("Category not found");
    return category;
  }
};

export const createCategory = async (
  category: Category
): Promise<Category> => {
  const categories = getStoredCategories();
  const updatedCategories = [...categories, category];
  setStoredCategories(updatedCategories);

  try {
    const response = await api.post<Category>("/categories", category);
    return response.data;
  } catch {
    return category;
  }
};

export const updateCategory = async (
  id: string,
  categoryUpdate: Partial<Category>
): Promise<Category> => {
  const categories = getStoredCategories();
  const index = categories.findIndex((c) => c.id === id);
  let updatedCategory: Category;
  if (index !== -1) {
    updatedCategory = { ...categories[index], ...categoryUpdate };
    categories[index] = updatedCategory;
    setStoredCategories(categories);
  } else {
    throw new Error("Category not found");
  }

  try {
    const response = await api.patch<Category>(
      `/categories/${id}`,
      categoryUpdate
    );
    return response.data;
  } catch {
    return updatedCategory;
  }
};

export const deleteCategory = async (id: string): Promise<void> => {
  const categories = getStoredCategories();
  const updated = categories.filter((c) => c.id !== id);
  setStoredCategories(updated);

  try {
    await api.delete(`/categories/${id}`);
  } catch {
    // handled locally
  }
};
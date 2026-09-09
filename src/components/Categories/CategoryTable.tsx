import type { Category } from "../../types/category";

interface CategoryTableProps {
  categories: Category[];
  onView?: (category: Category) => void;
  onEdit?: (category: Category) => void;
  onToggleStatus?: (category: Category) => void;
  onDelete?: (categoryId: string) => void;
}

const CategoryTable = ({
  categories,
  onView,
  onEdit,
  onToggleStatus,
  onDelete,
}: CategoryTableProps) => {
  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm transition-colors">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-gray-700 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-600">
            <tr>
              <th className="px-5 py-3.5">ID</th>
              <th className="px-5 py-3.5">Category Name</th>
              <th className="px-5 py-3.5">Description</th>
              <th className="px-5 py-3.5">Status</th>
              {(onView || onEdit || onToggleStatus || onDelete) && (
                <th className="px-5 py-3.5 text-right">Actions</th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-gray-700 dark:text-gray-300">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-5 py-3.5 font-semibold text-gray-500 dark:text-gray-400">
                  {category.id}
                </td>
                <td className="px-5 py-3.5 font-medium text-gray-900 dark:text-gray-100">
                  {category.name}
                </td>
                <td className="px-5 py-3.5 text-gray-600 dark:text-gray-400 max-w-sm truncate">
                  {category.description}
                </td>
                <td className="px-5 py-3.5">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                      category.status === "active"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                        : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                    }`}
                  >
                    {category.status}
                  </span>
                </td>
                {(onView || onEdit || onToggleStatus || onDelete) && (
                  <td className="px-5 py-3.5 text-right space-x-1.5 whitespace-nowrap">
                    {onView && (
                      <button
                        type="button"
                        onClick={() => onView(category)}
                        className="rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-2.5 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                      >
                        View
                      </button>
                    )}
                    {onEdit && (
                      <button
                        type="button"
                        onClick={() => onEdit(category)}
                        className="rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-2.5 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                      >
                        Edit
                      </button>
                    )}
                    {onToggleStatus && (
                      <button
                        type="button"
                        onClick={() => onToggleStatus(category)}
                        className="rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-2.5 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                      >
                        {category.status === "active" ? "Deactivate" : "Activate"}
                      </button>
                    )}
                    {onDelete && (
                      <button
                        type="button"
                        onClick={() => onDelete(category.id)}
                        className="rounded-lg border border-red-200 dark:border-red-900 bg-white dark:bg-gray-700 px-2.5 py-1 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 dark:hover:border-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 shadow-sm transition-colors"
          >
            <div className="flex flex-col gap-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{category.id}</p>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400">
                {category.description}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                    category.status === "active"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                      : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                  }`}
                >
                  {category.status}
                </span>
              </div>

              {(onView || onEdit || onToggleStatus || onDelete) && (
                <div className="flex gap-2 flex-wrap">
                  {onView && (
                    <button
                      type="button"
                      onClick={() => onView(category)}
                      className="flex-1 min-w-[60px] rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-2.5 py-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                    >
                      View
                    </button>
                  )}
                  {onEdit && (
                    <button
                      type="button"
                      onClick={() => onEdit(category)}
                      className="flex-1 min-w-[60px] rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-2.5 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    >
                      Edit
                    </button>
                  )}
                  {onToggleStatus && (
                    <button
                      type="button"
                      onClick={() => onToggleStatus(category)}
                      className="flex-1 min-w-[60px] rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-2.5 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    >
                      {category.status === "active" ? "Deactivate" : "Activate"}
                    </button>
                  )}
                  {onDelete && (
                    <button
                      type="button"
                      onClick={() => onDelete(category.id)}
                      className="flex-1 min-w-[60px] rounded-lg border border-red-200 dark:border-red-900 bg-white dark:bg-gray-700 px-2.5 py-2 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoryTable;
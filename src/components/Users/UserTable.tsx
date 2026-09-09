import type { User } from "../../types/user";

interface UserTableProps {
  users: User[];
  onView?: (user: User) => void;
  onEdit?: (user: User) => void;
  onToggleStatus?: (user: User) => void;
  onDelete?: (userId: string) => void;
}

const UserTable = ({
  users,
  onView,
  onEdit,
  onToggleStatus,
  onDelete,
}: UserTableProps) => {
  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm transition-colors">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-gray-700 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-600">
            <tr>
              <th className="px-5 py-3.5">ID</th>
              <th className="px-5 py-3.5">Name</th>
              <th className="px-5 py-3.5">Email</th>
              <th className="px-5 py-3.5">Phone</th>
              <th className="px-5 py-3.5">Department</th>
              <th className="px-5 py-3.5">Role</th>
              <th className="px-5 py-3.5">Status</th>
              {(onView || onEdit || onToggleStatus || onDelete) && (
                <th className="px-5 py-3.5 text-right">Actions</th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-gray-700 dark:text-gray-300">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-5 py-3.5 font-semibold text-gray-500 dark:text-gray-400">
                  {user.id}
                </td>
                <td className="px-5 py-3.5 font-medium text-gray-900 dark:text-gray-100">
                  {user.name}
                </td>
                <td className="px-5 py-3.5 text-gray-600 dark:text-gray-400">
                  {user.email}
                </td>
                <td className="px-5 py-3.5 text-gray-600 dark:text-gray-400 text-xs">
                  {user.phone || "-"}
                </td>
                <td className="px-5 py-3.5 text-gray-600 dark:text-gray-400">
                  {user.department}
                </td>
                <td className="px-5 py-3.5 capitalize">
                  <span className="inline-block rounded-md bg-gray-100 dark:bg-gray-700 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:text-gray-300">
                    {user.role.replace("_", " ")}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                      user.status === "active"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                        : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                {(onView || onEdit || onToggleStatus || onDelete) && (
                  <td className="px-5 py-3.5 text-right space-x-1.5 whitespace-nowrap">
                    {onView && (
                      <button
                        type="button"
                        onClick={() => onView(user)}
                        className="rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-2.5 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                      >
                        View
                      </button>
                    )}
                    {onEdit && (
                      <button
                        type="button"
                        onClick={() => onEdit(user)}
                        className="rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-2.5 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                      >
                        Edit
                      </button>
                    )}
                    {onToggleStatus && (
                      <button
                        type="button"
                        onClick={() => onToggleStatus(user)}
                        className="rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-2.5 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                      >
                        {user.status === "active" ? "Deactivate" : "Activate"}
                      </button>
                    )}
                    {onDelete && (
                      <button
                        type="button"
                        onClick={() => onDelete(user.id)}
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
        {users.map((user) => (
          <div
            key={user.id}
            className="rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 shadow-sm transition-colors"
          >
            <div className="flex flex-col gap-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {user.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user.id}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Email</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {user.email}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Phone</p>
                  <p className="text-gray-900 dark:text-gray-100">
                    {user.phone || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Department</p>
                  <p className="text-gray-900 dark:text-gray-100">
                    {user.department}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Role</p>
                  <span className="inline-block rounded-md bg-gray-100 dark:bg-gray-700 px-2 py-0.5 text-xs font-medium text-gray-700 dark:text-gray-300 capitalize">
                    {user.role.replace("_", " ")}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                    user.status === "active"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                      : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                  }`}
                >
                  {user.status}
                </span>
              </div>

              {(onView || onEdit || onToggleStatus || onDelete) && (
                <div className="flex gap-2 flex-wrap">
                  {onView && (
                    <button
                      type="button"
                      onClick={() => onView(user)}
                      className="flex-1 min-w-[60px] rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-2.5 py-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                    >
                      View
                    </button>
                  )}
                  {onEdit && (
                    <button
                      type="button"
                      onClick={() => onEdit(user)}
                      className="flex-1 min-w-[60px] rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-2.5 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    >
                      Edit
                    </button>
                  )}
                  {onToggleStatus && (
                    <button
                      type="button"
                      onClick={() => onToggleStatus(user)}
                      className="flex-1 min-w-[60px] rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-2.5 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    >
                      {user.status === "active" ? "Deactivate" : "Activate"}
                    </button>
                  )}
                  {onDelete && (
                    <button
                      type="button"
                      onClick={() => onDelete(user.id)}
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

export default UserTable;
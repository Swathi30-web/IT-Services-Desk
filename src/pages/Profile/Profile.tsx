import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <div className="p-4 sm:p-6 min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="rounded-xl bg-white dark:bg-gray-800 p-4 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">No profile details available. Please log in.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 bg-gray-50 dark:bg-gray-950 transition-colors min-h-screen">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">User Profile</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          View your account information and permissions
        </p>
      </div>

      <div className="max-w-3xl rounded-2xl bg-white dark:bg-gray-800 p-4 sm:p-6 lg:p-8 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pb-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-600 dark:bg-blue-700 text-3xl font-bold text-white shadow-lg shadow-blue-500/20">
            {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{currentUser.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{currentUser.email}</p>
            <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
              <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-950/30 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:text-blue-400 capitalize">
                Role: {currentUser.role?.replace("_", " ")}
              </span>
              <span className="inline-flex items-center rounded-full bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 capitalize">
                Status: {currentUser.status}
              </span>
              <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-700 px-2.5 py-1 text-xs font-semibold text-gray-700 dark:text-gray-300">
                Dept: {currentUser.department}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Details Grid - Responsive */}
        <div className="mt-6 grid gap-4 sm:gap-6 sm:grid-cols-2">
          <div className="rounded-xl bg-gray-50 dark:bg-gray-700/50 p-4 border border-gray-100 dark:border-gray-600 transition-colors">
            <span className="text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
              User ID
            </span>
            <p className="mt-2 font-semibold text-gray-800 dark:text-gray-200">{currentUser.id}</p>
          </div>

          <div className="rounded-xl bg-gray-50 dark:bg-gray-700/50 p-4 border border-gray-100 dark:border-gray-600 transition-colors">
            <span className="text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Contact Phone
            </span>
            <p className="mt-2 font-semibold text-gray-800 dark:text-gray-200">{currentUser.phone || "Not specified"}</p>
          </div>

          <div className="rounded-xl bg-gray-50 dark:bg-gray-700/50 p-4 border border-gray-100 dark:border-gray-600 transition-colors">
            <span className="text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Department
            </span>
            <p className="mt-2 font-semibold text-gray-800 dark:text-gray-200">{currentUser.department}</p>
          </div>

          <div className="rounded-xl bg-gray-50 dark:bg-gray-700/50 p-4 border border-gray-100 dark:border-gray-600 transition-colors">
            <span className="text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Member Since
            </span>
            <p className="mt-2 font-semibold text-gray-800 dark:text-gray-200">{currentUser.createdDate || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

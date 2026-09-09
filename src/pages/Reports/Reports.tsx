import { useTickets } from "../../hooks/useTickets";
import { useCategories } from "../../hooks/useCategories";
import { useUsers } from "../../hooks/useUsers";
import Loading from "../../components/common/Loading";
import ErrorState from "../../components/common/ErrorState";

const Reports = () => {
  const { tickets, loading: ticketsLoading, error: ticketsError } = useTickets();
  const { categories, loading: categoriesLoading } = useCategories();
  const { users, loading: usersLoading } = useUsers();

  if (ticketsLoading || categoriesLoading || usersLoading) return <Loading />;
  if (ticketsError) return <ErrorState message={ticketsError} />;

  const total = tickets.length;
  const resolvedCount = tickets.filter(
    (t) => t.status === "resolved" || t.status === "closed"
  ).length;
  const resolutionRate = total > 0 ? Math.round((resolvedCount / total) * 100) : 0;
  const openCount = tickets.filter((t) => t.status === "open").length;
  const inProgressCount = tickets.filter(
    (t) => t.status === "in_progress" || t.status === "assigned"
  ).length;
  const criticalCount = tickets.filter((t) => t.priority === "critical").length;

  // Categories breakdown
  const categoryStats = categories.map((cat) => {
    const count = tickets.filter((t) => t.category === cat.name).length;
    const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
    return { name: cat.name, count, percentage };
  });

  // Priorities breakdown
  const priorities = [
    { label: "Critical", key: "critical", color: "bg-red-500", count: tickets.filter((t) => t.priority === "critical").length },
    { label: "High", key: "high", color: "bg-amber-500", count: tickets.filter((t) => t.priority === "high").length },
    { label: "Medium", key: "medium", color: "bg-blue-500", count: tickets.filter((t) => t.priority === "medium").length },
    { label: "Low", key: "low", color: "bg-emerald-500", count: tickets.filter((t) => t.priority === "low").length },
  ];

  // Agent Workload breakdown
  const agents = users.filter((u) => u.role === "support_agent");
  const agentWorkload = agents.map((agent) => {
    const assigned = tickets.filter((t) => t.assignedAgent === agent.id).length;
    const resolved = tickets.filter(
      (t) => t.assignedAgent === agent.id && (t.status === "resolved" || t.status === "closed")
    ).length;
    const rate = assigned > 0 ? Math.round((resolved / assigned) * 100) : 0;
    return { agent, assigned, resolved, rate };
  });

  return (
    <div className="space-y-6 p-4 sm:p-6 bg-gray-50 dark:bg-gray-950 transition-colors min-h-screen">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Service Desk Reports & Analytics
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          System-wide performance, ticket distribution, and resolution metrics
        </p>
      </div>

      {/* KPI Cards - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="rounded-2xl bg-white dark:bg-gray-800 p-4 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Resolution Rate
          </span>
          <h2 className="mt-3 text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            {resolutionRate}%
          </h2>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {resolvedCount} of {total} tickets resolved
          </p>
        </div>

        <div className="rounded-2xl bg-white dark:bg-gray-800 p-4 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Open Queue
          </span>
          <h2 className="mt-3 text-3xl font-bold text-amber-600 dark:text-amber-400">
            {openCount}
          </h2>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Awaiting triage or assignment
          </p>
        </div>

        <div className="rounded-2xl bg-white dark:bg-gray-800 p-4 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Active Investigations
          </span>
          <h2 className="mt-3 text-3xl font-bold text-blue-600 dark:text-blue-400">
            {inProgressCount}
          </h2>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Assigned or currently in progress
          </p>
        </div>

        <div className="rounded-2xl bg-white dark:bg-gray-800 p-4 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Critical Incidents
          </span>
          <h2 className="mt-3 text-3xl font-bold text-red-600 dark:text-red-400">
            {criticalCount}
          </h2>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            High-severity issues logged
          </p>
        </div>
      </div>

      {/* Charts / Distribution Section - Stack on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Category Breakdown */}
        <div className="rounded-2xl bg-white dark:bg-gray-800 p-4 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-700 space-y-4 transition-colors">
          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
            Tickets by Category
          </h3>

          <div className="space-y-4">
            {categoryStats.map((item) => (
              <div key={item.name} className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
                  <span className="text-gray-500 dark:text-gray-400">{item.count} tickets ({item.percentage}%)</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Breakdown */}
        <div className="rounded-2xl bg-white dark:bg-gray-800 p-4 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-700 space-y-4 transition-colors">
          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
            Priority Breakdown
          </h3>

          <div className="space-y-4">
            {priorities.map((item) => {
              const pct = total > 0 ? Math.round((item.count / total) * 100) : 0;
              return (
                <div key={item.key} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-gray-700 dark:text-gray-300">{item.label} Priority</span>
                    <span className="text-gray-500 dark:text-gray-400">{item.count} tickets ({pct}%)</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Support Agent Performance & Workload */}
      <div className="rounded-2xl bg-white dark:bg-gray-800 p-4 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-700 space-y-4 transition-colors">
        <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
          Support Agent Workload & Resolution Metrics
        </h3>

        {/* Desktop Table - Hidden on mobile */}
        <div className="hidden sm:overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-4 sm:px-5 py-3">Agent Name</th>
                <th className="px-4 sm:px-5 py-3">Department</th>
                <th className="px-4 sm:px-5 py-3">Assigned Tickets</th>
                <th className="px-4 sm:px-5 py-3">Resolved / Closed</th>
                <th className="px-4 sm:px-5 py-3">Resolution Efficiency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-gray-700 dark:text-gray-300">
              {agentWorkload.map(({ agent, assigned, resolved, rate }) => (
                <tr key={agent.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <td className="px-4 sm:px-5 py-3.5 font-semibold text-gray-900 dark:text-gray-100">
                    {agent.name}
                  </td>
                  <td className="px-4 sm:px-5 py-3.5 text-gray-500 dark:text-gray-400">
                    {agent.department}
                  </td>
                  <td className="px-4 sm:px-5 py-3.5 font-bold text-blue-600 dark:text-blue-400">
                    {assigned}
                  </td>
                  <td className="px-4 sm:px-5 py-3.5 font-bold text-emerald-600 dark:text-emerald-400">
                    {resolved}
                  </td>
                  <td className="px-4 sm:px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 dark:bg-emerald-400 rounded-full"
                          style={{ width: `${rate}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 whitespace-nowrap">{rate}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View - Visible only on mobile */}
        <div className="sm:hidden space-y-4">
          {agentWorkload.map(({ agent, assigned, resolved, rate }) => (
            <div key={agent.id} className="rounded-lg border border-gray-100 dark:border-gray-700 p-4 space-y-3">
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{agent.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{agent.department}</p>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded bg-gray-50 dark:bg-gray-700/50 p-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Assigned</p>
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{assigned}</p>
                </div>
                <div className="rounded bg-gray-50 dark:bg-gray-700/50 p-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Resolved</p>
                  <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{resolved}</p>
                </div>
                <div className="rounded bg-gray-50 dark:bg-gray-700/50 p-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Efficiency</p>
                  <p className="text-lg font-bold text-gray-700 dark:text-gray-300">{rate}%</p>
                </div>
              </div>
              <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 dark:bg-emerald-400 rounded-full"
                  style={{ width: `${rate}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;

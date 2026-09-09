import type { Ticket } from "../../types/ticket";
import TicketStatusBadge from "./TicketStatusBadge";
import TicketPriorityBadge from "./TicketPriorityBadge";
import { formatDate } from "../../utils/formatDate";

interface TicketTableProps {
  tickets: Ticket[];
  onView?: (ticket: Ticket) => void;
  onDelete?: (ticketId: string) => void;
}

const TicketTable = ({ tickets, onView, onDelete }: TicketTableProps) => {
  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm transition-colors">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-gray-700 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-600">
            <tr>
              <th className="px-5 py-3.5">Ticket ID</th>
              <th className="px-5 py-3.5">Subject</th>
              <th className="px-5 py-3.5">Category</th>
              <th className="px-5 py-3.5">Priority</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5">Created Date</th>
              {(onView || onDelete) && <th className="px-5 py-3.5 text-right">Actions</th>}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-gray-700 dark:text-gray-300">
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-5 py-3.5 font-semibold text-blue-600 dark:text-blue-400">
                  {ticket.id}
                </td>

                <td className="px-5 py-3.5 font-medium text-gray-900 dark:text-gray-100 max-w-xs truncate">
                  {ticket.subject}
                </td>

                <td className="px-5 py-3.5 text-gray-600 dark:text-gray-400">
                  {ticket.category}
                </td>

                <td className="px-5 py-3.5">
                  <TicketPriorityBadge priority={ticket.priority} />
                </td>

                <td className="px-5 py-3.5">
                  <TicketStatusBadge status={ticket.status} />
                </td>

                <td className="px-5 py-3.5 text-gray-500 dark:text-gray-400 text-xs">
                  {formatDate(ticket.createdDate)}
                </td>

                {(onView || onDelete) && (
                  <td className="px-5 py-3.5 text-right space-x-2">
                    {onView && (
                      <button
                        type="button"
                        onClick={() => onView(ticket)}
                        className="rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                      >
                        View
                      </button>
                    )}
                    {onDelete && (
                      <button
                        type="button"
                        onClick={() => onDelete(ticket.id)}
                        className="rounded-lg border border-red-200 dark:border-red-900 bg-white dark:bg-gray-700 px-3 py-1 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 dark:hover:border-red-600 transition-colors"
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
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 shadow-sm transition-colors"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {ticket.id}
                  </h3>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mt-1">
                    {ticket.subject}
                  </p>
                </div>
                <TicketPriorityBadge priority={ticket.priority} />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Category</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {ticket.category}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Status</p>
                  <div className="mt-1">
                    <TicketStatusBadge status={ticket.status} />
                  </div>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500 dark:text-gray-400">Created</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {formatDate(ticket.createdDate)}
                  </p>
                </div>
              </div>

              {(onView || onDelete) && (
                <div className="flex gap-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                  {onView && (
                    <button
                      type="button"
                      onClick={() => onView(ticket)}
                      className="flex-1 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                    >
                      View
                    </button>
                  )}
                  {onDelete && (
                    <button
                      type="button"
                      onClick={() => onDelete(ticket.id)}
                      className="flex-1 rounded-lg border border-red-200 dark:border-red-900 bg-white dark:bg-gray-700 px-3 py-2 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
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

export default TicketTable;
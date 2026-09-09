interface EmptyStateProps {
  message?: string;
}

const EmptyState = ({
  message = "No data found",
}: EmptyStateProps) => {
  return (
    <div className="rounded-xl bg-white dark:bg-gray-800 p-8 text-center shadow-sm border border-gray-100 dark:border-gray-700">
      <svg className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
      <p className="text-gray-500 dark:text-gray-400 font-medium">{message}</p>
    </div>
  );
};

export default EmptyState;
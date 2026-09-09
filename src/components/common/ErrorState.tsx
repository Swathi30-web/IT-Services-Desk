interface ErrorStateProps {
  message?: string;
}

const ErrorState = ({
  message = "Something went wrong",
}: ErrorStateProps) => {
  return (
    <div className="rounded-xl bg-red-50 dark:bg-red-950/30 p-8 text-center border border-red-100 dark:border-red-900/50">
      <svg className="h-12 w-12 text-red-400 dark:text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p className="text-red-600 dark:text-red-400 font-medium">{message}</p>
    </div>
  );
};

export default ErrorState;
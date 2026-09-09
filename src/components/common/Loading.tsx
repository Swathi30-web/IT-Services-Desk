const Loading = () => {
  return (
    <div className="flex items-center justify-center p-8 min-h-96">
      <div className="text-center">
        <div className="inline-block mb-4">
          <div className="h-12 w-12 border-4 border-gray-300 dark:border-gray-600 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
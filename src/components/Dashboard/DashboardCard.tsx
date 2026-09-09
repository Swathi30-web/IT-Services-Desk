interface DashboardCardProps {
  title: string;
  value: number;
  description?: string;
  badgeColor?: "blue" | "amber" | "purple" | "emerald";
}

const DashboardCard = ({
  title,
  value,
  description,
  badgeColor = "blue",
}: DashboardCardProps) => {
  const colorMap = {
    blue: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      text: "text-blue-600 dark:text-blue-400",
      border: "border-blue-100 dark:border-blue-900/30",
    },
    amber: {
      bg: "bg-amber-50 dark:bg-amber-900/20",
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-100 dark:border-amber-900/30",
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-900/20",
      text: "text-purple-600 dark:text-purple-400",
      border: "border-purple-100 dark:border-purple-900/30",
    },
    emerald: {
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
      text: "text-emerald-600 dark:text-emerald-400",
      border: "border-emerald-100 dark:border-emerald-900/30",
    },
  };

  const style = colorMap[badgeColor] || colorMap.blue;

  return (
    <div className={`rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition hover:shadow-md dark:hover:shadow-gray-900/50 dark:hover:shadow-md`}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          {title}
        </p>
        <span className={`inline-flex h-8 w-8 items-center justify-center rounded-xl ${style.bg} ${style.text} text-sm font-bold transition-colors`}>
          #
        </span>
      </div>

      <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        {value}
      </h2>

      {description && (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {description}
        </p>
      )}
    </div>
  );
};

export default DashboardCard;
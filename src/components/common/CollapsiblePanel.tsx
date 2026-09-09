import { useState } from "react";
import type { ReactNode } from "react";

interface CollapsiblePanelProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  icon?: ReactNode;
}

const CollapsiblePanel = ({
  title,
  children,
  defaultOpen = true,
  icon,
}: CollapsiblePanelProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          {icon && <div className="text-gray-600 dark:text-gray-400">{icon}</div>}
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-left">
            {title}
          </h3>
        </div>
        <svg
          className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapsiblePanel;

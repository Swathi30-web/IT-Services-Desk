import type { ReactNode } from "react";

interface MobileFormProps {
  children: ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
}

const MobileForm = ({ children, onSubmit }: MobileFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 sm:space-y-5"
    >
      {children}
    </form>
  );
};

interface MobileFormGroupProps {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  children: ReactNode;
}

export const MobileFormGroup = ({
  label,
  error,
  fullWidth = true,
  children,
}: MobileFormGroupProps) => {
  return (
    <div className={fullWidth ? "w-full" : "flex-1"}>
      {label && (
        <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {label}
        </label>
      )}
      {children}
      {error && (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

interface MobileFormRowProps {
  children: ReactNode;
}

export const MobileFormRow = ({ children }: MobileFormRowProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {children}
    </div>
  );
};

export default MobileForm;

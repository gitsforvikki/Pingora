import { ReactNode } from "react";

export const WithLoading = ({
  children,
  isLoading,
}: {
  children: ReactNode;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
      </div>
    );
  }
  return <div>{children}</div>;
};

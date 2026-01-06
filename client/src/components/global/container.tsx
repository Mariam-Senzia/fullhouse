import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

const Container = ({ children }: ContainerProps) => {
  return <div className="px-4 md:px-6 lg:px-28">{children}</div>;
};

export default Container;

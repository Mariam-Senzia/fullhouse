import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

const Container = ({ children }: ContainerProps) => {
  return <div className="max-w-7xl mx-auto px-4">{children}</div>;
};

export default Container;

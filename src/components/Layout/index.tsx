import { Header } from "../Header";
import "./index.css";

type LayoutProps = {
  children?: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <div className="layout-content">{children}</div>
    </div>
  );
};

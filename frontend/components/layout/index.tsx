import { Sidebar } from "@/components/sidebar";
import { Navbar } from "../navbar";
import { Container } from "./container";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="flex h-screen pt-20">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default Layout;

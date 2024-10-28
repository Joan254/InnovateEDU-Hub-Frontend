import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";

export default function AppLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-grow p-6">{children}</main>
            <Footer />
        </div>
    );
}

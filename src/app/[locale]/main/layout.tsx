import Footer from "@/components/Footer/Footer";
import HeaderComponent from "@/components/Header/Header.component";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <HeaderComponent />
            <main>{children}</main>
            <Footer />
        </>
    );
}

import LandPageNavbar from "./_components/navbar";

export default function LandingPageLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col container relative">
            <LandPageNavbar/>
            {children}
        </div>
    );
}

import Link from "next/link";
import Menu from "./menu";
import { Button } from "@/components/ui/button";
import GlassSheet from "@/components/global/glass-sheet";
import { MenuIcon } from "lucide-react";

type Props = {};

const LandPageNavbar = (props: Props) => {
  return (
    <div className="w-full flex justify-between sticky top-0 items-center py-5 z-50 bg-black bg-opacity-50 backdrop-blur-md px-4">
      <p className="font-bold text-2xl text-white">Groupal.</p>

      {/* Desktop Menu */}
      <Menu orientation="desktop" />

      {/* Right-side Controls */}
      <div className="flex gap-4 items-center">
        {/* Login Button */}
        <Link href="/sign-in">
          <Button
            variant="outline"
            className="bg-themeBlack text-white rounded-2xl flex gap-2 border-themeGray hover:bg-themeGray"
          >
            Login
          </Button>
        </Link>

        {/* Mobile Menu Button */}
        <GlassSheet
          triggerClass="lg:hidden flex items-center"
          trigger={
            <Button variant="ghost" className="hover:bg-transparent text-white">
              <MenuIcon size={30} />
            </Button>
          }
        >
          <Menu orientation="mobile" />
        </GlassSheet>
      </div>
    </div>
  );
};

export default LandPageNavbar;

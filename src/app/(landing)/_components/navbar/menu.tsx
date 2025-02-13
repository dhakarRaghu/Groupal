"use client";

import { Card, CardContent } from "@/components/ui/card";
import { GROUPLE_CONSTANTS } from "@/constants";
import { useNavigation } from "@/hooks/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

type MenuProps = {
  orientation: "mobile" | "desktop";
};

const Menu = ({ orientation }: MenuProps) => {
  const { section, onSetSection } = useNavigation();

  return (
    <Card
      className={cn(
        "bg-themeGray border-themeGray bg-clip-padding backdrop-blur_safari backdrop-filter backdrop-blur-2xl bg-opacity-60 p-1 rounded-xl",
        orientation === "desktop" ? "lg:flex hidden" : "flex flex-col w-full p-4"
      )}
    >
      <CardContent className="p-0 flex gap-2 flex-col lg:flex-row">
        {GROUPLE_CONSTANTS.landingPageMenu.map((menuItem) => (
          <Link
            key={menuItem.id} //  Ensuring unique key
            href={menuItem.path}
            onClick={(e) => {
              if (menuItem.section) {
                e.preventDefault(); //  Prevents page reload only for sections
                onSetSection(menuItem.path);
              }
            }}
            className={cn(
              "rounded-xl flex gap-2 py-2 px-4 items-center transition-colors",
              section === menuItem.path
                ? "bg-[#09090B] border-[#27272A] text-white"
                : "hover:bg-gray-700 hover:text-white"
            )}
          >
            {menuItem.icon} {/*  Ensures icon is always displayed */}
            {menuItem.label}
          </Link>
        ))}
      </CardContent>
    </Card>
  );
};

export default Menu;

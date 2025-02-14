"use client";
import React, { JSX } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

type DropDownProps = {
  title: string;
  trigger: JSX.Element;
  children: React.ReactNode;
  ref?: React.RefObject<HTMLButtonElement>;
};

export const DropDown = ({ trigger, title, children, ref }: DropDownProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild ref={ref}>
        {trigger}
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="start"
        sideOffset={8}
        className="z-50 w-56 rounded-2xl border border-themeGray bg-themeBlack p-4 shadow-lg backdrop-blur-xl"
      >
        <h4 className="pl-3 text-sm text-gray-200">{title}</h4>
        <Separator className="my-3 bg-themeGray" />
        <div className="flex flex-col space-y-2">{children}</div>
      </PopoverContent>
    </Popover>
  );
};

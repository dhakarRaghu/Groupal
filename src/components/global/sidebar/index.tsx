"use client";
import React from "react";
import useGroupChatOnline from "@/hooks/groups";
import { useSideBar } from "@/hooks/navigation";
import { cn } from "@/lib/utils";
import { DropDown } from "../drop-down";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaUsers } from "react-icons/fa";        // Icon for group
import { AiOutlineCaretDown } from "react-icons/ai"; // Icon for dropdown caret

type Props = {
  groupid: string;
  userid: string;
  mobile?: boolean;
};

export interface IGroupinfo {
  status: number;
  group:
    | {
        id: string;
        name: string;
        category: string;
        thumbnail: string | null;
        description: string | null;
        gallery: string[];
        jsonDescription: string | null;
        htmlDescription: string | null;
        privacy: boolean;
        active: boolean;
        createdAt: Date;
        userId: string;
        icon: string;
      }
    | undefined;
}

export interface IChannels {
  id: string;
  name: string;
  icon: string;
  createdAt: Date;
  groupId: string | null;
}

export interface IGroups {
  status: number;
  groups:
    | {
        icon: string | null;
        id: string;
        name: string;
      }[]
    | undefined;
}

const SideBar = (props: Props) => {
  const { groupid, userid, mobile } = props;
  const { groupInfo, groups, channels } = useSideBar(groupid);

  // Hook that sets up presence (if needed)
  useGroupChatOnline(userid);

  return (
    <div
      className={cn(
        "flex flex-col bg-gray-900 text-white border-r border-gray-800",
        // Height and scroll behaviors
        "h-screen overflow-hidden",
        // If mobile, take full width; otherwise, fixed at 300px for md+
        !mobile ? "hidden md:flex md:w-[300px] md:fixed" : "w-full"
      )}
    >
      {/* Header */}
      <div className="flex-shrink-0 border-b border-gray-800 p-4">
        <h2 className="text-xl font-semibold tracking-wide">My Group App</h2>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {/* Groups Dropdown */}
        {groups.groups && groups.groups.length > 0 && (
          <DropDown
            title="Groups"
            trigger={
              <button className="flex w-full items-center justify-between rounded-lg bg-gray-800 px-3 py-2 text-sm text-gray-200 hover:bg-gray-700 focus:outline-none">
                <div className="flex items-center gap-x-3">
                  {/* Group Icon or Fallback */}
                  {groupInfo.group?.icon ? (
                    <img
                      src={`https://ucarecdn.com/${groupInfo.group?.icon}/`}
                      alt="Group icon"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <FaUsers className="h-6 w-6 text-gray-400" />
                  )}
                  <p className="truncate">{groupInfo.group?.name}</p>
                </div>
                <AiOutlineCaretDown className="h-5 w-5 text-gray-400" />
              </button>
            }
          >
            {/* List of other groups */}
            {groups.groups.map(
              (item) =>
                item.id !== groupid && (
                  <Link
                    key={item.id}
                    href={`/group/${item.id}/channel/${channels?.channels?.[0]?.id}`}
                  >
                    <Button
                      variant="ghost"
                      className="flex w-full items-center gap-2 justify-start rounded-none px-2 py-2 text-gray-200 hover:bg-gray-700"
                    >
                      {item.icon ? (
                        <img
                          src={`https://ucarecdn.com/${item.icon}/`}
                          alt="Group icon"
                          className="h-5 w-5 rounded-full"
                        />
                      ) : (
                        <FaUsers className="h-5 w-5 text-gray-400" />
                      )}
                      <span className="truncate">{item.name}</span>
                    </Button>
                  </Link>
                )
            )}
          </DropDown>
        )}

        {/* Channel list or Additional Sidebar Info */}
        <div>
          <p className="text-gray-400">Channel List / Additional Sidebar Info</p>
          {/* Example: map over channels?.channels if needed */}
        </div>
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 border-t border-gray-800 p-4">
        <p className="text-sm text-gray-500">© 2025 My Group App</p>
      </div>
    </div>
  );
};

export default SideBar;

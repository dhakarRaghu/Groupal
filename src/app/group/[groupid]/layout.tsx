import { onAuthenticatedUser } from "@/app/actions/auth";
import { onGetAllGroupMembers, onGetGroupChannels, onGetGroupInfo, onGetGroupSubscriptions, onGetUserGroups } from "@/app/actions/groups";
import SideBar from "@/components/global/sidebar";
import { auth } from "@clerk/nextjs/server";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  children: React.ReactNode;
  params: {
    groupid: string;
  };
}

const GroupLayout = async (props: Props) => {
  const {groupid} = await props.params;
  const query = new QueryClient();
  const user = await onAuthenticatedUser();
  if (!user.id) redirect("/sign-in");

  // group info
  await query.prefetchQuery({
    queryKey: ["group-info"],
    queryFn: () => onGetGroupInfo(groupid),
  });
  // user groups
  await query.prefetchQuery({
    queryKey: ["user-groups"],
    queryFn: () => onGetUserGroups(user.id as string),
  });

  // channels
  await query.prefetchQuery({
    queryKey: ["group-channels"], 
    queryFn: () => onGetGroupChannels(groupid),
    });

    //group subscriptions

    await query.prefetchQuery({
      queryKey: ["group-subscriptions"],
      queryFn: () => onGetGroupSubscriptions(groupid),
    });

    //member-chats
    await query.prefetchQuery({
      queryKey: ["member-chats"],
      queryFn: () => onGetAllGroupMembers(groupid),
    });

  // 404 the page could not be found

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="flex h-screen md:pt-5">
        <SideBar groupid = {groupid} userid= {user.id} />
      </div>
    </HydrationBoundary>
  );
};

export default GroupLayout;
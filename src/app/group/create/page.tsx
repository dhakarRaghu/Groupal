"use client";

import { useAuth } from "@clerk/nextjs";
import { onCreateNewGroup } from "@/app/group/create/actions/group-action"; // ✅ Server Action
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const GroupCreatePage = () => {
  const { userId } = useAuth(); // ✅ Fetch auth client-side
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // ✅ State for user input
  const [groupName, setGroupName] = useState("");
  const [category, setCategory] = useState("");

  const handleCreateGroup = async () => {
    if (!userId) {
      router.push("/sign-in");
      return;
    }
  
    if (!groupName || !category) {
      alert("Please provide a group name and select a category.");
      return;
    }
  
    setLoading(true);
    try {
      console.log("🟡 Client: Calling server to create group...");
  
      // ✅ Call the server action
      const created = await onCreateNewGroup(userId, {
        name: groupName,
        category,
        privacy: "PRIVATE",
      });
  
      console.log("🟢 Client: Server responded with:", created);
  
      // ✅ Redirect if an existing group is found
      if (created && 'channel' in created && created.id && created.channel.length > 0) {
        const firstChannel = created.channel[0]; // ✅ Get first channel
        router.push(`/group/${created.id}/channel/${firstChannel.id}`);
      } else {
        console.error("❌ No channel found for the group");
      }
    } catch (error) {
      console.error("❌ Client: Error creating group:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="px-7 flex flex-col">
      <h5 className="font-bold text-base text-themeTextWhite">
        Create a New Group
      </h5>
      <p className="text-themeTextGray leading-tight">
        Free for 14 days, then $99/month. Cancel anytime. All features.
        Unlimited everything. No hidden fees.
      </p>

      {/* ✅ Group Name Input */}
      <Input
        type="text"
        placeholder="Enter group name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        className="mt-4"
      />

      {/* ✅ Category Selection (Fixed) */}
      <Select onValueChange={setCategory} value={category}>
        <SelectTrigger className="mt-4">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Education">Education</SelectItem>
          <SelectItem value="Technology">Technology</SelectItem>
          <SelectItem value="Business">Business</SelectItem>
          <SelectItem value="Health">Health</SelectItem>
          <SelectItem value="Gaming">Gaming</SelectItem>
        </SelectContent>
      </Select>

      {/* ✅ Create Button */}
      <Button onClick={handleCreateGroup} className="w-full mt-5" disabled={loading}>
        {loading ? "Creating..." : "Create Group"}
      </Button>
    </div>
  );
};

export default GroupCreatePage;

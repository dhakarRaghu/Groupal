import { onCreateNewChannel } from "@/app/actions/channels"
import { onGetGroupChannels } from "@/app/actions/groups"
import { IGroupinfo, IGroups } from "@/components/global/sidebar"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { usePathname } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

export const useNavigation = () => {
    const pathName = usePathname()
    const [section, setSection] = useState<string>(pathName) 
    const onSetSection = (page : string ) => setSection(page)
    return {
        section,
        onSetSection
    }

}


export const useSideBar = (groupid: string) => {
    const { data: groups } = useQuery({
        queryKey: ["user-groups"],
    }) as { data: IGroups };

    const { data: groupInfo } = useQuery({
        queryKey: ["group-info"],
    }) as { data: IGroupinfo };

    const { data: channels } = useQuery({
        queryKey: ["group-channels"],
        queryFn: () => onGetGroupChannels(groupid),
    });

    const client = useQueryClient();

    const { isPending, mutate, isError, variables } = useMutation({
        mutationFn: (data: {
            id: string;
            name: string;
            icon: string;
            createdAt: Date;
            groupId: string | null;
        }) => onCreateNewChannel(groupid, {
            id: data.id,
            name: data.name.toLowerCase(),
            icon: data.icon,
        }),
        onSettled: async () => {
           return await client.invalidateQueries({
                queryKey: ["group-channels"],
            });
        },
    });
        if (isPending) 
                toast.success("Channel created");
            
            if (isError) {
                toast.error("Oops! something went wrong");
            }
        
            return {groupInfo , groups , mutate ,variables , isPending , channels}


};
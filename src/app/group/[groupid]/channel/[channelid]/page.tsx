import { onGetChannelInfo } from "@/app/actions/channels";
import { onGetGroupInfo } from "@/app/actions/groups";
import { onAuthenticatedUser } from "@/app/actions/auth";
import { currentUser } from "@clerk/nextjs/server";
import { query } from "@";
import { QueryClient } from "@tanstack/react-query";

interface Props {
  params: {
    groupid: string;
    channelid: string;
  };
}

const GroupChannelPage = async (props : Props) => {
    const { params } = props;
    const client = new QueryClient();
    const user = await currentUser();
    const authUser = await onAuthenticatedUser();

    await client.prefetchQuery({
        queryKey: ['channel-info'],
        queryFn: () => onGetChannelInfo(params.channelid),
    })

    await client.prefetchQuery({
        queryKey: ['about-group-info'],
        queryFn: () => onGetGroupInfo(params.groupid),
    })

    return <div>GroupChannelPage</div>
  
};

export default GroupChannelPage;

import { onGetChannelInfo } from "@/app/actions/channels";
import { onGetGroupInfo } from "@/app/actions/groups";
import { onAuthenticatedUser } from "@/app/actions/auth";

interface Props {
  params: {
    groupid: string;
    channelid: string;
  };
}

const GroupChannelPage = async (props : Props) => {
    const { params } = props;
  const user = await onAuthenticatedUser();

  if (!user || user.status !== 200) {
    return <div>Unauthorized. Please log in.</div>;
  }
console.log("user : " , user);
  const channelInfo = await onGetChannelInfo(params.channelid);
  const groupInfo = await onGetGroupInfo(params.groupid);

  if (channelInfo.status !== 200 || !channelInfo.channel) {
    return <div>Channel not found.</div>;
  }

  return (
    <div>
      <h2>{channelInfo.channel.name} Channel</h2>
      <p>Group: {groupInfo?.group?.name || "Unknown"}</p>
      <h3>Recent Posts</h3>
      <ul>
        {channelInfo.channel.posts.map((post) => (
          <li key={post.id}>
            <strong>{post.author.firstname} {post.author.lastname}</strong>: {post.channel.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupChannelPage;

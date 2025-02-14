import { supabaseClient } from "@/lib/utils";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { onOnline } from "@/redux/slices/online-member-slice"; // Adjust the import path as necessary
import { useDispatch } from "react-redux";

const useGroupChatOnline = (userid: string) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    
    const channel = supabaseClient.channel("tracking");

    channel
      .on("presence", { event: "sync" }, () => {
        const state: any = channel.presenceState();
        console.log(state);

        // Iterate over the state and dispatch onOnline with an array for each member found
        for (const user in state) {
          dispatch(
            onOnline({
              members: [
                {
                  id: state[user][0].member.userid,
                },
              ],
            })
          );
        }
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            member: {
              userid,
            },
          });
        }
      });

    return () => {
      channel.unsubscribe();
    };
  }, [dispatch, userid]);
};

export default useGroupChatOnline;

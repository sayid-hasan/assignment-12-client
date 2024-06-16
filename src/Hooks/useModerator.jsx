import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useModerator = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  //   const axiosPublic = useAxiosPublic();
  const {
    data: isModerator,

    isPending: isModeratorLoading,
  } = useQuery({
    queryKey: [user?.email, "isModerator"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/moderator/${user?.email}`);
      console.log(res);
      return res?.data?.moderator;
    },
  });
  console.log("isModerator", isModerator);
  return [isModerator, isModeratorLoading];
};

export default useModerator;

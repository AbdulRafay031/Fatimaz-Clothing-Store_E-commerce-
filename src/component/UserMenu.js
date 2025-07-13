import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FaUserCircle } from "react-icons/fa";

const UserMenu = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status !== "authenticated") return null;

  return (
    <div
      onClick={() => router.push("/UsePanel/account")}
      className="cursor-pointer text-3xl text-blue-400 hover:text-blue-600 rounded-full overflow-hidden w-10 h-10 border-2 border-blue-400 flex items-center justify-center"
      title="Account"
    >
      <FaUserCircle className="w-full h-full" />
    </div>
  );
};

export default UserMenu;

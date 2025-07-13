import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (session?.user?.email) {
        try {
          const res = await axios.get(`/api/users/get?email=${session.user.email}`);
          setUser(res.data);
        } catch (error) {
          console.error("Failed to fetch user data", error);
        }
      }
    };
    fetchUser();
  }, [session]);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

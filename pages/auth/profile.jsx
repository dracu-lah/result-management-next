import React, { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { FaUserCircle } from "react-icons/fa";
const profile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session == null) {
      router.push("/");
    }
  }, [session]); 
  return (
    <div className="flex justify-center items-center  min-h-[90vh] text-black uppercase">
      <div className="bg-secondary rounded-lg flex flex-col gap-y-4 items-center justify-between p-6">

        <FaUserCircle className="hover:opacity-80 duration-300 h-20 w-10" />
        <div>
          <p>
            USER : <span>{session?.user.name}</span>
          </p>

        </div>
        <button className="btn" onClick={() => signOut()}>
          sign out
        </button>
      </div>
    </div>
  );
};

export default profile;

import Image from "next/image";
import React, { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

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
        <Image
          className="hover:opacity-80 duration-300"
          src={session?.user.image}
          width={100}
          height={100}
          alt={session?.user.name}
        />
        <div>
          <p>
            Name : <span>{session?.user.name}</span>
          </p>
          <p>
            Email : <span>{session?.user.email}</span>
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

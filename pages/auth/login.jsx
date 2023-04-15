import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Component() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);
  
  if (!session) {
    return (
      <div className="flex flex-col gap-10 justify-center items-center min-h-[80vh]">
        <p className="text-2xl">Please Sign in for using this website</p>
        <button className="btn btn-secondary" onClick={() => signIn()}>
          Sign in
        </button>
      </div>
    );
  }
}

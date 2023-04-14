import Link from "next/link";
import React from "react";
import Switcher from "./Switcher";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="z-50 sticky top-0 navbar bg-base-100  border-b border-b-slate-100/20 opacity-90 backdrop-filter backdrop-blur-lg ">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case md:text-xl" href={"/"}>
          Result Management
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal items-center px-4 gap-x-2">
          <li>
            <Link href={"/results"}>Results</Link>
          </li>

          <li>
            <a className="p-0 h-0">
              <Switcher />
            </a>
          </li>
          <li>
            <a className="p-0 h-0">
              {session && (
                <Image
                  onClick={() => router.push("/auth/profile")}
                  className="hover:opacity-80 duration-300"
                  src={session.user.image}
                  width={40}
                  height={40}
                  alt={session.user.name}
                />
              )}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

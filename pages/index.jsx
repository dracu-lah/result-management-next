import UploadCSV from "@/components/uploaddata/UploadCSV";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const index = () => {
  const router = useRouter();
  // const { data: session } = useSession();

  // useEffect(() => {
  //   if (!session) {
  //     router.push("/auth/login");
  //   }
  // }, [session]);

  return (
    <div>
   
      <main className="min-h-[90vh] items-center justify-center flex ">
        <UploadCSV />
      </main>
    </div>
  );
};

export default index;

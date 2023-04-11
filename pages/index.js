import UploadCSV from "@/components/UploadCSV";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const index = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.push("/auth/login");
    }
  }, [session]);

  return (
    <div className="min-h-[90vh] items-center justify-center flex ">
      <UploadCSV />
    </div>
  );
};

export default index;

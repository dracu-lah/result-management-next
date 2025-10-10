import ResultData from "@/components/resultdata/ResultData";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const results = () => {
  const router = useRouter();
  // const { data: session } = useSession();

  // useEffect(() => {
  //   if (!session) {
  //     router.push("/auth/login");
  //   }
  // }, [session]);

  return <ResultData />;
};

export default results;

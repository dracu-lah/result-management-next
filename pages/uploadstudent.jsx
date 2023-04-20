import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const uploadstudent = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.push("/auth/login");
    }
  }, [session]);

  // return <UploadStudentCSV />;
  return (
    <>
      <h1>uploadstudent</h1>
    </>
  );
};

export default uploadstudent;

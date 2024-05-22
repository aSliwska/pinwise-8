"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function useRequireLogin() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // fetch("http://localhost:8080/api/verify", {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   },
    // }).then((response) => {
    //   if (response.ok) {
    //     console.log("Authorized - verified");
    //     setAuthorized(true);
    //   } else {
    //     console.log("Unauthorized - verify failed");
    //     setAuthorized(false);
    //     // router.push("/login");
    //   }
    // });
    setAuthorized(localStorage.getItem("token") !== null);
  }, [router]);

  return { authorized, setAuthorized };
}

export default useRequireLogin;

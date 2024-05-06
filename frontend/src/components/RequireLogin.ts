"use client";

import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";

export default function RequireLogin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);
  return authorized ? children : null;
}

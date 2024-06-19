import { Button, Input } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from 'react';




export const EmailChangeconfirmPage = () => {
    const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/profile/settings');
    }, 6000);

    return () => clearTimeout(timer);
  }, [router]);

    return (
        <div className="flex flex-col items-center justify-center gap-12 rounded-lg text-white">
        <div className="text-5xl font-bold">Email zmieniony pomyślnie</div>
        <div className="text-xl">
            Od teraz ten adres będzie Ci służył do logowania do strony PinWise.
        </div>
        </div>
    );
};
import react from "react";
import { Button, Input } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoggedOutPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center gap-12 rounded-lg text-white">
      <div className="text-5xl font-bold">Wylogowano pomyślnie</div>
      <div className="text-xl">
        Witaj na PinWise! Możesz się teraz zalogować.
      </div>
      <Button
        type="primary"
        size="large"
        block
        onClick={() => {
          router.push("/login");
        }}
      >
        Zaloguj się
      </Button>
    </div>
  );
};
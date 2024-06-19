import react from "react";
import { Button, Input } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SuccessPanel = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center gap-12 rounded-lg text-verywhite font-verywhite">
      <div className="text-5xl font-bold">Konto założone pomyślnie</div>
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

export { SuccessPanel };

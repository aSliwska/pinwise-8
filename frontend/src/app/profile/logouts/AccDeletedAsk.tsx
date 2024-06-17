import react from "react";
import { Button, Input } from "antd";
import { useState } from "react";
import { isMapSidemenuOpenAtom, userAtom } from "@/components/store";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";

const AccDeletedAsk = () => {
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();
  return (
    <div className="flex min-h-full justify-center color-bg-gradient-dark-gray w-5/6 min-w-[500px]">
    <div className="pl-10 flex min-h-full w-9/12 min-w-[500px] flex-col">
    <div className="flex flex-col items-center justify-center gap-12 rounded-lg text-white">
      <div className="text-5xl font-bold">Czy na pewno chcesz usunąć swoje konto?</div>
      <div className="text-xl">
        Ta akcja jest nieodwracalna. Klinkij przycisk poniżej, aby wysłać email z potwierdzeniem na adres (temp@qmail.com).
      </div>
      <Button
        type="primary"
        size="large"
        color="red"
        block
        onClick={() => {
          setUser((user) => ({ ...user, isAuthenticated: false }));
          localStorage.removeItem("token");
          router.push('/profile/logouts?mode=AccDeletedPage');
        }}
      >
        Usuń konto
      </Button>
    </div>
    </div>
    </div>
  );
};

export {AccDeletedAsk};
import react from "react";
import { Button, Input } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from 'react';

export const AccDeletedPage = () => {
  const router = useRouter();

useEffect(() => {
  const timer = setTimeout(() => {
    router.push('/map');
  }, 6000);

  return () => clearTimeout(timer);
}, [router]);

  return (
    <div className="flex flex-col items-center justify-center gap-12 rounded-lg text-white">
      <div className="text-5xl font-bold">Twoje konto zostało usunięte</div>
      <div className="text-xl">
        Dziękujemy, że byłeś z nami!
      </div>
    </div>
  );
};
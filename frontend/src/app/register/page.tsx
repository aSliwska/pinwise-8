"use client";
import { Button, Input } from "antd";
import { useState } from "react";
import { RegisterPanel } from "@/app/register/registerPanel";
import { PersonalDataPanel } from "@/app/register/personalDataPanel";

export default function RegisterPage() {
  const [mode, setMode] = useState<string>("register");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  return (
    <main className="flex min-h-full min-w-full flex-col items-center justify-between color-bg-gradient-light-gray">
      <div className="flex min-h-full items-center justify-center color-bg-gradient-dark-gray w-3/5">
        {mode === "register" && (
          <RegisterPanel
            name={name}
            email={email}
            setMode={setMode}
            setName={setName}
            setEmail={setEmail}
          />
        )}
        {mode === "personalData" && <PersonalDataPanel setMode={setMode} />}
      </div>
    </main>
  );
}

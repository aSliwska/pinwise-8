"use client";
import { AccDeletedPage } from "@/app/profile/logouts/AccDeleted";
import { AccDeletedAsk } from "@/app/profile/logouts/AccDeletedAsk";
import { EmailChangeconfirmPage } from "@/app/profile/logouts/EmailChangeConfirm";
import { useEffect, useState } from "react";
import { redirect } from 'next/navigation';
import { isMapSidemenuOpenAtom, userAtom } from "@/components/store";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";

export default function RegisterPage() {
  const [mode, setMode] = useState<string>("AccDeletedAsk");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [gender, setGender] = useState<string>("Wybierz");
  const [age, setAge] = useState<string>("Wybierz");
  const [education, setEducation] = useState<string>("Wybierz");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   const handleSubmit = async () => {
//     const response: any = await register(username, email, password);
//     if (response.success) {
//       setMode("success");
//       setErrorMessage(null);
//     } else {
//       if (response.message) {
//         setErrorMessage(response.message);
//         setMode("register");
//       }
//     }
//   };

  useEffect(() => {
    if (mode) {
      setMode(mode as string);
    }
  }, [mode]);

  return (
    <main className="flex min-h-full min-w-full flex-col items-center justify-between color-bg-gradient-light-gray">
      <div className="flex flex-col min-h-full items-center justify-center color-bg-gradient-dark-gray w-3/5">
        {mode === "AccDeletedPage" && (
          <AccDeletedPage
            // username={username}
            // email={email}
            // password={password}
            // errorMessage={errorMessage}
            // setMode={setMode}
            // setUsername={setUsername}
            // setEmail={setEmail}
            // setPassword={setPassword}
            // setErrorMessage={setErrorMessage}
          />
        )}
        {mode === "AccDeletedAsk" && (
          <AccDeletedAsk
            // setAge={setAge}
            // setMode={setMode}
            // setGender={setGender}
            // handleSubmit={handleSubmit}
            // setEducation={setEducation}
          />
        )}
        {/* {mode === "emailSent" && <EmailSentPanel setMode={setMode} />} */}
        {mode === "EmailChangeconfirmPage" && <EmailChangeconfirmPage />}
      </div>
    </main>
  );
}
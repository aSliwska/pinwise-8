"use client";
import { AccDeletedPage } from "@/app/profile/logouts/AccDeleted";
import { AccDeletedAsk } from "@/app/profile/logouts/AccDeletedAsk";
import { EmailChangeconfirmPage } from "@/app/profile/logouts/EmailChangeConfirm";
import { useEffect, useState } from "react";
import { redirect } from 'next/navigation';
import { isMapSidemenuOpenAtom, userAtom } from "@/components/store";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { deleteUser, getUserId } from "../../../../logic/profile";

export default function RegisterPage() {
  const [mode, setMode] = useState<string>("AccDeletedAsk");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [gender, setGender] = useState<string>("Wybierz");
  const [age, setAge] = useState<string>("Wybierz");
  const [education, setEducation] = useState<string>("Wybierz");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (mode) {
      setMode(mode as string);
    }
  }, [mode]);

  const [user, setUser] = useAtom(userAtom);

  if (mode === 'AccDeletedPage'){
    const token = localStorage.getItem('token');
    console.log(token);
    const email = user.email;
    var userId: number;
    getUserId(email, token).then((id: number)=>{
        userId = id;
      }).then(()=>{
        deleteUser(userId, token).then(()=>{
        localStorage.removeItem("token");
        setUser((user) => ({ ...user, isAuthenticated: false }));
      });
  });
  }

  return (
    <main className="flex min-h-full min-w-full flex-col items-center justify-between color-bg-gradient-light-gray">
      <div className="flex flex-col min-h-full items-center justify-center color-bg-gradient-dark-gray w-3/5">
        {mode === "AccDeletedPage" && (
          <AccDeletedPage />
        )}
        {mode === "AccDeletedAsk" && (
          <AccDeletedAsk setMode={setMode}/>
        )}
        {/* {mode === "emailSent" && <EmailSentPanel setMode={setMode} />} */}
        {mode === "EmailChangeconfirmPage" && <EmailChangeconfirmPage />}
      </div>
    </main>
  );
}
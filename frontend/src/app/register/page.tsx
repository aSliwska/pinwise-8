"use client";
import { PersonalDataPanel } from "@/app/register/personalDataPanel";
import { RegisterPanel } from "@/app/register/registerPanel";
import { SuccessPanel } from "@/app/register/successPanel";
import { register } from "@/logic/authorization";
import { useState } from "react";

export default function RegisterPage() {
  const [mode, setMode] = useState<string>("register");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [gender, setGender] = useState<string>("Wybierz");
  const [age, setAge] = useState<string>("Wybierz");
  const [education, setEducation] = useState<string>("Wybierz");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    const response: any = await register(username, email, password);
    if (response.success) {
      setMode("success");
      setErrorMessage(null);
    } else {
      if (response.message) {
        setErrorMessage(response.message);
        setMode("register");
      }
    }
  };

  return (
    <main className="flex min-h-full min-w-full flex-col items-center justify-between color-bg-gradient-light-gray">
      <div className="flex flex-col min-h-full items-center justify-center color-bg-gradient-dark-gray w-3/5">
        {mode === "register" && (
          <RegisterPanel
            username={username}
            email={email}
            password={password}
            errorMessage={errorMessage}
            setMode={setMode}
            setUsername={setUsername}
            setEmail={setEmail}
            setPassword={setPassword}
            setErrorMessage={setErrorMessage}
          />
        )}
        {mode === "personalData" && (
          <PersonalDataPanel
            setAge={setAge}
            setMode={setMode}
            setGender={setGender}
            handleSubmit={handleSubmit}
            setEducation={setEducation}
          />
        )}
        {/* {mode === "emailSent" && <EmailSentPanel setMode={setMode} />} */}
        {mode === "success" && <SuccessPanel />}
      </div>
    </main>
  );
}

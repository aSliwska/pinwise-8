"use client";
import { Button, Input } from "antd";
import { useState } from "react";
import { RegisterPanel } from "@/app/register/registerPanel";
import { PersonalDataPanel } from "@/app/register/personalDataPanel";
import { SuccessPanel } from "@/app/register/successPanel";

export default function RegisterPage() {
  const [mode, setMode] = useState<string>("register");
  const [email, setEmail] = useState<string>("");
  const [username, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [gender, setGender] = useState<string>("Wybierz");
  const [age, setAge] = useState<string>("Wybierz");
  const [education, setEducation] = useState<string>("Wybierz");

  const handleSubmit = async () => {
    console.log(
      "User data: ",
      username,
      email,
      password,
      gender,
      age,
      education
    );

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          email,
          password,
        }),
      });
      if (response.ok) {
        const { token } = await response.json();
        // localStorage.setItem("token", token);
        console.log("token: ", token);
      }
    } catch (error) {
      console.error(error);
    }

    setMode("success");
  };
  return (
    <main className="flex min-h-full min-w-full flex-col items-center justify-between color-bg-gradient-light-gray">
      <div className="flex min-h-full items-center justify-center color-bg-gradient-dark-gray w-3/5">
        {mode === "register" && (
          <RegisterPanel
            name={username}
            email={email}
            password={password}
            setMode={setMode}
            setName={setName}
            setEmail={setEmail}
            setPassword={setPassword}
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

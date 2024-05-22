"use client";
import { Button, Input } from "antd";
import { useState } from "react";
import { RegisterPanel } from "@/app/register/registerPanel";
import { PersonalDataPanel } from "@/app/register/personalDataPanel";
import { SuccessPanel } from "@/app/register/successPanel";

export default function RegisterPage() {
  const [mode, setMode] = useState<string>("register");
  const [email, setEmail] = useState<string>("vv@vv.com");
  const [username, setName] = useState<string>("vv");
  const [password, setPassword] = useState<string>("vv");
  const [gender, setGender] = useState<string>("Wybierz");
  const [age, setAge] = useState<string>("Wybierz");
  const [education, setEducation] = useState<string>("Wybierz");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (response.ok) {
        const { token } = await response.json();
        console.log("token: ", token);
        setMode("success");
      } else {
        const errorMsg = await response.text();
        console.error("Error:", response.status, errorMsg);
        setErrorMessage(errorMsg);
        setMode("register");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setErrorMessage("Failed to register. Please try again.");
      setMode("register");
    }
  };
  return (
    <main className="flex min-h-full min-w-full flex-col items-center justify-between color-bg-gradient-light-gray">
      <div className="flex min-h-full items-center justify-center color-bg-gradient-dark-gray w-3/5">
        {mode === "register" && (
          <RegisterPanel
            name={username}
            email={email}
            password={password}
            errorMessage={errorMessage}
            setMode={setMode}
            setName={setName}
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

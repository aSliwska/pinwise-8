"use client";
import exp from "constants";
import Image from "next/image";
import Link from "next/link";

export async function handleSubmit(event: React.FormEvent) {
  event.preventDefault();
  alert("Login");
  /*const email = (event.target as HTMLFormElement).email.value;
  const password = (event.target as HTMLFormElement).password.value;
  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem("token", token);
      window.location.href = "/dashboard";
    } else {
      throw new Error("Invalid login");
    }
  } catch (error) {
    console.error(error);
  }*/
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-neutral-600">
      <div className="flex items-center justify-center bg-neutral-700 w-4/5 min-h-screen">
        <form style={{ minWidth: "60%" }} onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-between gap-4 p-4 rounded-lg text-white">
            <div className="text-3xl font-bold mb-4">Zaloguj się</div>
            <div className="w-full">
              <div className="flex justify-between w-full my-1">
                <label htmlFor="email" className="text-xs">
                  Email
                </label>
                <Link
                  href="/forgot-password"
                  className=" text-xs text-teal-300 justify-between"
                >
                  Zapomniałem/am hasła
                </Link>
              </div>
              <input
                id="email"
                type="email"
                className="p-2 rounded-md bg-white text-black w-full"
                autoFocus={true}
              />
            </div>
            <div className="self-stretch">
              <div className="my-1">
                <label htmlFor="password" className="text-xs">
                  Hasło
                </label>
              </div>
              <input
                id="password"
                type="password"
                className="p-2 rounded-md bg-white text-black w-full"
              />
            </div>
            <button className="self-stretch w-full bg-teal-300 p-2 rounded-md font-bold mt-6">
              Zaloguj
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

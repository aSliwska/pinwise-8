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
      window.location.href = {`/profile/${user.id}`};
    } else {
      throw new Error("Invalid login");
    }
  } catch (error) {
    console.error(error);
  }*/
}

export default function Home() {
  return (
    <main className="flex min-h-full min-w-full flex-col items-center justify-between color-bg-gradient-light-gray">
      <div className="flex min-h-full items-center justify-center color-bg-gradient-dark-gray w-3/5">
        <form style={{ minWidth: "60%" }} onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-between gap-12 p-4 rounded-lg text-white">
            <div className="text-5xl font-bold">Zaloguj się</div>

            <div className="w-full">
              <div className="w-full mb-6">
                <div className="flex justify-between w-full mb-4">
                  <label htmlFor="email" className="text-neutral-300 font-light">
                    Email
                  </label>
                </div>
                <input
                  id="email"
                  type="email"
                  className="px-5 py-4 text-lg rounded-lg bg-white text-neutral-600 w-full"
                  autoFocus={true}
                />
              </div>
              <div className="self-stretch">
                <div className="flex justify-between w-full mb-4">
                  <label htmlFor="password" className="text-neutral-300 font-light">
                    Hasło
                  </label>
                  <Link
                    href="/forgot-password"
                    className="font-bold color-text-teal justify-between"
                  >
                    Zapomniałem/am hasła
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  className="px-5 py-4 text-lg rounded-lg bg-white text-neutral-600 w-full"
                />
              </div>
            </div>

            <button className="self-stretch w-full color-bg-teal px-5 py-4 text-lg rounded-lg font-bold">
              Zaloguj
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

"use client";
import Link from "next/link";
import { Input, Button, ConfigProviderProps } from "antd";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const email = (event.target as HTMLFormElement).email.value;
    const password = (event.target as HTMLFormElement).password.value;

    alert("email: " + email + " " + password);

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("token", token);
        router.push("/map");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="flex min-h-full min-w-full flex-col items-center justify-between color-bg-gradient-light-gray">
      <div className="flex min-h-full items-center justify-center color-bg-gradient-dark-gray w-3/5 min-w-[500px]">
        <form style={{ minWidth: "60%" }} onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-between gap-12 p-4 rounded-lg text-white">
            <div className="text-5xl font-bold">Zaloguj się</div>

            <div className="w-full">
              <div className="w-full mb-6">
                <div className="flex justify-between w-full mb-4">
                  <label
                    htmlFor="email"
                    className="text-neutral-300 font-light"
                  >
                    Email
                  </label>
                </div>
                <Input id="email" type="email" autoFocus={true} />
              </div>
              <div className="self-stretch">
                <div className="flex justify-between w-full mb-4">
                  <label
                    htmlFor="password"
                    className="text-neutral-300 font-light"
                  >
                    Hasło
                  </label>
                  <Link
                    href="/forgot-password"
                    className="font-semibold color-text-teal justify-between"
                  >
                    Zapomniałem/am hasła
                  </Link>
                </div>
                <Input id="password" type="password" />
              </div>
            </div>

            <Button
              type="primary"
              size="large"
              htmlType="submit"
              block
              style={{ fontWeight: 700 }}
            >
              Zaloguj
            </Button>
            <Link href="/register" className="text-neutral-300">
              Nie masz konta? Zarejestruj się
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

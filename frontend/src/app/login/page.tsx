"use client";
import { userAtom } from "@/components/store";
import { login } from "@/logic/authorization";
import { Button, Form, Input } from "antd";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [_, setUser] = useAtom(userAtom);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onFinish = async (values: any) => {
    const { email, password } = values;
    const loginResponse = await login(email, password);

    if (loginResponse.success) {
      setUser((user) => ({
        ...user,
        name: loginResponse.data.username,
        email: loginResponse.data.sub,
        isAuthenticated: true,
      }));

      setErrorMessage(null);
      router.push("/map");
    } else {
      setErrorMessage(
        loginResponse.message === "" ? "Błąd logowania" : loginResponse.message
      );
    }
  };

  return (
    <main className="flex min-h-full min-w-full flex-col items-center justify-between color-bg-gradient-light-gray">
      <div className="flex flex-col min-h-full items-center justify-center color-bg-gradient-dark-gray w-3/5 min-w-[500px]">
        {errorMessage && (
          <div className="text-red-500 mb-2">{errorMessage}</div>
        )}
        <Form style={{ minWidth: "60%" }} onFinish={onFinish}>
          <div className="flex flex-col items-center justify-between gap-12 p-4 rounded-lg text-verywhite font-verywhite">
            <div className="text-5xl font-bold">Zaloguj się</div>

            <div className="w-full">
              <Form.Item
                label={
                  <label
                    htmlFor="email"
                    className="text-neutral-300 font-light"
                  >
                    Email
                  </label>
                }
                name="email"
                rules={[
                  { required: true, message: "Podaj e-mail" },
                  { type: "email", message: "Podaj poprawny e-mail" },
                ]}
                labelCol={{ span: 24 }}
              >
                <Input id="email" type="email" autoFocus={true} />
              </Form.Item>
              <div className="w-full flex justify-end">
                <Link
                  href="/forgot-password"
                  className=" font-semibold color-text-teal"
                >
                  Zapomniałem/am hasła
                </Link>
              </div>
              <Form.Item
                label={
                  <div className="flex justify-between w-full">
                    <label
                      htmlFor="password"
                      className="text-neutral-300 font-light"
                    >
                      Hasło
                    </label>
                    <div className="flex items-center flex-1" />
                  </div>
                }
                name="password"
                rules={[{ required: true, message: "Podaj hasło" }]}
                labelCol={{ span: 24 }}
              >
                <Input id="password" type="password" />
              </Form.Item>
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
          </div>
        </Form>
      </div>
    </main>
  );
}

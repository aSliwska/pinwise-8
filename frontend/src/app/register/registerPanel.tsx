import { Button, Form, Input } from "antd";
import Link from "next/link";
import { useState } from "react";

const handleSubmit = async (values: any) => {
  const { email, password } = values;
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
      console.log("Registered and logged");
      // window.location.href = {`/profile/${user.id}`};
    } else {
      throw new Error("Invalid login");
    }
  } catch (error) {
    console.error(error);
  }
};

interface RegisterPanelProps {
  name: string;
  email: string;
  password: string;
  errorMessage: string | null;
  setMode: (mode: string) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setErrorMessage: (errorMessage: string | null) => void;
}

const RegisterPanel = ({
  name,
  email,
  password,
  errorMessage,

  setMode,
  setName,
  setEmail,
  setPassword,
  setErrorMessage,
}: RegisterPanelProps) => {
  const [form] = Form.useForm();
  const [validForm, setValidForm] = useState(false);

  const onFinish = async (values: any) => {
    await handleSubmit(values);
  };

  // Function to handle form validation
  const handleValidation = (_, value: string) => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!isValidEmail) {
      setValidForm(false);
    }
  };

  return (
    <Form
      form={form}
      name="register"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onChange={() => setValidForm(true)}
    >
      <div className="flex flex-col items-center justify-between gap-12 p-4 rounded-lg text-white">
        <div className="text-5xl font-bold">Zarejestruj się</div>

        <div className="w-full">
          <Form.Item
            label={<label style={{ color: "white" }}>Email</label>}
            name="email"
            rules={[
              { required: true, message: "Podaj e-mail" },
              { type: "email", message: "Podaj poprawny e-mail" },
              { validator: handleValidation }, // Validate email and set `t` accordingly
            ]}
            validateStatus={!validForm ? "error" : ""}
            help={!validForm ? "Podaj poprawny e-mail" : ""}
            labelCol={{ span: 24 }}
          >
            <Input
              onChange={(e) => setEmail(e.target.value)}
              defaultValue={email}
            />
          </Form.Item>
          <Form.Item
            label={<label style={{ color: "white" }}>Nazwa użytkownika</label>}
            name="name"
            rules={[{ required: true, message: "Podaj nazwę użytkownika" }]}
            labelCol={{ span: 24 }}
          >
            <Input
              onChange={(e) => setName(e.target.value)}
              defaultValue={name}
            />
          </Form.Item>
          <Form.Item
            label={<label style={{ color: "white" }}>Hasło</label>}
            name="password"
            rules={[{ required: true, message: "Podaj hasło" }]}
            labelCol={{ span: 24 }}
          >
            <Input.Password onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>
          <Form.Item
            label={<label style={{ color: "white" }}>Powtórz hasło</label>}
            name="passwordConfirmation"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Potwierdź hasło" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  } else {
                    setValidForm(false);
                    return Promise.reject(
                      new Error("Hasła są różne. Spróbuj ponownie.")
                    );
                  }
                },
              }),
            ]}
            labelCol={{ span: 24 }}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            {validForm ? (
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{ fontWeight: 700, height: "60px" }}
                onClick={(e) => {
                  e.preventDefault();
                  console.log("User data: ", name, email, password);
                  setMode("personalData");
                }}
              >
                Dalej
              </Button>
            ) : (
              <Button type="primary" block disabled>
                {" "}
                Dalej{" "}
              </Button>
            )}
          </Form.Item>

          {errorMessage && (
            <div className="text-red-500 mb-2">{errorMessage}</div>
          )}
          <Link href="/login" className="text-neutral-300">
            Masz już konto? Zaloguj się
          </Link>
        </div>
      </div>
    </Form>
  );
};

export { RegisterPanel };

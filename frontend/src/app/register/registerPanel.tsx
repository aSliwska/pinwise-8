// pages/index.tsx

import { Button, Form, Input } from "antd";
import { useState } from "react";

interface RegisterPanelProps {
  username: string;
  email: string;
  password: string;
  errorMessage: string | null;
  setMode: (mode: string) => void;
  setUsername: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setErrorMessage: (errorMessage: string | null) => void;
}

const RegisterPanel = ({
  username,
  email,
  password,
  errorMessage,
  setMode,
  setUsername,
  setEmail,
  setPassword,
  setErrorMessage,
}: RegisterPanelProps) => {
  const [form] = Form.useForm();
  const [validForm, setValidForm] = useState(false);

  const checkIsValidForm = () => {
    const values = form.getFieldsValue();
    const isValidEmail =
      values.email && /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email);
    const isValidName = values.username && values.username.length >= 3;
    const isValidPassword = values.password && values.password.length >= 8;
    const isValidPasswordConfirmation =
      values.password === values.passwordConfirmation;

    setValidForm(
      isValidEmail &&
        isValidName &&
        isValidPassword &&
        isValidPasswordConfirmation
    );
  };

  return (
    <>
      {errorMessage && <div className="text-red-500 mb-2">{errorMessage}</div>}
      <Form
        form={form}
        name="register"
        initialValues={{ remember: true }}
        onFieldsChange={checkIsValidForm} // Trigger validation check on any field change
      >
        <div className="flex flex-col items-center justify-between gap-12 p-4 rounded-lg text-verywhite font-verywhite">
          <div className="text-5xl font-bold">Zarejestruj się</div>

          <div className="w-full">
            <Form.Item
              label={<label style={{ color: "white" }}>Email</label>}
              name="email"
              rules={[
                { required: true, message: "Podaj e-mail" },
                { type: "email", message: "Podaj poprawny e-mail" },
              ]}
              labelCol={{ span: 24 }}
            >
              <Input
                onChange={(e) => setEmail(e.target.value)}
                defaultValue={email}
              />
            </Form.Item>
            <Form.Item
              label={
                <label style={{ color: "white" }}>Nazwa użytkownika</label>
              }
              name="username"
              rules={[
                { required: true, message: "Podaj nazwę użytkownika" },
                {
                  min: 3,
                  message: "Nazwa użytkownika musi mieć co najmniej 3 znaki",
                },
              ]}
              labelCol={{ span: 24 }}
            >
              <Input
                onChange={(e) => setUsername(e.target.value)}
                defaultValue={username}
              />
            </Form.Item>
            <Form.Item
              label={<label style={{ color: "white" }}>Hasło</label>}
              name="password"
              rules={[
                { required: true, message: "Podaj hasło" },
                { min: 8, message: "Hasło musi mieć co najmniej 8 znaków" },
              ]}
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
                    }
                    return Promise.reject("Hasła są różne. Spróbuj ponownie.");
                  },
                }),
              ]}
              labelCol={{ span: 24 }}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{ fontWeight: 700, height: "60px" }}
                disabled={!validForm} // Disable the button if the form is not valid
                onClick={(e) => {
                  if (validForm) {
                    e.preventDefault();
                    setMode("personalData");
                  }
                }}
              >
                Dalej
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </>
  );
};

export { RegisterPanel };

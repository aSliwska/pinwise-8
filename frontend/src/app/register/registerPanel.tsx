import { Button, Form, Input } from "antd";
import { useState } from "react";

const handleSubmit = async (values: any) => {
  const { email, password, passwordConfirmation } = values;
  /*try {
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
};

interface RegisterPanelProps {
  name: string;
  email: string;
  password: string;
  setMode: (mode: string) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}

const RegisterPanel = ({
  name,
  email,
  password,
  setMode,
  setName,
  setEmail,
  setPassword,
}: RegisterPanelProps) => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    await handleSubmit(values);
  };

  return (
    <Form
      form={form}
      name="register"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <div className="flex flex-col items-center justify-between gap-12 p-4 rounded-lg text-white">
        <div className="text-5xl font-bold">Zarejestruj się</div>

        <div className="w-full">
          <Form.Item
            label={<label style={{ color: "white" }}>Email</label>}
            name="email"
            rules={[{ required: true, message: "Podaj e-mail" }]}
            labelCol={{ span: 24 }}
          >
            <Input
              autoFocus={true}
              onChange={(e) => setEmail(e.target.value)}
              defaultValue={email}
              required
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
                  }
                  return Promise.reject(
                    new Error("Hasła są różne. Spróbuj ponownie.")
                  );
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
              onClick={(e) => {
                e.preventDefault();
                console.log("User data: ", name, email, password);
                setMode("personalData");
              }}
            >
              Dalej
            </Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export { RegisterPanel };

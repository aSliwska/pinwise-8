import { jwtDecode } from "jwt-decode";

interface LoginResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem("token", token);

      const decodedToken: any = jwtDecode(token);

      return { success: true, message: "Login successful", data: decodedToken };
    } else {
      const errorMessage = await response.text();
      return { success: false, message: errorMessage };
    }
  } catch (error) {
    return { success: false, message: "An unexpected error occurred" };
  }
};

export const register = async (
  username: string,
  email: string,
  password: string,
  gender: string,
  education: string,
  age: number
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, gender, education, age: Number(age) }),
      }
    );

    if (response.ok) {
      return { success: true, message: "Registration successful" };
    } else {
      const errorMessage = await response.text(); // Read the error message from the response
      return { success: false, message: errorMessage };
    }
  } catch (error) {
    return { success: false, message: "An unexpected error occurred" };
  }
};

"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useAuth } from "@/providers/auth";

interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const { loginUser } = useAuth();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event?.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (event: FormEvent) => {
    event?.preventDefault();
    formData.email && loginUser(formData.email, formData.password);
    console.log(formData);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email:</Label>
        <Input
          id="email"
          type="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password:</Label>
        <Input
          id="password"
          type="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
        />
      </div>
      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginForm;

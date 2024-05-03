"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useAuth } from "@/providers/auth";

interface FormData {
  email: "";
  username: "";
  password: "";
  confirmPassword: "";
}

const RegisterForm = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { registerUser } = useAuth();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (formData.email && formData.password === formData.confirmPassword) {
      await registerUser(
        formData.email,
        formData.username,
        formData.password,
        formData.confirmPassword
      );
    }
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1">
        <Label htmlFor="username">Username: </Label>
        <Input
          onChange={handleChange}
          type="text"
          name="username"
          id="username"
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="email">Email: </Label>
        <Input onChange={handleChange} type="email" name="email" id="email" />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="password">Password: </Label>
        <Input
          onChange={handleChange}
          type="password"
          name="password"
          id="password"
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="confirmPassword">Confirm Password: </Label>
        <Input
          onChange={handleChange}
          type="password"
          name="confirmPassword"
          id="confirmPassword"
        />
      </div>
      <Button type="submit">Register</Button>
    </form>
  );
};

export default RegisterForm;

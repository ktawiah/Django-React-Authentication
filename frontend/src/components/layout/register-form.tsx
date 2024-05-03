import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const RegisterForm = () => {
  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Label htmlFor="username">Username: </Label>
        <Input type="text" name="username" id="username" />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="email">Email: </Label>
        <Input type="email" name="email" id="email" />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="password">Password: </Label>
        <Input type="password" name="password" id="password" />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="confirmPassword">Confirm Password: </Label>
        <Input type="password" name="confirmPassword" id="confirmPassword" />
      </div>
      <Button type="submit">Register</Button>
    </form>
  );
};

export default RegisterForm;

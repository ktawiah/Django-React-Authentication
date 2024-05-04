import { Card, CardContent, CardHeader } from "../ui/card";
import RegisterForm from "./register-form";

const Login = () => {
  return (
    <Card className="flex flex-col sm:w-[70%] lg:w-1/2 xl:w-[35%] max-w-2xl">
      <CardHeader className="text-xl font-medium self-center">
        <p>
          <span>Welcome to</span> <span className="font-bold">KelAuth👋</span>
        </p>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
  );
};

export default Login;

import { Card, CardContent, CardHeader } from "../ui/card";
import LoginForm from "./login-form";

const Login = () => {
  return (
    <Card className="flex flex-col sm:w-[70%] lg:w-1/2 xl:w-[35%] max-w-2xl">
      <CardHeader className="text-xl font-medium self-center">
        <p>
          <span>Welcome Back</span> <span className="font-bold">KelAuth👋</span>
        </p>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
};

export default Login;

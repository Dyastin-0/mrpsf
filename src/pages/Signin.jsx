import { useNavigate } from "react-router";
import SigninForm from "../components/forms/SigninForm";
import useAuth from "../hooks/useAuth";

const Signin = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  if (token) {
    navigate("/dashboard");
    return;
  }

  return (
    <div
      className="flex flex-col justify-center items-center
      w-full h-[calc(100%-3rem)]
      bg-primary text-xs rounded-md"
    >
      <SigninForm />
    </div>
  );
};

export default Signin;

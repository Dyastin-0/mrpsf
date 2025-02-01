import { useNavigate } from "react-router";
import SigninForm from "../components/forms/SigninForm";
import useAuth from "../hooks/useAuth";

const Signin = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  if (token) {
    navigate("/proxies");
    return;
  }

  return (
    <div
      className="flex flex-col justify-center items-center
      w-[calc(100%-1.5rem)] h-[calc(100%-.75rem)]
      mx-3 mb-3
      bg-primary text-sm rounded-md"
    >
      <SigninForm />
    </div>
  );
};

export default Signin;

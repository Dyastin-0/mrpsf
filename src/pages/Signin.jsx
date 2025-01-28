import { useNavigate } from "react-router";
import SigninForm from "../components/forms/SigninForm";
import useAuth from "../hooks/useAuth";

const Signin = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  if (token) {
    navigate("/repositories");
    return;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-full bg-primary text-xs p-3 rounded-md">
      <SigninForm />
    </div>
  );
};

export default Signin;

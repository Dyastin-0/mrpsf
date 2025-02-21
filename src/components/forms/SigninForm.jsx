import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Input from "../ui/Input";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const SigninForm = ({}) => {
  const navigate = useNavigate();
  const { setToken, token } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (token) {
      navigate("/proxies");
    }
  }, [token, navigate]);

  const handleUsernameChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      const { data } = await axios.post("/auth", { email, password });
      setToken(data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-[250px] max-w-full p-3 text-sm text-primary-foreground rounded-md border border-secondary-accent z-10"
    >
      <div className="flex gap-1 justify-center items-center text-lg font-semibold">
        <span>Sign in to</span>
        <img src="/favicon.ico" className="w-6 h-6" />
      </div>
      <Input
        placeholder="email"
        value={email}
        onChange={handleUsernameChange}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <Button type="submit" text="Sign in" />
    </form>
  );
};

export default SigninForm;

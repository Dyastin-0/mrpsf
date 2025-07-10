import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import Button from "./ui/Button";
import useThemeToggle from "../hooks/useTheme";
import { motion } from "framer-motion";
import {
  faFile,
  faSignOut,
  faSync,
} from "@fortawesome/free-solid-svg-icons";
import { routes, authRoutes } from "../helpers/routes";
import Link from "./ui/Link";
import useViewport from "../hooks/useViewport";
import Tooltip from "./ui/Tooltip";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import useModal from "./hooks/useModal";
import useToast from "./hooks/useToast";
import LogsModal from "./modals/LogsModal";
import useAxios from "../hooks/useAxios";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const navigate = useNavigate();
  const { api } = useAxios();
  const { toastInfo } = useToast();
  const { setModal, setOpen } = useModal();
  const { toggleTheme, icon } = useThemeToggle();
  const { setToken, token } = useAuth();
  const { viewWidth } = useViewport();
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleSignout = async () => {
    try {
      await axios.post("/signout");
      setToken(null);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSync = async () => {
    api.post("/config/sync").then(() => toastInfo("Config synced"));
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrollingDown(currentScrollY > lastScrollY && currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.div
      className={clsx(
        "sticky flex justify-between w-full pb-3 gap-3 z-40",
        "text-xs",
        "bg-secondary",
        lastScrollY > 50 && "border border-secondary-accent"
      )}
      initial={{ y: 0 }}
      animate={isScrollingDown ? { y: -100 } : { y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="flex justify-center items-center gap-2">
        <img src="/favicon.ico" className="max-w-6 max-h-6 min-w-6 min-h-6" />
      </div>
      <div className="flex w-full justify-center items-center gap-1">
        {token &&
          viewWidth > 768 &&
          routes.map((route, index) => (
            <Tooltip key={index} text={route.name}>
              <Link path={route.path} name={route.name} />
            </Tooltip>
          ))}
        {!token &&
          viewWidth > 768 &&
          authRoutes.map((route, index) => (
            <Tooltip key={index} text={route.name}>
              <Link path={route.path} name={route.name} icon={route.icon} />
            </Tooltip>
          ))}
      </div>
      <div className="flex w-fit gap-1 justify-center items-center">
        <a
          href="https://github.com/Dyastin-0/mrps"
          className={clsx(
            "flex justify-center items-center p-2 rounded-full",
            "transition-all duration-300",
            "hover:bg-secondary-accent"
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faGithub}
            className="text-lg min-w-[18px] min-h-[18px] max-h-[18px] max-w-[18px]"
          />
        </a>
        <Tooltip text="Toggle theme">
          <Button
            variant="default_rounded"
            icon={icon}
            onClick={toggleTheme}
            className="text-lg"
          />
        </Tooltip>
        {token && (
          <>
            <Tooltip text="Logs">
              <Button
                className="text-lg"
                icon={faFile}
                variant="default_rounded"
                onClick={() => {
                  setModal(<LogsModal />);
                  setOpen(true);
                }}
              />
            </Tooltip>
            <Tooltip text="Sync config with the .yaml file">
              <Button
                className="text-lg"
                variant="default_rounded"
                icon={faSync}
                onClick={handleSync}
              />
            </Tooltip>
            <Tooltip text="Sign out">
              <Button
                className="text-lg"
                variant="default_rounded"
                icon={faSignOut}
                onClick={handleSignout}
              />
            </Tooltip>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Navbar;

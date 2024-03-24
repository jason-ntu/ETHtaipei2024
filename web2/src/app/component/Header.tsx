"use client";

import Link from "next/link";
import CottageIcon from "@mui/icons-material/Cottage";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";

const Header = (props: { homepage: boolean }) => {
  const auth = useAuth();

  const [opacity, setOpacity] = useState(1);
  const OPACITY_COEFFICIENT = 0.0005;

  useEffect(() => {
    if (!props.homepage) return;
    window.addEventListener("scroll", () => {
      setOpacity(Math.min(window.scrollY * OPACITY_COEFFICIENT,1));
    });
  }, []);

  return (
    <header
      style={{
        position: props.homepage ? "fixed" : undefined,
        backgroundColor: `rgba(255,255,255,${opacity})`,
      }}
    >
      <div
        style={{
          display: "flex",
          width: "1500px",
          margin: "0 auto",
          padding: ".5rem 0",
        }}
      >
        <div style={{ flex: 1 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center" }}>
            <CottageIcon />
            <span
              style={{
                padding: ".2rem",
                fontWeight: "bold",
                fontSize: "1.2rem",
              }}
            >
              Circoda
            </span>
          </Link>
        </div>
        {auth.loggedIn ? (
          <div>
            <Link href="/user/info">
              <AccountCircleIcon />
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <Link href="/login"> 
              <span className="w-28 h-16 px-5 py-3 border-2 border-white font-medium text-lg text-white text-center bg-black">
                LOG IN
              </span>
            </Link>
            <Link href="/signup">
              <span className="w-28 h-16 px-5 py-3 border-2 border-white font-medium text-lg text-white text-center bg-black">
                SIGN UP
              </span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

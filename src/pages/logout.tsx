import { MODE } from "@/config";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();
  useEffect(() => {
    signOut().then(
      () =>
        (window.location.href =
          MODE === "dev" ? "http://localhost:3001" : "https://learning.aedu.id")
    );
  }, []);
  return null;
}

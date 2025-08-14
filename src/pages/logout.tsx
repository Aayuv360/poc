import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { AppDispatch } from "@/store"; 

export default function Logout() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch({ type: "RESET" }); 
    fetch("/api/logout").finally(() => router.replace("/login"));
  }, [dispatch,router]);
  return <div style={{ padding: 50 }}>Logging out...</div>;
}

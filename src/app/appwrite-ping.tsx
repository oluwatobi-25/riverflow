"use client";

import { useEffect, useRef, useState } from "react";
import { client } from "./appwrite";

type PingStatus = "checking" | "connected" | "failed";

export default function AppwritePing() {
  const hasPinged = useRef(false);
  const [status, setStatus] = useState<PingStatus>("checking");

  useEffect(() => {
    if (hasPinged.current) return;
    hasPinged.current = true;

    client
      .ping()
      .then(() => setStatus("connected"))
      .catch(() => setStatus("failed"));
  }, []);

  return (
    <p aria-live="polite" className="text-sm text-zinc-500 dark:text-zinc-400">
      Appwrite: {status}
    </p>
  );
}

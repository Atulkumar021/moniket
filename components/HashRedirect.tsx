"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const HASH_MAP: Record<string, string> = {
  "#toolbox": "/toolbox",
  "#tracks": "/tracks",
  "#services": "/services",
  "#about": "/about",
  "#contact": "/contact",
};

export default function HashRedirect() {
  const router = useRouter();
  useEffect(() => {
    const target = HASH_MAP[window.location.hash];
    if (target) router.replace(target);
  }, [router]);
  return null;
}

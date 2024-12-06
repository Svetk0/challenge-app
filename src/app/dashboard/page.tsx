"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button/Button";
import Link from "next/link";
export default function Home() {
  const router = useRouter();
  return (
    <>
      Dashboard
      <Link href={"/dashboard/create"}>
        <Button
          type="button"
          text={"Add new"}
          color="sky-blue"
          //onClick={() => router.push("/dashboard/create")}
        />
      </Link>
    </>
  );
}

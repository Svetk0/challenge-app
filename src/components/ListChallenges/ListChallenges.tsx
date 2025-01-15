"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Button from "@/components/ui/Button/Button";
import Link from "next/link";
import { IChallenge } from "@/types";

type FormValues = {
  amount: number;
  goalTitle: string;
  period: string;
  datePeriodStart: string;
  datePeriodFinish: string;
};

type LocalStorage = {
  lastChallenge: FormValues | null;
};
export default function ListChallenges<LocalStorage>() {
  //const MY_CHALLENGES = [{}];
  const router = useRouter();
  const [local, setLocal] = useState<IChallenge[]>([]);
  const challengeData = useSelector((state: RootState) => state.challenge);
  console.log("storeRedux", challengeData);

  useEffect(() => {
    const MY_CHALLENGES = JSON.parse(
      localStorage.getItem("challenges") ?? "[]"
    );
    setLocal(MY_CHALLENGES);
  }, []);

  return (
    <>
      My Challenges List
      <ol>
        {challengeData.map((item: IChallenge) => (
          <li key={item.id}>{item.goalTitle}</li>
        ))}
      </ol>
    </>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Button from "@/components/ui/Button/Button";
import Link from "next/link";

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
  const [local, setLocal] = useState([]);
  const tokenData = useSelector((state: RootState) => state.challenge);
  console.log("storeRedux", tokenData);

  useEffect(() => {
    const MY_CHALLENGES = JSON.parse(localStorage.getItem("challenges"));
    setLocal(MY_CHALLENGES);
  }, []);

  const updateMyListChallenges = () => {
    console.log("lastChallenge", local);
    // const fullList = [...MY_CHALLENGES, local];
    // console.log("fullList", fullList);
  };
  return <>My Challenges List</>;
}

"use client";

import { useRouter } from "next/navigation";
import staticData from "@/constants/data.json";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button/Button";
//import { createGoal } from "@/lib/actions";

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};
export default function CreateForm() {
  const createGoal = () => {
    console.log("form data", state);
  };

  const [local, setLocal] = useState([]);
  //console.log("state", state);
  const dt = staticData.form_challenge;
  const router = useRouter();

  return (
    <form onSubmit={createGoal}>
      {/* GOAL Title */}
      <div>
        <label htmlFor="goalTitle">Goal Title</label>
        <div>
          <div>
            <input
              aria-describedby="goalTitle-error"
              id="goalTitle"
              name="goalTitle"
              type="text"
              placeholder="Describe your goal"
            />
          </div>
          {/* <div id="goalTitle-error" aria-live="polite" aria-atomic="true">
              {state.errors?.goalTitle &&
                state.errors.goalTitle.map((error: string) => (
                  <p key={error}>
                    {error}
                  </p>
                ))}
            </div> */}
        </div>
      </div>
      {/* How manн шеукфешщты */}
      <div>
        <label htmlFor="amount">Enter your goal</label>
        <div>
          <div>
            <input
              aria-describedby="amount-error"
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              placeholder="Enter a number of"
            />
          </div>
          {/* <div id="amount-error" aria-live="polite" aria-atomic="true">
              {state.errors?.amount &&
                state.errors.amount.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div> */}
        </div>
      </div>

      <div>
        <label htmlFor="period">per time period</label>
        <div>
          <select
            id="period"
            name="periodId"
            defaultValue=""
            aria-describedby="period-error"
          >
            <option value="" disabled>
              per
            </option>
            {dt.time.map((value) => (
              <option key={`${value}+ 1`}>{value.value}</option>
            ))}
          </select>
        </div>
        {/* <div id="period-error" aria-live="polite" aria-atomic="true">
            {state.errors?.periodId &&
              state.errors.periodId.map((error: string) => (
                <p  key={error}>
                  {error}
                </p>
              ))}
          </div> */}
      </div>

      {/* GOAL PERIOD */}
      <div>
        <label htmlFor="datePeriodStart">Start</label>
        <div>
          <div>
            <input
              aria-describedby="datePeriodStart-error"
              id="datePeriodStart"
              name="datePeriodStart"
              type="date"
              placeholder="Start"
            />
          </div>
          {/* <div id="datePeriodStart-error" aria-live="polite" aria-atomic="true">
              {state.errors?.datePeriodStart &&
                state.errors.datePeriodStart.map((error: string) => (
                  <p key={error}>
                    {error}
                  </p>
                ))}
            </div> */}
        </div>
      </div>
      <div>
        <label htmlFor="datePeriodFinish">Finish</label>
        <div>
          <div>
            <input
              aria-describedby="datePeriodFinish-error"
              id="datePeriodFinish"
              name="datePeriodFinish"
              type="date"
              placeholder="Finish"
            />
          </div>
          {/* <div id="datePeriodFinish-error" aria-live="polite" aria-atomic="true">
              {state.errors?.datePeriodFinish &&
                state.errors.datePeriodFinish.map((error: string) => (
                  <p key={error}>
                    {error}
                  </p>
                ))}
            </div> */}
        </div>
      </div>

      <div>
        <Button
          type="button"
          text={"Back"}
          color="light-purple"
          onClick={() => router.back()}
        />
        <Button
          type="submit"
          text={"Create Goal"}
          color="sky-blue"
          //onClick={() => router.push("/wallet")}
        />
      </div>
    </form>
  );
}

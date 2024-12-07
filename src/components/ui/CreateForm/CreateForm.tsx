"use client";
import { useRouter } from "next/navigation";
import staticData from "@/constants/data.json";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button/Button";

import { useForm, SubmitHandler } from "react-hook-form";

import styles from "./createForm.module.scss";

type FormValues = {
  amount: number;
  goalTitle: string;
  period: string;
  datePeriodStart: string;
  datePeriodFinish: string;
};

export default function CreateForm() {
  const router = useRouter();
  const dt = staticData.form_challenge;

  const [receiveAmount, setReceiveAmount] = useState(0);
  const [sendAmount, setSendAmount] = useState(0);
  const [goalTitle, setGoalTitle] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    reset,
    getValues,
    setValue,
    clearErrors,
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setGoalTitle(data.goalTitle.trimStart());
    setSendAmount(data.amount);

    console.log(data);
    reset({
      amount: 0,
      goalTitle: "",
    });
  };

  const handleValidation = (fieldName: keyof FormValues) => ({
    onBlur: () => trigger(fieldName),
    onChange: () => {
      if (getValues(fieldName)) {
        clearErrors(fieldName);
      }
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.inputsContainer}>
        <div className={styles.inputWrapper}>
          <label className={styles.label} htmlFor="goalTitle">
            {dt.title}
          </label>
          <textarea
            className={styles.textarea}
            placeholder={"goal title"}
            id="goalTitle"
            {...register("goalTitle", {
              required: "please, enter goal title ",
              validate: {
                minLength: (v) => v.trim().length >= 1 || "type a goal name",
                maxLength: (v) => v.length <= 200 || "not more 200 symb",
                noSpaces: (v) => v.trim().length > 0 || "spaces",
              },
              ...handleValidation("goalTitle"),
            })}
          />
          {errors.goalTitle && (
            <p className={styles.error}>{errors.goalTitle.message}</p>
          )}
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="amount" className={styles.label}>
            {dt.title}
          </label>
          <input
            id="amount"
            placeholder={`days`}
            className={styles.input}
            type="number"
            {...register("amount", {
              required: "fill it",
              validate: {
                min: (v) => v >= 1 || "amount should be more than 0",
                // max: (v) => v <= balance || dt.sendAmount.maxLengthMessage,
              },
              ...handleValidation("amount"),
            })}
          />

          {errors.amount && (
            <p className={styles.error}>{errors.amount.message}</p>
          )}
        </div>
        <div className={styles.inputWrapper}>
          <label className={styles.label} htmlFor="period">
            per time period
          </label>
          <div>
            <select
              id="period"
              //name="periodId"
              defaultValue=""
              aria-describedby="period-error"
              className={styles.input}
              {...register("period", {
                required: "fill it",

                ...handleValidation("period"),
              })}
            >
              {dt.time.map((value) => (
                <option key={value.value}>{value.value}</option>
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
        What is duration of your challenge?
        <div className={styles.inputWrapper}>
          <label className={styles.label} htmlFor="datePeriodStart">
            Start
          </label>
          <div>
            <div>
              <input
                className={styles.input}
                aria-describedby="datePeriodStart-error"
                id="datePeriodStart"
                //name="datePeriodStart"
                type="date"
                //placeholder="Start"
                {...register("datePeriodStart", {
                  required: "fill it",

                  ...handleValidation("datePeriodStart"),
                })}
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
        <div className={styles.inputWrapper}>
          <label className={styles.label} htmlFor="datePeriodFinish">
            Finish
          </label>
          <div>
            <div>
              <input
                className={styles.input}
                aria-describedby="datePeriodFinish-error"
                id="datePeriodFinish"
                //name="datePeriodFinish"
                type="date"
                placeholder="Finish"
                {...register("datePeriodFinish", {
                  required: "fill it",

                  ...handleValidation("datePeriodFinish"),
                })}
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
        {/* Inputs Container    */}
      </div>
      <div className={styles.buttonsWrapper}>
        <Button
          type="button"
          text={"Back"}
          color="light-purple"
          onClick={() => router.back()}
        />
        <Button
          type="submit"
          text={"Create"}
          color="sky-blue"
          //onClick={() => router.push("/wallet")}
        />
      </div>
    </form>
  );
}

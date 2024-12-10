"use client";
import { useRouter } from "next/navigation";
import staticData from "@/constants/data.json";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button/Button";

import { useForm, SubmitHandler } from "react-hook-form";
import { ICreateForm } from "@/types";
import styles from "./createForm.module.scss";

export default function CreateForm() {
  const router = useRouter();
  const dt = staticData.create_form;
  const [goalTitle, setGoalTitle] = useState("");
  const [datePeriodStart, setDatePeriodStart] = useState("");
  const addChallenge = (newChallenge: ICreateForm) => {
    localStorage.setItem("last_challenge", JSON.stringify(newChallenge));
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    reset,
    getValues,
    setValue,
    clearErrors,
  } = useForm<ICreateForm>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ICreateForm> = (data) => {
    setGoalTitle(data.goalTitle.trimStart());
    addChallenge(data);
    console.log(data);
    reset({
      amount: 0,
      goalTitle: "",
      period: "",
      datePeriodStart: "",
    });
  };

  const handleValidation = (fieldName: keyof ICreateForm) => ({
    onBlur: () => trigger(fieldName),
    onChange: () => {
      if (getValues(fieldName)) {
        setDatePeriodStart(getValues("datePeriodStart"));
        console.log("datePeriodStart", datePeriodStart);
        clearErrors(fieldName);
      }
    },
  });

  //   useEffect(() => {
  //     localStorage.setItem("favNumber", JSON.stringify(customers[3]));
  //   }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2> {dt.title}</h2>
      <div className={styles.inputsContainer}>
        <div className={styles.inputWrapper}>
          <label className={styles.label} htmlFor="goalTitle">
            {dt.goal_title}
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
        <div className={styles.buttonsWrapper}>
          <div className={styles.inputWrapper}>
            <label htmlFor="amount" className={styles.label}>
              {dt.subtitle}
            </label>
            <input
              id="amount"
              placeholder={`number`}
              className={`${styles.input} ${styles.input_shorts}`}
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
              per
            </label>

            <select
              id="period"
              defaultValue=""
              aria-describedby="period-error"
              className={`${styles.input} ${styles.input_shorts}`}
              {...register("period", {
                required: "fill it",

                ...handleValidation("period"),
              })}
            >
              {dt.time.map((value) => (
                <option key={value.value}>{value.value}</option>
              ))}
            </select>
            {errors.period && (
              <p className={styles.error}>{errors.period.message}</p>
            )}
          </div>
        </div>
        {/* GOAL PERIOD */}
        <div className={styles.buttonsWrapper}>
          <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor="datePeriodStart">
              Start
            </label>

            <input
              className={`${styles.input}`}
              aria-describedby="datePeriodStart-error"
              id="datePeriodStart"
              type="date"
              {...register("datePeriodStart", {
                required: "fill it",
                validate: {
                  min: (v) => v >= "2010-01-01" || "not early 2010",
                  // max: (v) => v <= balance || dt.sendAmount.maxLengthMessage,
                },

                ...handleValidation("datePeriodStart"),
              })}
            />
            {errors.datePeriodStart && (
              <p className={styles.error}>{errors.datePeriodStart.message}</p>
            )}
          </div>
          <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor="datePeriodFinish">
              Finish
            </label>
            <input
              disabled={false}
              className={styles.input}
              aria-describedby="datePeriodFinish-error"
              id="datePeriodFinish"
              type="date"
              {...register("datePeriodFinish", {
                required: "fill it",
                validate: {
                  min: (v) =>
                    v > String(datePeriodStart) || "should be later than start",
                  // max: (v) => v <= balance || dt.sendAmount.maxLengthMessage,
                },

                ...handleValidation("datePeriodFinish"),
              })}
            />
            {errors.datePeriodFinish && (
              <p className={styles.error}>{errors.datePeriodFinish.message}</p>
            )}
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
          disabled={!isValid}
          //onClick={() => router.push("/wallet")}
        />
      </div>
    </form>
  );
}

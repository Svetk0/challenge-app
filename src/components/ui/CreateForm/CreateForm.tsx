"use client";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { addChallenge } from "@/lib/features/challenges/challengeSlice";

import { ICreateForm, IChallenge } from "@/types";
import staticData from "@/constants/data.json";

import Button from "@/components/ui/Button/Button";

import styles from "./createForm.module.scss";

export default function CreateForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const dt = staticData.challenge_form;
  const [goalTitle, setGoalTitle] = useState("");
  const [datePeriodStart, setDatePeriodStart] = useState("");
  const addNewChallenge = (newChallenge: IChallenge) => {
    localStorage.setItem("last_challenge", JSON.stringify(newChallenge));
    dispatch(addChallenge(newChallenge));
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
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<ICreateForm> = (data) => {
    setGoalTitle(data.goalTitle.trimStart());
    addNewChallenge({
      id: Math.round(Math.random() * 1000),
      amount: data.amount,
      goalTitle: data.goalTitle,
      period: data.period,
      datePeriodStart: data.datePeriodStart,
      datePeriodFinish: data.datePeriodFinish,
    });

    console.log(data);
    reset({
      amount: 0,
      goalTitle: "",
      period: "",
      datePeriodStart: "",
      datePeriodFinish: "",
    });
  };

  const handleValidation = (fieldName: keyof ICreateForm) => ({
    onBlur: () => trigger(fieldName),
    onChange: () => {
      if (getValues(fieldName)) {
        clearErrors(fieldName);
      }
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2 className={styles.title}> {dt.title_create}</h2>
      <div className={styles.inputsContainer}>
        <div className={styles.inputWrapper}>
          <label htmlFor="goalTitle" className={styles.label}>
            {dt.name.label}
          </label>
          <textarea
            className={styles.input}
            placeholder={dt.name.placeholder}
            id="goalTitle"
            {...register("goalTitle", {
              required: dt.name.require_message,
              validate: {
                minLength: (v) => v.trim().length >= 2 || dt.name.error_message,
                maxLength: (v) => v.length <= 50 || dt.name.error_message,
                noSpaces: (v) => v.trim().length > 0 || dt.name.error_message,
              },
              ...handleValidation("goalTitle"),
            })}
          />
          {errors.goalTitle && (
            <p className={styles.error}>{errors.goalTitle.message}</p>
          )}
        </div>
        <div className={styles.rowWrapper}>
          <div className={styles.inputWrapper}>
            <label htmlFor="amount" className={styles.label}>
              {dt.amount.label}
            </label>
            <input
              id="amount"
              placeholder={dt.amount.placeholder}
              className={`${styles.input} ${styles.input_short}`}
              type="number"
              {...register("amount", {
                required: dt.amount.require_message,
                validate: {
                  min: (v) => v >= 1 || dt.amount.error_message,
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
              {dt.period.label}
            </label>

            <select
              id="period"
              defaultValue=""
              aria-describedby="period-error"
              className={`${styles.input} ${styles.input_short}`}
              {...register("period", {
                required: dt.period.require_message,

                ...handleValidation("period"),
              })}
            >
              {dt.period.time.map((value) => (
                <option key={value.value}>{value.value}</option>
              ))}
            </select>
            {errors.period && (
              <p className={styles.error}>{errors.period.message}</p>
            )}
          </div>
        </div>
        {/* GOAL PERIOD */}
        <div className={styles.rowWrapper}>
          <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor="datePeriodStart">
              {dt.date_start.label}
            </label>

            <input
              className={`${styles.input} ${styles.input_short}`}
              aria-describedby="datePeriodStart-error"
              id="datePeriodStart"
              type="date"
              {...register("datePeriodStart", {
                required: dt.date_start.require_message,
                validate: {
                  min: (v) => v >= "2010-01-01" || dt.date_start.error_message,
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
              {dt.date_finish.label}
            </label>
            <input
              disabled={false}
              className={`${styles.input} ${styles.input_short}`}
              aria-describedby="datePeriodFinish-error"
              id="datePeriodFinish"
              type="date"
              {...register("datePeriodFinish", {
                required: dt.date_finish.require_message,
                validate: {
                  min: (v) =>
                    v > String(datePeriodStart) || dt.date_finish.error_message,
                },
                ...handleValidation("datePeriodFinish"),
              })}
            />
            {errors.datePeriodFinish && (
              <p className={styles.error}>{errors.datePeriodFinish.message}</p>
            )}
          </div>
        </div>
      </div>
      <div className={styles.rowWrapper}>
        <Button
          type="button"
          text={"Back"}
          color="black"
          onClick={() => router.back()}
        />
        <Button
          type="submit"
          text={"Create"}
          color="default"
          disabled={!isValid}
          onClick={() => router.push("/challenges")}
        />
      </div>
    </form>
  );
}

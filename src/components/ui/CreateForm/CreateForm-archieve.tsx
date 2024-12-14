"use client";

import { useRouter } from "next/navigation";
import staticData from "@/constants/data.json";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button/Button";
import { useDispatch } from "react-redux";
import { addChallenge } from "@/lib/features/challenges/challengeSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import { ICreateForm, IChallenge } from "@/types";
import styles from "./createForm.module.scss";
import Input from "@/components/ui/Input/Input";

export default function ContactForm() {
  const dt = staticData.challenge_form;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    reset,
    getValues,
    clearErrors,
  } = useForm<ICreateForm>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ICreateForm> = (data) => {
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
          <Input
            label={dt.name.label}
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
      </div>
    </form>
  );
}

"use client";
import { useRouter } from "next/navigation";
import staticData from "@/constants/data.json";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button/Button";

import { useForm, SubmitHandler } from "react-hook-form";

import styles from "./createForm.module.scss";

type FormValues = {
  sendAmount: number;
  receiveAmount: number;
  recipientAddress: string;
};

export default function CreateForm() {
  const router = useRouter();
  const dt = staticData.form_challenge;

  const [receiveAmount, setReceiveAmount] = useState(0);
  const [sendAmount, setSendAmount] = useState(0);
  const [recipientAddress, setRecipientAddress] = useState("");

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
    setRecipientAddress(data.recipientAddress.trimStart());
    setSendAmount(data.sendAmount);
    setReceiveAmount(data.receiveAmount);
    console.log(data);
    reset({
      sendAmount: 0,
      receiveAmount: 0,
      recipientAddress: "",
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
          <label className={styles.label} htmlFor="recipientAddress">
            {dt.title}
          </label>
          <textarea
            className={styles.textarea}
            placeholder={"goal title"}
            id="recipientAddress"
            {...register("recipientAddress", {
              required: "please, enter goal title ",
              validate: {
                minLength: (v) => v.trim().length >= 1 || "type a goal name",
                maxLength: (v) => v.length <= 200 || "not more 200 symb",
                noSpaces: (v) => v.trim().length > 0 || "spaces",
              },
              ...handleValidation("recipientAddress"),
            })}
          />
          {errors.recipientAddress && (
            <p className={styles.error}>{errors.recipientAddress.message}</p>
          )}
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="sendAmount" className={styles.label}>
            {dt.title}
          </label>
          <input
            id="sendAmount"
            placeholder={`days`}
            className={styles.input}
            type="number"
            {...register("sendAmount", {
              required: "fill it",
              validate: {
                min: (v) => v >= 1 || "amount should be more than 0",
                // max: (v) => v <= balance || dt.sendAmount.maxLengthMessage,
              },
              ...handleValidation("sendAmount"),
            })}
          />

          {errors.sendAmount && (
            <p className={styles.error}>{errors.sendAmount.message}</p>
          )}
        </div>
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

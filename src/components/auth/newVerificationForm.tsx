"use client";
import { UserVerification } from "@/actions/new-verification";
import { FormError } from "@/components/formError";
import { FormSuccess } from "@/components/formSuccess";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import CardWrapper from "./cardWrapper";

const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [succes, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!token) return notFound();
    UserVerification(token).then((data) => {
      if (data.success) {
        setSuccess(data.success);
        return;
      }
      if (data.error) {
        setError(data.error);
        return;
      }
    });
  }, []);
  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      {!succes && !error && (
        <div className="flex justify-center items-center w-full">
          <BarLoader />
        </div>
      )}
      <FormSuccess message={succes} />
      {!succes && <FormError message={error} />}
    </CardWrapper>
  );
};

export default NewVerificationForm;

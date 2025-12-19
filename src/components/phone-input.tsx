"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import { cn } from "@/lib/utils";

interface FormPhoneInputProps {
  name: string;
  label?: string;
  className?: string;
  wrapperClassName?: string;
  defaultCountry?: string;
  placeholder?: string;
}

export const FormPhoneInput: React.FC<FormPhoneInputProps> = ({
  name,
  label,
  className,
  wrapperClassName,
  defaultCountry = "NG",
  placeholder = "Enter phone number",
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className={cn("flex flex-col gap-1 w-full", wrapperClassName)}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <PhoneInput
            {...field}
            defaultCountry={defaultCountry as any}
            placeholder={placeholder}
            className={cn(
              "flex h-[52px] w-full border px-3 font-satoshi text-base md:text-sm bg-transparent",
              error && "border-destructive",
              className
            )}
            numberInputProps={{
              className:
                "bg-transparent outline-none w-full font-satoshi placeholder:text-muted-foreground",
            }}
          />
        )}
      />

      {error && (
        <p className="text-xs font-satoshi text-destructive">{error}</p>
      )}
    </div>
  );
};

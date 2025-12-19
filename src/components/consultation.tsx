import React, { useState } from "react";
import { FormInput } from "./input";
import { User } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { FormTextarea } from "./textarea";
import { Button } from "./ui/button";

type FormData = {
  name: string;
  message: string;
};

function Consultation() {
  const [loading, setLoading] = useState(false);
  const methods = useForm<FormData>({
    defaultValues: {
      name: "",
      message: "",
    },
  });
  return (
    <section>
      <div className="flex flex-col items-center justify-center py-8">
        <h1 className="text-2xl font-semibold ">Book Consultation</h1>
        <p className="text-sm text-center font-satoshi">
          Let's discuss your project and how we can help you.
        </p>
        <div className="px-8 w-full flex flex-col gap-4 mt-8">
          <FormProvider {...methods}>
            <FormInput
              name="name"
              type="text"
              placeholder="Enter your name"
              iconLeft={<User strokeWidth={0.75} />}
              className="h-[52px]"
            />
            <FormTextarea name="message" placeholder="Enter your message" />
          </FormProvider>

          <Button
            type="submit"
            disabled={loading}
            className="mt-4 bg-black text-white px-6 py-3 h-10 text-sm w-full rounded-none font-satoshi font-normal disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Consultation;

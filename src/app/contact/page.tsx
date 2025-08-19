"use client";

import React from "react";
import NewsletterSignup from "../features/homepage/news-letter";
import ConnectImage from "@/app/assets/png/contact.png";
import Image from "next/image";
import { useForm, FormProvider } from "react-hook-form";
import { FormInput } from "@/components/input";
import { FormCheckbox } from "@/components/checkbox";
import { Button } from "@/components/ui/button";
import FloralImage from "@/app/assets/png/floral.jpeg";
import FloralImage2 from "@/app/assets/png/floral2.jpeg";
type FormData = {
    email: string;
    password: string;
    remember: boolean;
};

function Contact() {
    const methods = useForm<FormData>({
        defaultValues: {
            email: "",
            password: "",
            remember: false,
        },
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <>
            <section className="relative w-full pt-50 h-[900px] md:h-[1100px]">
                <Image
                    src={ConnectImage}
                    alt="Story Image"
                    className="absolute inset-0 w-full  h-[1/2] object-cover"
                    priority
                />

                <div className="relative z-10 flex flex-col justify-center items-center w-full h-full px-4">
                    <div className="p-8 md:p-12 w-full max-w-4xl">
                        <h1 className="text-[32px] md:text-[48px] font-normal text-[#230D06] text-center">
                            Let’s Connect
                        </h1>
                        <p className="font-normal text-sm md:text-base text-center font-satoshi">
                            Got a question, project idea, or just want to say
                            hi? Fill out the
                            <br className="hidden md:block" />
                            form and I’ll get back to you soon.
                        </p>

                        <FormProvider {...methods}>
                            <form
                                onSubmit={methods.handleSubmit(onSubmit)}
                                className="mt-6 flex flex-col gap-6 bg-[#FCF8F5] p-8 px-10"
                            >
                                <div className="w-full flex flex-col md:flex-row gap-4">
                                    <FormInput
                                        name="first_name"
                                        type="text"
                                        placeholder="Enter your first name"
                                        className="h-[52px] w-full"
                                    />
                                    <FormInput
                                        name="last_name"
                                        type="text"
                                        placeholder="Enter your last name"
                                        className="h-[52px] w-full"
                                    />
                                </div>

                                <div className="w-full flex flex-col md:flex-row gap-4">
                                    <FormInput
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        className="h-[52px] w-full"
                                    />
                                    <FormInput
                                        name="phone_number"
                                        type="text"
                                        placeholder="Enter your phone number"
                                        className="h-[52px] w-full"
                                    />
                                </div>

                                <FormInput
                                    name="message_header"
                                    type="text"
                                    placeholder="Enter your message header"
                                    className="h-[52px] w-full"
                                />
                                <FormInput
                                    name="message"
                                    type="textarea"
                                    placeholder="Enter your message body"
                                    className="h-[200px] w-full"
                                />

                                <FormCheckbox
                                    name="terms"
                                    label={
                                        <span className="font-light text-sm">
                                            I read and accept all terms and
                                            conditions concerning the service
                                            use and privacy policy pursuant to
                                            article 13 of the GDPR.{" "}
                                            <span className="font-bold underline cursor-pointer">
                                                Read More
                                            </span>
                                        </span>
                                    }
                                />

                                <Button
                                    type="submit"
                                    className="mt-4 bg-black text-white px-6 py-3 text-sm w-full rounded-none"
                                >
                                    Send
                                </Button>
                            </form>
                        </FormProvider>
                    </div>
                </div>
                <div className="flex justify-between items-center absolute w-full bottom-0">
                    <Image
                        src={FloralImage}
                        alt="Floral Decoration"
                        width={200}
                        className="animate-bounce"
                    />
                    <Image
                        src={FloralImage2}
                        alt="Floral Decoration"
                        width={200}
                        className="animate-bounce delay-150"
                    />
                </div>
            </section>

            {/* Newsletter Section */}
            <div className="my-[100px]">
                <NewsletterSignup />
            </div>
        </>
    );
}

export default Contact;

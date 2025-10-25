"use client"

import { FormInput } from "@/components/input";
import { Button } from "@/components/ui/button";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";

type FormData = {
    email: string;
    password: string;
    remember: boolean;
};

function PortfolioRequest() {
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
        <section className="mb-[100px]">
            <h1 className="md:text-[60px] text-[28px] md:px-0 px-4 font-light text-center leading-[40px]">
                Request Our Portfolio
            </h1>
            <p className="md:text-base text-sm md:px-0 px-4  font-satoshi font-normal text-center text-[#4E5157] leading-[20px] md:leading-[50px]">
                Want to explore our full range of textile designs and past
                projects? Request our portfolio and we’ll send it straight to
                your inbox.
            </p>

            <div className="max-w-3xl mx-auto pt-4 md:pt-0">
                <div className="px-4 h-full">
                    <FormProvider {...methods}>
                        <section className="md:p-6 pt-0 w-full h-full">
                            <form
                                onSubmit={methods.handleSubmit(onSubmit)}
                                className="flex flex-col justify-start items-start gap-6 h-full"
                            >
                                <div className="w-full flex-col md:flex-row flex gap-4">
                                    <FormInput
                                        name="first_name"
                                        type="text"
                                        placeholder="Enter your full name"
                                        className="h-[52px]"
                                    />
                                      <FormInput
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        className="h-[52px]"
                                    />
                                </div>

                                <div className="w-full flex flex-col md:flex-row gap-4">
                                    <FormInput
                                        name="project_interest"
                                        type="text"
                                        placeholder="Project interest"
                                        className="h-[52px]"
                                    />
                                    <FormInput
                                        name="company"
                                        type="text"
                                        placeholder="Company / Studio"
                                        className="h-[52px]"
                                    />
                                </div>

                              
                                <FormInput
                                    name="message"
                                    type="textarea"
                                    placeholder="Enter your message body"
                                    className="h-[200px]"
                                />

                                <Button
                                    type="submit"
                                    className="mt-1  bg-black w-max text-white px-6 py-3 text-sm h-10 justify-center mx-auto  rounded-none font-satoshi font-normal"
                                >
                                    Request Portfolio
                                </Button>
                            </form>
                        </section>
                    </FormProvider>
                </div>
            </div>
        </section>
    );
}

export default PortfolioRequest;

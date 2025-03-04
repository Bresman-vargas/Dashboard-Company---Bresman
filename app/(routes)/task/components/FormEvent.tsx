"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";
import { Company } from "@prisma/client";

const formSchema = z.object({
    eventName: z.string().min(2),
    companySelected: z.object({
        name: z.string().min(2),
        id: z.string(),
    }),
});

interface FormEventProps {
    setNewEvent: Dispatch<
        SetStateAction<{
            eventName: string;
            companySelected: { name: string; id: string };
        }>
    >;
    setOpen: Dispatch<SetStateAction<boolean>>;
    companies: Company[];
    setOnSaveNewEvent: Dispatch<SetStateAction<boolean>>;
}

export function FormEvent(props: FormEventProps) {
    const { companies, setOpen, setOnSaveNewEvent, setNewEvent } = props;
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            eventName: "",
            companySelected: {
                name: "",
                id: "",
            },
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        setNewEvent(values);
        setOpen(false);
        setOnSaveNewEvent(true);
    }

    const handleCompanyChange = (newValue: string) => {
        const selectedCompany = companies.find((company) => company.id === newValue);
        if (selectedCompany) {
            form.setValue("companySelected.name", selectedCompany.name);
            form.setValue("companySelected.id", selectedCompany.id);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex flex-col gap-2">
                    <FormField
                        control={form.control}
                        name="eventName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Event Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Design meeting" autoComplete="off" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="companySelected.id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company Name</FormLabel>
                                <Select
                                    value={field.value}
                                    onValueChange={(newValue) => {
                                        field.onChange(newValue);
                                        handleCompanyChange(newValue);
                                    }}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a company" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {companies.map((company) => (
                                            <SelectItem key={company.id} value={company.id}>
                                                {company.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                
                <div className="flex justify-end">
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </Form>
    );
}

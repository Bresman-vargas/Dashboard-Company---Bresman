"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { isValid, z } from "zod"
import axios from 'axios'

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import  {FromCreateCustomersProps}  from "./FormCreateCompany.type"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

const latinAmericanCountries = [
    { value: "argentina", label: "Argentina" },
    { value: "bolivia", label: "Bolivia" },
    { value: "brazil", label: "Brasil" },
    { value: "chile", label: "Chile" },
    { value: "colombia", label: "Colombia" },
    { value: "costa-rica", label: "Costa Rica" },
    { value: "cuba", label: "Cuba" },
    { value: "dominican-republic", label: "República Dominicana" },
    { value: "ecuador", label: "Ecuador" },
    { value: "el-salvador", label: "El Salvador" },
    { value: "guatemala", label: "Guatemala" },
    { value: "honduras", label: "Honduras" },
    { value: "mexico", label: "México" },
    { value: "nicaragua", label: "Nicaragua" },
    { value: "panama", label: "Panamá" },
    { value: "paraguay", label: "Paraguay" },
    { value: "peru", label: "Perú" },
    { value: "puerto-rico", label: "Puerto Rico" },
    { value: "uruguay", label: "Uruguay" },
    { value: "venezuela", label: "Venezuela" },
];

function capitalize(text: string): string {
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
}

// Modificamos el esquema
const formSchema = z.object({
    name: z.string().min(1),
    country: z.string().min(2),
    website: z.string().min(2),
    rut: z.string().nullable(),
    phone: z.string().min(6),
})

import { toast } from "sonner";
export function FormCreateCustomer(props: FromCreateCustomersProps) {
    const { setOpenModalCreate } = props
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            country: "",
            website: "",
            rut: "",
            phone: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const dataToSend = {
                ...values,
                rut: values.rut?.trim() === "" ? null : values.rut,
            };
            await axios.post('/api/company', dataToSend);
            toast.success('Compañía creada exitosamente')
            router.refresh();
            setOpenModalCreate(false);
        } catch (error) {
            console.log("[COMPANY]", error);
            toast.error('La compañía no ha sido creada')
        }
    };


    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Company name..." type="text" autoComplete="off" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select the country" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {latinAmericanCountries.map((country) => (
                                                <SelectItem key={country.value} value={capitalize(country.value)}>
                                                    {country.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="website"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Website</FormLabel>
                                    <FormControl>
                                        <Input placeholder="www.teleton.cl" type="text" autoComplete="off" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="600 24500 03" type="text" autoComplete="off" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="rut"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rut/Run <span className="text-secondary-foreground">(Optional)</span></FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="71.238.300-3" 
                                            type="text" 
                                            autoComplete="off" 
                                            {...field} value={field.value ?? ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit" className="w-full sm:w-40 ">Submit</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
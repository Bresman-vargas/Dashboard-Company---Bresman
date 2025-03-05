"use client"
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import axios from "axios"
import { useParams, useRouter } from "next/navigation"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form"
import { 
  Select,
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import { toast} from "sonner"

const cargos = [
  { value: "gerente_general", label: "Gerente General" },
  { value: "director_finanzas", label: "Director de Finanzas" },
  { value: "director_tecnologia", label: "Director de Tecnología" },
  { value: "director_marketing", label: "Director de Marketing" },
  { value: "director_rrhh", label: "Director de Recursos Humanos" },
  { value: "gerente_operaciones", label: "Gerente de Operaciones" },
  { value: "gerente_comercial", label: "Gerente Comercial" },
  { value: "gerente_proyectos", label: "Gerente de Proyectos" },
  { value: "analista_financiero", label: "Analista Financiero" },
  { value: "analista_marketing", label: "Analista de Marketing" },
  { value: "analista_rrhh", label: "Analista de Recursos Humanos" },
  { value: "desarrollador_software", label: "Desarrollador de Software" },
  { value: "ingeniero_devops", label: "Ingeniero DevOps" },
  { value: "ingeniero_datos", label: "Ingeniero de Datos" },
  { value: "ingeniero_calidad", label: "Ingeniero de Calidad" },
  { value: "arquitecto_software", label: "Arquitecto de Software" },
  { value: "consultor_empresarial", label: "Consultor Empresarial" },
  { value: "especialista_seo", label: "Especialista en SEO" },
  { value: "especialista_uiux", label: "Especialista en UI/UX" },
  { value: "coordinador_proyectos", label: "Coordinador de Proyectos" },
  { value: "asistente_administrativo", label: "Asistente Administrativo" },
  { value: "asistente_contable", label: "Asistente Contable" },
  { value: "ejecutivo_ventas", label: "Ejecutivo de Ventas" },
  { value: "supervisor_produccion", label: "Supervisor de Producción" },
  { value: "jefe_logistica", label: "Jefe de Logística" },
  { value: "tecnico_soporte", label: "Técnico de Soporte" },
  { value: "tecnico_mantenimiento", label: "Técnico de Mantenimiento" },
  { value: "representante_atencion_cliente", label: "Representante de Atención al Cliente" }
];

const formSchema = z.object({
    name: z.string().nonempty().min(2).max(50),
    role: z.string(),
    email: z.string(),
    phone: z.string(),
})

export function FormContact() {
    const router = useRouter();
    const params = useParams<{companyId : string}>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            role: "",
            email: "",
            phone: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
        await axios.post(`/api/company/${params.companyId}/contact`, values);
        toast.success('Contact has been created')
        router.refresh();
      } catch (error) {
          console.log("[COMPANY]", error);
          toast.error('Contact has not been created')
      }
    }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Carlos Mendoza ..." autoComplete="off" {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cargos.map((cargo) => (
                          <SelectItem key={cargo.value} value={cargo.value}>
                            {cargo.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  <FormMessage />
                </FormItem>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="carlos.mendoza@mostersing.com ..." autoComplete="off" {...field} />
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
                  <Input placeholder="+34 654 789 321" autoComplete="off" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
            <Button type="submit">Save Contact</Button>
        </div>
      </form>
    </Form>
  )
}
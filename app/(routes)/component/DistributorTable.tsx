'use client'
import React from 'react'
import {TrendingUp} from 'lucide-react'
import { useTheme } from "next-themes";

import {
    Legend, XAxis,YAxis,
    CartesianGrid,
    Tooltip, BarChart,Bar,
    ResponsiveContainer
} from 'recharts'

const DistributorTableData = [
    { year: 2016, newCustomers: 120, oldCustomers: 500 },
    { year: 2017, newCustomers: 190, oldCustomers: 530 },
    { year: 2018, newCustomers: 160, oldCustomers: 510 },
    { year: 2019, newCustomers: 230, oldCustomers: 560 },
    { year: 2020, newCustomers: 280, oldCustomers: 540 },
    { year: 2021, newCustomers: 260, oldCustomers: 600 },
    { year: 2022, newCustomers: 200, oldCustomers: 580 },
    { year: 2023, newCustomers: 310, oldCustomers: 650 },
    { year: 2024, newCustomers: 400, oldCustomers: 620 },
    { year: 2025, newCustomers: 450, oldCustomers: 700 }
];


export function DistributorTable() {
    const { theme } = useTheme();
    const primaryColor = theme === "dark" ? "#3d61ff" : "#3d61ff";
    const secondaryColor = theme === "dark" ? "#172665" : "#2a43b2";
  return (
    <article>
        <header className='flex flex-col items-center'>
            <p className='font-semibold text-3xl mb-2'>24.420</p>
            <div className="flex gap-2">
                <div className="bg-primary text-primary-foreground px-2 rounded-md flex items-center gap-2">
                    8.5%
                    <TrendingUp strokeWidth={3} className='size-4'/>
                </div>
                <p className='text-secondary-foreground'>+1.234 increaced</p>
            </div>
        </header>

        <section className='h-[250px] mt-4 text-muted-foreground font-semibold'>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                width={500}
                height={300}
                data={DistributorTableData}
                margin={{
                    top: 0,
                    right: 5,
                    left: 0,
                    bottom: 0,
                }}
                >
                    <CartesianGrid strokeDasharray="0" horizontal={false} vertical={false} stroke="#DDDDDD"/>
                    <XAxis dataKey="year" stroke="Currentcolor" />
                    <YAxis stroke="Currentcolor"/>
                    <Tooltip cursor={false}/>
                    <Legend />
                    <Bar dataKey="newCustomers" stroke={primaryColor} stackId="a" fill={primaryColor}/>
                    <Bar dataKey="oldCustomers" stroke={secondaryColor} stackId="a" fill={secondaryColor} radius={[5, 5, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </section>
    </article>
  )
}

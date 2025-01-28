"use client"

import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts"

interface ChartProps {
    data: {
        date: string;
        revenue: number;
    }[];
}

interface DataPoint {
    date: string;
    revenue: number;
}

const aggregateData = (data: DataPoint[]): DataPoint[] => {
    const aggregatedData = data.reduce<Record<string, number>>((acc, curr) => {
        if (acc[curr.date]) {
            acc[curr.date] += curr.revenue;
        } else {
            acc[curr.date] = curr.revenue;
        }
        return acc;
    }, {});

    return Object.entries(aggregatedData).map(([date, revenue]) => ({
        date,
        revenue
    }));
}

export function Chart({ data }: ChartProps) {
    const processedData = aggregateData(data);
    
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={processedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3b82f6" 
                    activeDot={{ r: 8 }} 
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
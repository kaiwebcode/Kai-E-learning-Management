"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { styles } from "@/app/styles/style";
import { useGetUsersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import React, { FC } from "react";
import Loader from "../../Loader/Loader";

type Props = {
    isDashboard?: boolean;
};

const UserAnalytics = ({ isDashboard }: Props) => {
    const { data, isLoading } = useGetUsersAnalyticsQuery({});

    const analyticsData: any = [];

    data &&
        data.users.last12Months.forEach((item: any) => {
            analyticsData.push({ month: item.month, desktop: item.count });
        });

    const chartConfig = {
        desktop: {
            label: "Users",
            color: "hsl(var(--chart-1))",
        },
    } satisfies ChartConfig;

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div
                    className={`${!isDashboard
                        ? "mt-[30px] flex justify-center h-screen"
                        : "mt-[10px] rounded-xl"
                        }`}
                >
                    <div className="w-full max-w-5xl px-1 lg:mt-6 mt-16">
                        <h1
                            className={`text-2xl font-semibold ${isDashboard ? "!text-[20px] hidden" : ""
                                } text-3xl text-center font-semibold text-gray-900 dark:text-white pl-4`}
                        >
                            Users Analytics
                        </h1>
                        {!isDashboard && (
                            <p className="text-base text-gray-600 dark:text-gray-400 pl-4 pt-4">
                                Last 12 months analytics data
                            </p>
                        )}

                        <Card className="w-full mt-2 rounded-xl shadow-lg bg-white dark:bg-slate-900">
                            <CardHeader>
                                <CardTitle className="text-lg">Users Growth</CardTitle>
                                <CardDescription>Analytics for the past 12 months</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={chartConfig}>
                                    <AreaChart
                                        accessibilityLayer
                                        data={analyticsData}
                                        margin={{
                                            left: 16,
                                            right: 16,
                                            top: 10,
                                            bottom: 10,
                                        }}
                                        className="w-full"
                                    >
                                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                                        <XAxis
                                            dataKey="month"
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={8}
                                            tickFormatter={(value) => value.slice(0, 3)}
                                            className="text-gray-600 dark:text-gray-400"
                                        />
                                        <ChartTooltip
                                            cursor={false}
                                            content={<ChartTooltipContent indicator="line" />}
                                        />
                                        <Area
                                            dataKey="desktop"
                                            type="monotone"
                                            fill="hsl(var(--chart-1))"
                                            fillOpacity={0.5}
                                            stroke="hsl(var(--chart-1))"
                                            strokeWidth={2}
                                        />
                                    </AreaChart>
                                </ChartContainer>
                            </CardContent>
                            <CardFooter className="flex justify-between items-center px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                    <TrendingUp className="h-5 w-5 text-green-500" />
                                    <span className="font-medium">Up by 5.2% this month</span>
                                </div>
                                <span className="text-sm text-gray-500 dark:text-gray-400">Last 12 months</span>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserAnalytics;

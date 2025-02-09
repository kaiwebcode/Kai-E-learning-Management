"use client";

import { TrendingUp } from "lucide-react";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
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
import { useGetOrdersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import React from "react";
import Loader from "../../Loader/Loader";

type Props = {
  isDashboard?: boolean;
};

export default function OrdersAnalytics({ isDashboard }: Props) {
  const { data, isLoading } = useGetOrdersAnalyticsQuery({});

  const analyticsData: any = [];

  data &&
    data.orders.last12Months.forEach((item: any) => {
      analyticsData.push({ month: item.name, orders: item.count });
    });

  const chartConfig = {
    orders: {
      label: "Orders",
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
            : " rounded-xl"
            }`}
        >
          <div className="w-full max-w-5xl px-1 lg:mt-4 mt-14">
            {/* <h1
              className={`text-2xl font-semibold ${
                isDashboard ? "!text-[21px]" : ""
              } lg:pl-4 pl-2 text-gray-900 dark:text-white`}
            >
              Orders Analytics
            </h1>
            {!isDashboard && (
              <p className="text-sm text-gray-600 dark:text-gray-400 lg:pl-4 pl-2">
                Last 12 months analytics data
              </p>
            )} */}
            {/* Title Section */}
            <h1 className={`${isDashboard ? "!text-[20px] hidden" : ""
              } ${styles.title} text-2xl font-semibold text-gray-900 dark:text-white pl-4`}>
              Orders Analytics
            </h1>
            <p className={`${isDashboard ? "!text-[20px] hidden" : ""
              } text-base text-gray-600 dark:text-gray-400 pl-4 pt-4`}>
              Last 12 months analytics data
            </p>

            <Card className="w-full mt-2 rounded-xl shadow-xl bg-white dark:bg-slate-900">
              <CardHeader>
                <CardTitle className="text-lg">Orders Growth</CardTitle>
                <CardDescription>Tracking orders over the past 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <LineChart
                    accessibilityLayer
                    data={analyticsData}
                    margin={{
                      left: 1,
                      right: 5,
                      top: 10,
                      bottom: 1,
                    }}
                    className="w-full"
                  >
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value} // ✅ Displays full month names
                      className="text-gray-600 dark:text-gray-400"
                    />
                    <YAxis className="text-gray-600 dark:text-gray-400" />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Line
                      dataKey="orders"
                      type="monotone"
                      stroke="hsl(var(--chart-1))"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col items-start gap-2 text-sm px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-2 font-medium text-gray-700 dark:text-gray-300">
                  Trending up by 5.2% this month <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Showing total orders for the last 12 months
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}

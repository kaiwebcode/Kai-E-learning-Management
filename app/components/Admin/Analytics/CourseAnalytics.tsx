"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis, ResponsiveContainer } from "recharts";
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
import { useGetCoursesAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import React from "react";
import Loader from "../../Loader/Loader";

type Props = {};

const CourseAnalytics = (props: Props) => {
  const { data, isLoading } = useGetCoursesAnalyticsQuery({});

  const analyticsData: any = [];

  data &&
    data.courses.last12Months.forEach((item: any) => {
      analyticsData.push({ month: item.month, courses: item.count });
    });

  const chartConfig = {
    courses: {
      label: "Courses",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full flex justify-center mt-16 h-screen lg:mt-6">
          <div className="w-full max-w-5xl px-2 md:px-8">
            {/* Title Section */}
            <h1 className={`${styles.title} text-2xl font-semibold text-gray-900 dark:text-white pl-4`}>
              Courses Analytics
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400 pl-4 pt-4">
              Last 12 months analytics data
            </p>

            {/* Chart Card */}
            <Card className="w-full mt-2 rounded-xl shadow-lg bg-white dark:bg-slate-900">
              <CardHeader>
                <CardTitle className="text-lg">Course Enrollment Trend</CardTitle>
                <CardDescription>Tracking course enrollments over the past 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analyticsData} margin={{ top: 20, left: 1, right: 1 }}>
                      <CartesianGrid vertical={false} strokeOpacity={0.2} />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value}
                        className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm"
                      />
                      <YAxis className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm" />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                      />
                      <Bar dataKey="courses" fill="hsl(var(--chart-1))" radius={8}>
                        <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>

              {/* Footer Section */}
              <CardFooter className="flex flex-col items-start gap-2 text-sm px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300">
                  Trending up by 5.2% this month <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Showing total enrollments for the last 12 months
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAnalytics;

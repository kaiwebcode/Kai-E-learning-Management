import React, { FC, useEffect, useState } from "react";
import UserAnalytics from "../Analytics/UserAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress } from "@mui/material";
import OrdersAnalytics from "../Analytics/OrdersAnalytics";
import AllInvoices from "../Order/AllInvoices";
import {
    useGetOrdersAnalyticsQuery,
    useGetUsersAnalyticsQuery,
} from "@/redux/features/analytics/analyticsApi";
import { Progress } from "@/components/ui/progress";
import { DollarSign, ShoppingBag, User2 } from "lucide-react";
import CountUp from "react-countup";


type Props = {
    open?: boolean;
    value?: number;
};

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
    return (
        <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress
                variant="determinate"
                value={value}
                size={45}
                color={value && value > 99 ? "info" : "error"}
                thickness={4}
                style={{ zIndex: open ? -1 : 1 }}
            />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            />
        </Box>
    );
};

const DashboardWidgets: FC<Props> = ({ open }) => {
    const [ordersComparePercentage, setOrdersComparePercentage] = useState<any>();
    const [userComparePercentage, setUserComparePercentage] = useState<any>();

    const { data, isLoading } = useGetUsersAnalyticsQuery({});
    const { data: ordersData, isLoading: ordersLoading } =
        useGetOrdersAnalyticsQuery({});

    useEffect(() => {
        if (isLoading || ordersLoading) return;

        if (data && ordersData) {
            const usersLastTwoMonths = data.users.last12Months.slice(-2);
            const ordersLastTwoMonths = ordersData.orders.last12Months.slice(-2);

            if (usersLastTwoMonths.length === 2 && ordersLastTwoMonths.length === 2) {
                const usersCurrentMonth = usersLastTwoMonths[1].count;
                const usersPreviousMonth = usersLastTwoMonths[0].count;
                const ordersCurrentMonth = ordersLastTwoMonths[1].count;
                const ordersPreviousMonth = ordersLastTwoMonths[0].count;

                const usersPercentChange =
                    usersPreviousMonth !== 0
                        ? ((usersCurrentMonth - usersPreviousMonth) /
                            usersPreviousMonth) *
                        100
                        : 100;

                const ordersPercentChange =
                    ordersPreviousMonth !== 0
                        ? ((ordersCurrentMonth - ordersPreviousMonth) /
                            ordersPreviousMonth) *
                        100
                        : 100;

                setUserComparePercentage({
                    currentMonth: usersCurrentMonth,
                    previousMonth: usersPreviousMonth,
                    percentChange: usersPercentChange,
                });

                setOrdersComparePercentage({
                    currentMonth: ordersCurrentMonth,
                    previousMonth: ordersPreviousMonth,
                    percentChange: ordersPercentChange,
                });
            }
        }
    }, [isLoading, ordersLoading, data, ordersData]);

    return (
        <div className=" w-full">
            {/* Top Section */}
            <div className="grid gap-3 lg:grid-cols-3 sm:grid-cols-1">
                {/* User Analytics */}
                <div className="col-span-2 max-w-full">
                    <UserAnalytics isDashboard={true} />
                </div>

                {/* Circular Progress Widgets */}
                <div className="space-y-4 lg:col-span-1 col-span-2 w-full lg:mt-44 mt-1">
                    {/* Orders Widget */}
                    {/* <Card className="w-full shadow-lg bg-white dark:bg-gray-900">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle>Total Revenue</CardTitle>
                            <DollarSign className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">
                                ₹
                                <CountUp end={100} duration={2} />
                            </p>
                            <p className="text-xs text-muted-foreground">Based on 100 Charges</p>
                        </CardContent>
                    </Card> */}
                    <Card className="w-full shadow-lg bg-white dark:bg-gray-900">
                        <CardHeader className="flex flex-row items-center justify-between pb-4">
                            {/* <div> */}
                            <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-2">

                                <p className="text-2xl font-bold">
                                    {/* ₹ */}
                                    <CountUp end={ordersComparePercentage?.currentMonth} duration={2} />
                                </p>
                                <p className="text-lg text-gray-500 dark:text-gray-400 py-1">Sales Obtained</p>
                                <p className="text-sm text-muted-foreground">
                                    Total Sales on Kai-Elearning last month
                                </p>
                            </CardTitle>
                            <ShoppingBag className="h-6 w-6 text-green-500" />
                            {/* </div> */}
                        </CardHeader>
                        <CardContent>
                            <Progress value={Math.min(Math.abs(ordersComparePercentage?.percentChange || 0), 100)} />
                        </CardContent>
                        <CardFooter className="text-center text-sm text-gray-700 dark:text-gray-300">
                            {ordersComparePercentage?.percentChange > 0 ? (
                                <span className="text-green-500">
                                    +{ordersComparePercentage?.percentChange.toFixed(2)}%
                                </span>
                            ) : (
                                <span className="text-red-500">
                                    {ordersComparePercentage?.percentChange.toFixed(2)}%
                                </span>
                            )}
                        </CardFooter>
                    </Card>

                    {/* Users Widget */}
                    <Card className="w-full shadow-lg bg-white dark:bg-gray-900">
                        <CardHeader className="flex flex-row items-center justify-between pb-4">
                            {/* <div> */}
                            <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-2">
                                {/* {userComparePercentage?.currentMonth} */}
                                <p className="text-2xl font-bold">
                                    <CountUp end={userComparePercentage?.currentMonth} duration={2.5} />
                                </p>
                                <p className="text-lg text-gray-500 dark:text-gray-400 py-1">New Users</p>
                                <p className="text-sm text-muted-foreground">
                                    Total Users Signed Up last month
                                </p>
                            </CardTitle>
                            <User2 className="text-5xl text-blue-500" />
                            {/* </div> */}
                        </CardHeader>
                        <CardContent>
                            <Progress value={Math.min(Math.abs(userComparePercentage?.percentChange || 0), 100)} />
                        </CardContent>
                        <CardFooter className="text-center text-sm text-gray-700 dark:text-gray-300">
                            {userComparePercentage?.percentChange > 0 ? (
                                <span className="text-green-500">
                                    +{userComparePercentage?.percentChange.toFixed(2)}%
                                </span>
                            ) : (
                                <span className="text-red-500">
                                    {userComparePercentage?.percentChange.toFixed(2)}%
                                </span>
                            )}
                        </CardFooter>
                    </Card>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="grid gap-4 lg:grid-cols-2 sm:grid-cols-1 lg:mt-6 mt-0">
                {/* Orders Analytics */}
                {/* <div className="bg-white dark:bg-gray-800 rounded-lg shadow lg:p-2 lg:pt-5 pb-8  max-w-full overflow-hidden"> */}
                <OrdersAnalytics isDashboard={true} />
                {/* </div> */}

                {/* Recent Transactions */}
                <div className=" rounded-lg overflow-hidden px-1">
                    <h5 className="text-2xl font-medium text-gray-700 dark:text-gray-300 py-2">
                        Recent Transactions
                    </h5>
                    <AllInvoices isDashboard={true} />
                </div>
            </div>
        </div>
    );
};

export default DashboardWidgets;

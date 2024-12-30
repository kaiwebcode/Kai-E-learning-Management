import React, { FC, useEffect, useState } from "react";
import UserAnalytics from "../Analytics/UserAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress } from "@mui/material";
import OrdersAnalytics from "../Analytics/OrdersAnalytics";
import AllInvoices from "../Order/AllInvoices";
import {
    useGetOrdersAnalyticsQuery,
    useGetUsersAnalyticsQuery,
} from "@/redux/features/analytics/analyticsApi";

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
        <div className=" pl-6 pr-3 w-full">
            {/* Top Section */}
            <div className="grid gap-6 lg:grid-cols-3 sm:grid-cols-1">
                {/* User Analytics */}
                <div className="col-span-2 max-w-full">
                    <UserAnalytics isDashboard={true} />
                </div>

                {/* Circular Progress Widgets */}
                <div className="space-y-4 lg:col-span-1 col-span-2 w-full">
                    {/* Orders */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow lg:mt-24 mt-1 p-6 w-[100%]">
                        <div className="flex items-center justify-between">
                            <div>
                                <BiBorderLeft className="text-4xl text-green-500" />
                                <h5 className="mt-2 text-xl font-medium text-gray-700 dark:text-gray-300">
                                    {ordersComparePercentage?.currentMonth}
                                </h5>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Sales Obtained
                                </p>
                            </div>
                            <div>
                                <CircularProgressWithLabel
                                    value={
                                        ordersComparePercentage?.percentChange > 0 ? 100 : 0
                                    }
                                    open={open}
                                />
                                <p className="mt-2 text-center text-sm">
                                    {ordersComparePercentage?.percentChange > 0
                                        ? `+${ordersComparePercentage?.percentChange.toFixed(2)}%`
                                        : `${ordersComparePercentage?.percentChange.toFixed(2)}%`}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Users */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6  w-full">
                        <div className="flex items-center justify-between">
                            <div>
                                <PiUsersFourLight className="text-4xl text-blue-500" />
                                <h5 className="mt-2 text-xl font-medium text-gray-700 dark:text-gray-300">
                                    {userComparePercentage?.currentMonth}
                                </h5>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    New Users
                                </p>
                            </div>
                            <div>
                                <CircularProgressWithLabel
                                    value={userComparePercentage?.percentChange > 0 ? 100 : 0}
                                    open={open}
                                />
                                <p className="mt-2 text-center text-sm">
                                    {userComparePercentage?.percentChange > 0
                                        ? `+${userComparePercentage?.percentChange.toFixed(2)}%`
                                        : `${userComparePercentage?.percentChange.toFixed(2)}%`}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="grid gap-4 lg:grid-cols-2 sm:grid-cols-1 mt-6">
                {/* Orders Analytics */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow lg:p-2 lg:pt-5 pb-8  max-w-full overflow-hidden">
                    <OrdersAnalytics isDashboard={true} />
                </div>

                {/* Recent Transactions */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow lg:p-5 p-2 overflow-hidden">
                    <h5 className="text-xl font-medium text-gray-700 dark:text-gray-300 pb-4 pt-2">
                        Recent Transactions
                    </h5>
                    <AllInvoices isDashboard={true} />
                </div>
            </div>
        </div>
    );
};

export default DashboardWidgets;

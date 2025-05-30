"use client";

import React from "react";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { ChatList } from "@/ui/components/ChatList";
import { Calendar } from "@/ui/components/Calendar";
import * as SubframeCore from "@subframe/core";
import { AreaChart } from "@/ui/components/AreaChart";

function HomeScreenDashboard() {
  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start">
        <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-8 mobile:gap-6 bg-default-background px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 overflow-auto">
          {/* Header Section */}
          <div className="flex w-full items-center justify-between">
            <span className="text-heading-1 font-heading-1 text-default-font mobile:text-heading-2 mobile:font-heading-2">
              Hub
            </span>
          </div>
          
          {/* Chat and Calendar Section */}
          <div className="flex w-full flex-col gap-8 lg:flex-row lg:gap-12">
            {/* Chat List Container */}
            <div className="flex-1 min-w-0">
              <div className="mb-4">
                <h2 className="text-heading-3 font-heading-3 text-default-font">Recent Messages</h2>
              </div>
              <div className="p-6 mobile:p-4 bg-neutral-50 rounded-md border border-neutral-border">
                <ChatList>
                  <ChatList.ChatListItem
                    avatar="https://res.cloudinary.com/subframe/image/upload/v1711417513/shared/kwut7rhuyivweg8tmyzl.jpg"
                    name="Jack Daniels"
                    message="I'm on my way!"
                    timestamp="5 minutes ago"
                    selected={true}
                  />
                  <ChatList.ChatListItem
                    avatar="https://res.cloudinary.com/subframe/image/upload/v1711417514/shared/ubsk7cs5hnnaj798efej.jpg"
                    name="John Smith"
                    message="Thanks for the recommendations"
                    timestamp="1 hour ago"
                    unread={true}
                  />
                  <ChatList.ChatListItem
                    avatar="https://res.cloudinary.com/subframe/image/upload/v1711417507/shared/fychrij7dzl8wgq2zjq9.avif"
                    name="Jane Doe"
                    message="What time will you be there?"
                    timestamp="Yesterday"
                    replied={true}
                  />
                </ChatList>
              </div>
            </div>
            
            {/* Calendar Container */}
            <div className="w-full lg:flex-shrink-0 lg:w-80">
              <div className="mb-4">
                <h2 className="text-heading-3 font-heading-3 text-default-font">Calendar</h2>
              </div>
              <div className="p-6 mobile:p-4 bg-neutral-50 rounded-md border border-neutral-border">
                <Calendar
                  mode={"single"}
                  selected={new Date()}
                  onSelect={(date: Date | undefined) => {}}
                />
              </div>
            </div>
          </div>
          
          {/* Chart Section */}
          <div className="w-full">
            <div className="mb-6">
              <h2 className="text-heading-3 font-heading-3 text-default-font">Revenue Overview</h2>
              <p className="text-body font-body text-subtext-color mt-1">Track your revenue across different categories</p>
            </div>
            <div className="p-8 mobile:p-4 bg-neutral-50 rounded-md border border-neutral-border overflow-x-auto">
              <div className="min-w-[600px]">
                <AreaChart
                  stacked={false}
                  categories={["Biology", "Business", "Psychology"]}
                  data={[
                    { Year: "2015", Psychology: 120, Business: 110, Biology: 100 },
                    { Year: "2016", Psychology: 130, Business: 95, Biology: 105 },
                    { Year: "2017", Psychology: 115, Business: 105, Biology: 110 },
                    { Year: "2018", Psychology: 125, Business: 120, Biology: 90 },
                    { Year: "2019", Psychology: 110, Business: 130, Biology: 85 },
                    { Year: "2020", Psychology: 135, Business: 100, Biology: 95 },
                    { Year: "2021", Psychology: 105, Business: 115, Biology: 120 },
                    { Year: "2022", Psychology: 140, Business: 125, Biology: 130 },
                  ]}
                  index={"Year"}
                  xAxis={
                    <SubframeCore.XAxis
                      dataKey={"Year"}
                      label={
                        <SubframeCore.ChartLabel
                          className="text-body-bold font-body-bold fill-default-font"
                          offset={-20}
                          position="insideBottom"
                          value={"Close date"}
                        />
                      }
                    />
                  }
                  yAxis={
                    <SubframeCore.YAxis
                      label={
                        <SubframeCore.ChartLabel
                          className="text-body-bold font-body-bold fill-default-font"
                          offset={-15}
                          position="insideLeft"
                          angle={-90}
                          value={"Revenue"}
                        />
                      }
                    />
                  }
                  margin={{ bottom: 30, left: 20, right: 5, top: 5 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultPageLayout>
  );
}

export default HomeScreenDashboard;
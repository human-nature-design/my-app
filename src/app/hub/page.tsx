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
        <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-8 bg-default-background px-8 py-8 overflow-auto">
          <div className="flex w-full items-center justify-between">
            <span className="text-heading-1 font-heading-1 text-default-font">
              Hub
            </span>
          </div>
          <div className="flex w-full items-center gap-2">
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
            <Calendar
              mode={"single"}
              selected={new Date()}
              onSelect={(date: Date | undefined) => {}}
            />
          </div>
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
                    value={"REvenue"}
                  />
                }
              />
            }
            margin={{ bottom: 30, left: 20, right: 5, top: 5 }}
          />
        </div>
      </div>
    </DefaultPageLayout>
  );
}

export default HomeScreenDashboard;
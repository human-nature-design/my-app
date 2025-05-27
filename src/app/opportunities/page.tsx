"use client";

import React from "react";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { Button } from "@/ui/components/Button";
import { TextField } from "@/ui/components/TextField";
import { Badge } from "@/ui/components/Badge";
import { Avatar } from "@/ui/components/Avatar";
import { Progress } from "@/ui/components/Progress";

function Opportunities() {
  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start">
        <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-8 bg-default-background px-8 py-8 overflow-auto">
          <div className="flex w-full items-center justify-between">
            <span className="text-heading-1 font-heading-1 text-default-font">
              Opportunities
            </span>
            <Button
              icon="FeatherPlus"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              New Opportunity
            </Button>
          </div>
          <div className="flex w-full flex-wrap items-start gap-4">
            <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 rounded-md bg-neutral-50 px-4 py-4">
              <span className="text-caption-bold font-caption-bold text-subtext-color">
                TOTAL PIPELINE
              </span>
              <span className="text-heading-2 font-heading-2 text-default-font">
                $1.2M
              </span>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 rounded-md bg-neutral-50 px-4 py-4">
              <span className="text-caption-bold font-caption-bold text-subtext-color">
                AVG DEAL SIZE
              </span>
              <span className="text-heading-2 font-heading-2 text-default-font">
                $24.5K
              </span>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 rounded-md bg-neutral-50 px-4 py-4">
              <span className="text-caption-bold font-caption-bold text-subtext-color">
                WIN RATE
              </span>
              <span className="text-heading-2 font-heading-2 text-default-font">
                68%
              </span>
            </div>
          </div>
          <div className="flex w-full items-center gap-4">
            <TextField
              className="h-auto w-64 flex-none"
              variant="filled"
              label=""
              helpText=""
              icon="FeatherSearch"
            >
              <TextField.Input
                placeholder="Search opportunities..."
                value=""
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
              />
            </TextField>
            <Button
              variant="neutral-tertiary"
              icon="FeatherFilter"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              Filter
            </Button>
          </div>
          <div className="flex w-full grow shrink-0 basis-0 items-start gap-4 overflow-auto">
          <div className="flex w-64 flex-none flex-col items-start gap-4">
            <div className="flex w-full items-center justify-between rounded-md bg-neutral-50 px-4 py-2">
              <span className="text-body-bold font-body-bold text-default-font">
                Qualified
              </span>
              <Badge>4</Badge>
            </div>
            <div className="flex w-full flex-col items-start gap-4">
              <div className="flex w-full flex-col items-start gap-2 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
                <div className="flex w-full items-center justify-between">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Enterprise License
                  </span>
                  <Badge variant="success">$75K</Badge>
                </div>
                <div className="flex w-full items-center gap-2">
                  <Avatar
                    size="small"
                    image="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                  >
                    T
                  </Avatar>
                  <span className="text-body font-body text-subtext-color">
                    TechCorp Inc
                  </span>
                </div>
                <div className="flex w-full items-center justify-between">
                  <span className="text-caption font-caption text-subtext-color">
                    Close: Aug 15
                  </span>
                  <Progress value={75} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-64 flex-none flex-col items-start gap-4">
            <div className="flex w-full items-center justify-between rounded-md bg-neutral-50 px-4 py-2">
              <span className="text-body-bold font-body-bold text-default-font">
                Proposal
              </span>
              <Badge variant="warning">3</Badge>
            </div>
            <div className="flex w-full flex-col items-start gap-4">
              <div className="flex w-full flex-col items-start gap-2 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
                <div className="flex w-full items-center justify-between">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Team Plan
                  </span>
                  <Badge variant="success">$45K</Badge>
                </div>
                <div className="flex w-full items-center gap-2">
                  <Avatar
                    size="small"
                    image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                  >
                    G
                  </Avatar>
                  <span className="text-body font-body text-subtext-color">
                    Global Systems
                  </span>
                </div>
                <div className="flex w-full items-center justify-between">
                  <span className="text-caption font-caption text-subtext-color">
                    Close: Aug 30
                  </span>
                  <Progress value={50} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-64 flex-none flex-col items-start gap-4">
            <div className="flex w-full items-center justify-between rounded-md bg-neutral-50 px-4 py-2">
              <span className="text-body-bold font-body-bold text-default-font">
                Negotiation
              </span>
              <Badge>2</Badge>
            </div>
            <div className="flex w-full flex-col items-start gap-4">
              <div className="flex w-full flex-col items-start gap-2 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
                <div className="flex w-full items-center justify-between">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Custom Solution
                  </span>
                  <Badge variant="success">$120K</Badge>
                </div>
                <div className="flex w-full items-center gap-2">
                  <Avatar
                    size="small"
                    image="https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                  >
                    I
                  </Avatar>
                  <span className="text-body font-body text-subtext-color">
                    Innovate Co
                  </span>
                </div>
                <div className="flex w-full items-center justify-between">
                  <span className="text-caption font-caption text-subtext-color">
                    Close: Sep 15
                  </span>
                  <Progress value={90} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-64 flex-none flex-col items-start gap-4">
            <div className="flex w-full items-center justify-between rounded-md bg-neutral-50 px-4 py-2">
              <span className="text-body-bold font-body-bold text-default-font">
                Closed Won
              </span>
              <Badge variant="success">2</Badge>
            </div>
            <div className="flex w-full flex-col items-start gap-4">
              <div className="flex w-full flex-col items-start gap-2 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
                <div className="flex w-full items-center justify-between">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Enterprise Plus
                  </span>
                  <Badge variant="success">$95K</Badge>
                </div>
                <div className="flex w-full items-center gap-2">
                  <Avatar
                    size="small"
                    image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                  >
                    A
                  </Avatar>
                  <span className="text-body font-body text-subtext-color">
                    Acme Corp
                  </span>
                </div>
                <div className="flex w-full items-center justify-between">
                  <span className="text-caption font-caption text-subtext-color">
                    Closed: Jul 30
                  </span>
                  <Progress value={100} />
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </DefaultPageLayout>
  );
}

export default Opportunities;
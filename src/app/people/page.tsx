"use client";

import React, { useEffect, useState } from "react";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { UniversalSearch } from "@/ui/components/UniversalSearch";
import { Button } from "@/ui/components/Button";
import { Table } from "@/ui/components/Table";
import { Badge } from "@/ui/components/Badge";
import { DropdownMenu } from "@/ui/components/DropdownMenu";
import * as SubframeCore from "@subframe/core";
import { IconButton } from "@/ui/components/IconButton";
import { supabase } from "@/lib/supabase";
import { AreaChart } from "@/ui/components/AreaChart";

interface Person {
  id: number;
  name: string;
  email: string;
  phone: string;
  companyId: number;
}

function People() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPeople() {
      try {
        const { data, error } = await supabase
          .from('People')
          .select('*');
        
        if (error) throw error;
        setPeople(data || []);
      } catch (error) {
        console.error('Error fetching people:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPeople();
  }, []);

  return (
    <DefaultPageLayout>
      <div className="container max-w-none flex h-full w-full flex-col items-start gap-4 bg-default-background py-12">
        <UniversalSearch icon="FeatherSearch" />
        <div className="flex w-full items-center gap-2">
          <Button onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}>
            Add person
          </Button>
        </div>
        <Table
          header={
            <Table.HeaderRow>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Phone</Table.HeaderCell>
              <Table.HeaderCell>Company</Table.HeaderCell>
            </Table.HeaderRow>
          }
        >
          {loading ? (
            <Table.Row>
              <Table.Cell colSpan={4}>
                <span className="text-body font-body text-neutral-500">Loading...</span>
              </Table.Cell>
            </Table.Row>
          ) : (
            people.map((person) => (
              <Table.Row key={person.id}>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body-bold font-body-bold text-neutral-700">
                    {person.name}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body font-body text-neutral-500">
                    {person.email}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body font-body text-neutral-500">
                    {person.phone}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body font-body text-neutral-500">
                    {person.companyId}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex grow shrink-0 basis-0 items-center justify-end">
                    <SubframeCore.DropdownMenu.Root>
                      <SubframeCore.DropdownMenu.Trigger asChild={true}>
                        <IconButton
                          size="medium"
                          icon="FeatherMoreHorizontal"
                          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                        />
                      </SubframeCore.DropdownMenu.Trigger>
                      <SubframeCore.DropdownMenu.Portal>
                        <SubframeCore.DropdownMenu.Content
                          side="bottom"
                          align="end"
                          sideOffset={8}
                          asChild={true}
                        >
                          <DropdownMenu>
                            <DropdownMenu.DropdownItem icon="FeatherStar">
                              Favorite
                            </DropdownMenu.DropdownItem>
                            <DropdownMenu.DropdownItem icon="FeatherPlus">
                              Add
                            </DropdownMenu.DropdownItem>
                            <DropdownMenu.DropdownItem icon="FeatherEdit2">
                              Edit
                            </DropdownMenu.DropdownItem>
                            <DropdownMenu.DropdownItem icon="FeatherTrash">
                              Delete
                            </DropdownMenu.DropdownItem>
                          </DropdownMenu>
                        </SubframeCore.DropdownMenu.Content>
                      </SubframeCore.DropdownMenu.Portal>
                    </SubframeCore.DropdownMenu.Root>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table>
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
/>

    </DefaultPageLayout>
  );
}



export default People;


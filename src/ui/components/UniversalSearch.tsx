"use client";
/*
 * Documentation:
 * Universal search — https://app.subframe.com/f183fbad57c0/library?component=Universal+search_4cfc42cb-6ac0-4dfb-9504-2a30d4aa8c8e
 * Text Field Unstyled — https://app.subframe.com/f183fbad57c0/library?component=Text+Field+Unstyled_abb07b95-d67f-418c-aea5-aba353cce0d4
 */

import React from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";
import { TextFieldUnstyled } from "./TextFieldUnstyled";

interface UniversalSearchRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  icon?: SubframeCore.IconName;
  className?: string;
}

const UniversalSearchRoot = React.forwardRef<
  HTMLElement,
  UniversalSearchRootProps
>(function UniversalSearchRoot(
  {
    icon = "FeatherSearch",
    className,
    ...otherProps
  }: UniversalSearchRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex w-full items-center gap-4 border-b border-solid border-neutral-border px-6 py-4",
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      <div className="flex h-10 grow shrink-0 basis-0 items-center gap-4 rounded-md px-4 shadow-md">
        <SubframeCore.Icon
          className="text-body font-body text-subtext-color"
          name={icon}
        />
        <TextFieldUnstyled>
          <TextFieldUnstyled.Input placeholder="Search across all records" />
        </TextFieldUnstyled>
      </div>
    </div>
  );
});

export const UniversalSearch = UniversalSearchRoot;

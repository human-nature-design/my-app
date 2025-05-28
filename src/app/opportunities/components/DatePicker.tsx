"use client";

import React, { useState } from "react";
import { Calendar } from "@/ui/components/Calendar";
import { TextField } from "@/ui/components/TextField";
import * as SubframeCore from "@subframe/core";

interface DatePickerProps {
  label?: string;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  error?: boolean;
  helpText?: string;
  className?: string;
}

export function DatePicker({ 
  label, 
  value, 
  onChange, 
  placeholder = "Select date", 
  error = false,
  helpText,
  className 
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      onChange?.(selectedDate);
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    onChange?.(null);
    setIsOpen(false);
  };

  return (
    <div className={className}>
      <SubframeCore.DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
        <SubframeCore.DropdownMenu.Trigger asChild>
          <div>
            <TextField
              label={label}
              error={error}
              helpText={helpText}
              icon="FeatherCalendar"
            >
              <TextField.Input
                value={formatDate(value ?? null)}
                placeholder={placeholder}
                readOnly
                className="cursor-pointer"
                onClick={() => setIsOpen(true)}
              />
            </TextField>
          </div>
        </SubframeCore.DropdownMenu.Trigger>
        
        <SubframeCore.DropdownMenu.Portal>
          <SubframeCore.DropdownMenu.Content
            side="bottom"
            align="start"
            sideOffset={4}
            className="z-50"
          >
            <div className="flex flex-col bg-default-background border border-solid border-neutral-border rounded-md shadow-lg p-4">
              <Calendar
                mode="single"
                selected={value || undefined}
                onSelect={handleDateSelect}
                className="w-auto"
              />
              
              {value && (
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-neutral-border">
                  <span className="text-caption font-caption text-subtext-color">
                    Selected: {formatDate(value)}
                  </span>
                  <button
                    onClick={handleClear}
                    className="text-caption font-caption text-red-600 hover:text-red-700 hover:underline"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          </SubframeCore.DropdownMenu.Content>
        </SubframeCore.DropdownMenu.Portal>
      </SubframeCore.DropdownMenu.Root>
    </div>
  );
} 
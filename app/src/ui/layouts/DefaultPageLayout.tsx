"use client";
/*
 * Documentation:
 * Default Page Layout — https://app.subframe.com/f183fbad57c0/library?component=Default+Page+Layout_a57b1c43-310a-493f-b807-8cc88e2452cf
 * Sidebar with sections — https://app.subframe.com/f183fbad57c0/library?component=Sidebar+with+sections_f4047c8b-cfb4-4761-b9cf-fbcae8a9b9b5
 * Avatar — https://app.subframe.com/f183fbad57c0/library?component=Avatar_bec25ae6-5010-4485-b46b-cf79e3943ab2
 * Dropdown Menu — https://app.subframe.com/f183fbad57c0/library?component=Dropdown+Menu_99951515-459b-4286-919e-a89e7549b43b
 * Icon Button — https://app.subframe.com/f183fbad57c0/library?component=Icon+Button_af9405b1-8c54-4e01-9786-5aad308224f6
 */

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import * as SubframeUtils from "../utils";
import { SidebarWithSections } from "../components/SidebarWithSections";
import { Avatar } from "../components/Avatar";
import { DropdownMenu } from "../components/DropdownMenu";
import * as SubframeCore from "@subframe/core";
import { IconButton } from "../components/IconButton";

interface DefaultPageLayoutRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const DefaultPageLayoutRoot = React.forwardRef<
  HTMLElement,
  DefaultPageLayoutRootProps
>(function DefaultPageLayoutRoot(
  { children, className, ...otherProps }: DefaultPageLayoutRootProps,
  ref
) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex h-screen w-full items-start relative",
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      {/* Mobile Header */}
      <div className="mobile:flex hidden fixed top-0 left-0 right-0 z-40 bg-neutral-50 border-b border-neutral-border items-center justify-between px-4 py-3">
        <img
          className="h-6 object-cover"
          src="/logo.svg"
          alt="Logo"
        />
        <IconButton
          size="medium"
          icon="FeatherMenu"
          onClick={toggleMobileMenu}
        />
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="mobile:block hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Desktop Sidebar - Always visible */}
      <SidebarWithSections
        className="mobile:hidden"
        header={
          <img
            className="h-6 flex-none object-cover"
            src="/logo.svg"
            alt="Logo"
          />
        }
        footer={
          <>
            <div className="flex grow shrink-0 basis-0 items-start gap-2">
              <Avatar >
                J
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-caption-bold font-caption-bold text-default-font">
                  John
                </span>
                <span className="text-caption font-caption text-subtext-color">
                  Founder
                </span>
              </div>
            </div>
            <SubframeCore.DropdownMenu.Root>
              <SubframeCore.DropdownMenu.Trigger asChild={true}>
                <IconButton size="small" icon="FeatherMoreHorizontal" />
              </SubframeCore.DropdownMenu.Trigger>
              <SubframeCore.DropdownMenu.Portal>
                <SubframeCore.DropdownMenu.Content
                  side="bottom"
                  align="start"
                  sideOffset={4}
                  asChild={true}
                >
                  <DropdownMenu>
                    <DropdownMenu.DropdownItem icon="FeatherUser">
                      Profile
                    </DropdownMenu.DropdownItem>
                    <DropdownMenu.DropdownItem icon="FeatherSettings">
                      Settings
                    </DropdownMenu.DropdownItem>
                    <DropdownMenu.DropdownItem icon="FeatherLogOut">
                      Log out
                    </DropdownMenu.DropdownItem>
                  </DropdownMenu>
                </SubframeCore.DropdownMenu.Content>
              </SubframeCore.DropdownMenu.Portal>
            </SubframeCore.DropdownMenu.Root>
          </>
        }
      >
        <SidebarWithSections.NavItem 
          icon="FeatherBox"
          href="/hub"
          selected={pathname === '/hub'}
        >
          Hub
        </SidebarWithSections.NavItem>
        <SidebarWithSections.NavItem 
          icon="FeatherHome"
          href="/companies"
          selected={pathname === '/companies'}
        >
          Companies
        </SidebarWithSections.NavItem>
        <SidebarWithSections.NavItem 
          icon="FeatherUsers"
          href="/people"
          selected={pathname === '/people'}
        >
          People
        </SidebarWithSections.NavItem>
        <SidebarWithSections.NavItem 
          icon="FeatherDoorOpen"
          href="/opportunities"
          selected={pathname === '/opportunities'}
        >
          Opportunities
        </SidebarWithSections.NavItem>
      </SidebarWithSections>

      {/* Mobile Sidebar - Overlay */}
      <div className={SubframeUtils.twClassNames(
        "mobile:block hidden transition-transform duration-300 ease-in-out",
        "fixed top-0 left-0 h-full z-50",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <SidebarWithSections
          className="h-full"
          header={
            <div className="flex items-center justify-between w-full">
              <img
                className="h-6 flex-none object-cover"
                src="/logo.svg"
                alt="Logo"
              />
              {/* Close button for mobile */}
              <IconButton
                size="small"
                icon="FeatherX"
                onClick={closeMobileMenu}
              />
            </div>
          }
          footer={
            <>
              <div className="flex grow shrink-0 basis-0 items-start gap-2">
                <Avatar >
                  J
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="text-caption-bold font-caption-bold text-default-font">
                    John
                  </span>
                  <span className="text-caption font-caption text-subtext-color">
                    Founder
                  </span>
                </div>
              </div>
              <SubframeCore.DropdownMenu.Root>
                <SubframeCore.DropdownMenu.Trigger asChild={true}>
                  <IconButton size="small" icon="FeatherMoreHorizontal" />
                </SubframeCore.DropdownMenu.Trigger>
                <SubframeCore.DropdownMenu.Portal>
                  <SubframeCore.DropdownMenu.Content
                    side="bottom"
                    align="start"
                    sideOffset={4}
                    asChild={true}
                  >
                    <DropdownMenu>
                      <DropdownMenu.DropdownItem icon="FeatherUser">
                        Profile
                      </DropdownMenu.DropdownItem>
                      <DropdownMenu.DropdownItem icon="FeatherSettings">
                        Settings
                      </DropdownMenu.DropdownItem>
                      <DropdownMenu.DropdownItem icon="FeatherLogOut">
                        Log out
                      </DropdownMenu.DropdownItem>
                    </DropdownMenu>
                  </SubframeCore.DropdownMenu.Content>
                </SubframeCore.DropdownMenu.Portal>
              </SubframeCore.DropdownMenu.Root>
            </>
          }
        >
          <SidebarWithSections.NavItem 
            icon="FeatherBox"
            href="/hub"
            selected={pathname === '/hub'}
            onClick={closeMobileMenu}
          >
            Hub
          </SidebarWithSections.NavItem>
          <SidebarWithSections.NavItem 
            icon="FeatherHome"
            href="/companies"
            selected={pathname === '/companies'}
            onClick={closeMobileMenu}
          >
            Companies
          </SidebarWithSections.NavItem>
          <SidebarWithSections.NavItem 
            icon="FeatherUsers"
            href="/people"
            selected={pathname === '/people'}
            onClick={closeMobileMenu}
          >
            People
          </SidebarWithSections.NavItem>
          <SidebarWithSections.NavItem 
            icon="FeatherDoorOpen"
            href="/opportunities"
            selected={pathname === '/opportunities'}
            onClick={closeMobileMenu}
          >
            Opportunities
          </SidebarWithSections.NavItem>
        </SidebarWithSections>
      </div>

      {children ? (
        <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 self-stretch overflow-y-auto bg-default-background mobile:pt-16">
          {children}
        </div>
      ) : null}
    </div>
  );
});

export const DefaultPageLayout = DefaultPageLayoutRoot;

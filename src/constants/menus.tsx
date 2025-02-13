
import { CreditCardIcon, ExploreIcon, HomeIcon } from '@/components/icon-nav';
import React, { JSX } from 'react';

export type MenuProps = {
    id : number
    label: string 
    icon : JSX.Element
    path : string 
    section? : boolean
    integration? : boolean
}

export const LANDING_PAGE_MENU: MenuProps[] = [
  {
    id: 0,
    label: "Home",
    icon: <HomeIcon />,
    path: "/",
    section: true,
  },
  {
    id: 1,
    label: "Pricing",
    icon: <CreditCardIcon />,
    path: "/pricing",
    section: true,
  },
  {
    id: 2,
    label: "Explore",
    icon: <ExploreIcon />,
    path: "/explore",
  },
];

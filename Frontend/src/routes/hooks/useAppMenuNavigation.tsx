import React from "react";
import {MENU_ITEMS_MAP} from "../constants";
import doesHaveSelectedChild from "../utils/hasSelectedChild";
import useAccountContext from "src/hooks/useAccountContext";
import {UserRole} from "src/constants/auth";
import {UserRoleKey} from "src/types/index";
import {IAppMenuItem} from "src/routes/types";

// interface UseAppMenuNavigationResult {}

const useAppMenuNavigation = () => {

    const {user} = useAccountContext();

    let menuItems: IAppMenuItem[] = [];

    if (user) {
        const userRole = UserRole[user.roleId] as UserRoleKey;
        menuItems = MENU_ITEMS_MAP[userRole] ?? [];
        menuItems = [...MENU_ITEMS_MAP["Shared"]!, ...(MENU_ITEMS_MAP[userRole] ?? [])];
    }
    else {
        menuItems = MENU_ITEMS_MAP["Public"] ?? [];
    }

    return {
      appMenuItems: menuItems,
      doesHaveSelectedChild,
  };
};

export default useAppMenuNavigation;

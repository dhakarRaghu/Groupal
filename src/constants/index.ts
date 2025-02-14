
import { LANDING_PAGE_MENU, MenuProps } from "./menus";
import { CREATE_GROUP_PLACEHOLDER, CreateGroupPlaceholderProps } from "./placeholder";

type GroupleConstantsProps = {
    landingPageMenu : MenuProps[],
    createGroupPlaceholder: CreateGroupPlaceholderProps[]
}

export const GROUPLE_CONSTANTS: GroupleConstantsProps = {
  landingPageMenu: LANDING_PAGE_MENU,
//   signUpForm: "SIGN_UP_FORM",
//   signInForm: "SIGN_IN_FORM",
//   groupList: "GROUP_LIST",
  createGroupPlaceholder: CREATE_GROUP_PLACEHOLDER
};
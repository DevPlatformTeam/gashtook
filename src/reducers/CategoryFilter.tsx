import { Categories } from "@/app/[locale]/(main)/[city]/types/categories";

export type Action =
  | {
      type: "change_category";
      key: keyof Categories;
      payload: Categories[keyof Categories];
    }
  | {
      type: "all_category";
    }

export const initialState: Categories[keyof Categories] = "all";

export function filtersReducer(state: Categories[keyof Categories], action: Action): Categories[keyof Categories] {
  switch (action.type) {
    case "change_category":
      return action.payload as Categories[keyof Categories];
    case "all_category":
      return "all";
    default:
      return state;
  }
}

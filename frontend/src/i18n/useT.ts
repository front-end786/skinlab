import { useAppSelector } from "@/store";
import { dict, type Dict } from "./translations";

export function useT(): Dict {
  const locale = useAppSelector((s) => s.ui.locale);
  return dict[locale] as Dict;
}

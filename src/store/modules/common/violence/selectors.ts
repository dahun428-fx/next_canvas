import { AppState } from "@/store";

export function selectViolence(state: AppState) {
  return state.violence;
}

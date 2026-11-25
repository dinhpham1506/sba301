import { getData } from "./api";

export function getDepartments() {
  return getData("/departments");
}

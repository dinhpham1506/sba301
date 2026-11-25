import { getData } from "./api";

export function getCate() {
  return getData("/categories");
}

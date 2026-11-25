import { deleteData, getData } from "./api";

// BE nhận: name, categoryId, page (từ 0), size, sortBy.
export function getRestaurants(params = {}) {
  return getData("/restaurants", {
    ...params,
    name: params.name || undefined,
    categoryId: params.categoryId || undefined,
    sortBy: params.sortBy || "restaurantName", // BE mặc định sắp tăng dần.
  });
}

export function deleteRestaurant(id) {
  return deleteData(`/restaurants/${id}`);
}

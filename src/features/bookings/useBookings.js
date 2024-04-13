import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/GlocalConst";

export function useBookings() {
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();

  //* Filter
  const filterValue = searchParams.get("status");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" };

  //* Sort
  const sort = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sort.split("-");

  const sortBy = { field, direction };

  //* Page
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { isLoading, data: { data: bookings, count } = {} } = useQuery({
    queryKey: ["bookings", filter, sortBy, page], // @ U can add object theat causes the re fetching of data
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // * For Prefetching the data to increase user experience

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1], // @ U can add object theat causes the re fetching of data
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1], // @ U can add object theat causes the re fetching of data
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  return { isLoading, bookings, count };
}

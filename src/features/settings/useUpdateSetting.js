import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateSetting } from "./../../services/apiSettings";

export function useUpdateSetting() {
  const queryClient = useQueryClient();
  console.log(useMutation());
  const { mutate: modifySetting, isSuccess: isUpdating } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Setting has been updated  successfully");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: () => toast.error("Settings are not updated"),
  });

  return { modifySetting, isUpdating };
}

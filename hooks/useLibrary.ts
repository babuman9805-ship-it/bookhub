import { useLibraryContext } from "@/store/LibraryContext";

export const useLibrary = () => {
  return useLibraryContext();
};

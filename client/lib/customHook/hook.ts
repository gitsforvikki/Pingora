import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/lib/redux/store";

// Use this instead of the default `useDispatch`
export const useAppDispatch = () => useDispatch<AppDispatch>();


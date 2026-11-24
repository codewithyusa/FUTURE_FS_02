import { isAxiosError } from "axios";

export const getError = (err: unknown, fallback = "Something went wrong") =>
  isAxiosError(err) ? (err.response?.data?.message ?? fallback) : fallback;

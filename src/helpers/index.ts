const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL as string;

export const toAbsoluteUrl = (pathname: string) =>
  PUBLIC_URL ? PUBLIC_URL + pathname : pathname;

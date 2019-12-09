import { useRef } from "react";

export const useRenders = () => {
  const renders = useRef(1);
  console.log("renders: ", renders.current++);
  return renders.current;
};

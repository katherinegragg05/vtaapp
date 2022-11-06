import React, { useEffect } from "react";

export const useCloseESCPressed = (open, setOpen) => {
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!open || keyCode !== 27) return;
      setOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });
};

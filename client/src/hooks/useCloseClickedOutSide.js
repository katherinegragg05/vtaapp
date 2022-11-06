import React, { useEffect } from "react";

export const useCloseClickedOutSide = (component, trigger, open, setOpen) => {
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!component.current || !trigger.current) return;
      if (!open || component.current.contains(target) || trigger.current.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });
};

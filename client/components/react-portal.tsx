import React, { useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  children: React.ReactNode;
  wrapperId: string;
}

type Element = HTMLElement | null;

export default function ReactPortal({ children, wrapperId = "portal-root" }: PortalProps) {
  const [wrapperElement, setWrapperElement] = useState<Element | null>(null);

  useLayoutEffect(() => {
    let element: Element = document.getElementById(wrapperId);
    let systemCreated = false;
    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element);

    return () => {
      if (systemCreated && element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }
  }, [wrapperId]);
  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
}

function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

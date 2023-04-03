import { useRef, useEffect, useState, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  isVisible?: boolean
}

/**
 *
 * @param isVisible default - true
 * @param children - content
 * @example
 * <Portal isVisible>
 *   <div>content</div>
 * </Portal>
 */

export const Portal = ({ isVisible = true, children }: PropsWithChildren<Props>) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#portal");

    setMounted(isVisible);
  }, [isVisible]);

  return (mounted && ref.current)
    ? createPortal(<div className={'overlay'}>{children}</div>, ref.current)
    : null;
};

import { useRef, useEffect, useState, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  isVisible?: boolean
  onClick?(): void
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

export const Portal = ({ isVisible = true, children, onClick }: PropsWithChildren<Props>) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#portal");

    setMounted(isVisible);
  }, [isVisible]);

  return (mounted && ref.current)
    ? createPortal(<div onClick={onClick} className={'overlay'}>
      <div onClick={(e)=>{e.stopPropagation();}}>
        {children}
      </div>
    </div>, ref.current)
    : null;
};

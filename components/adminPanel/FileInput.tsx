import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import StorageService from '../../utils/StorageService';

type AnyButton = {
  onClick: () => void
} & any

type Props = {
  name: string;
  ButtonComponent?: React.NamedExoticComponent<AnyButton>;
  onChange(path: string): void;
  buttonsProps?: any;
}

export const FileInput = React.memo<Props>(({ name, ButtonComponent, buttonsProps }) => {
  const [isLoading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const onFileChangeCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
  };

  const onChange = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files?.item(0));
    const file = event.target.files?.item(0);
    if (file) {
      const path = await StorageService.instance.uploadFile(file.name, file);
      console.log(path);
    }
  }, []);

  return (
    <div>
      <input type="file" hidden ref={inputRef} onChange={onChange} />
      {ButtonComponent ? (
        <ButtonComponent onClick={onClick} {...buttonsProps} />
      ) : (
        <button onClick={onClick}>{name}</button>
      )}
    </div>
  );
});

FileInput.displayName = 'FileInput';

import React from 'react';

interface Props {
  value?: string;
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
  onBlur?(): void;
  placeholder?: string;
  hidden?: boolean;
}

function InputComponent(props: Props) {
  const { value, onChange, placeholder, hidden, onBlur } = props;
  return (
    <input
      className={
        ' w-full rounded border py-2 px-4 font-semibold text-white shadow transition duration-300' +
        ' border-secondary bg-[#252547]' +
        ' hover:border-secondary hover:bg-[#1b1b38]' +
        ' focus:border-[#a16eff] focus:outline-none' +
        ' hover:focus:border-secondary hover:focus:bg-[#1b1b38]'
      }
      type={hidden ? 'password' : 'text'}
      autoComplete={'off'}
      onBlur={onBlur}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

export default React.memo(InputComponent);

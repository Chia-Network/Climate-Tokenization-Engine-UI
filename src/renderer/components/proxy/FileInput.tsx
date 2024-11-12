import { FileInput as FlowbiteFileInput, FileInputProps } from 'flowbite-react';

function FileInput({ children, ...props }: FileInputProps) {
  return <FlowbiteFileInput {...props}>{children}</FlowbiteFileInput>;
}

export { FileInput };

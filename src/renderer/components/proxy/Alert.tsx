import { Alert as FlowbiteAlert, AlertProps } from 'flowbite-react';

function Alert({ children, ...props }: AlertProps) {
  return <FlowbiteAlert {...props}>{children}</FlowbiteAlert>;
}

export { Alert };

import { TabItemProps, Tabs as FlowbiteTabs, TabsProps } from 'flowbite-react';

function Tabs({ children, ...props }: TabsProps) {
  return <FlowbiteTabs {...props}>{children}</FlowbiteTabs>;
}

function Item({ children, ...props }: TabItemProps) {
  return <FlowbiteTabs.Item {...props}>{children}</FlowbiteTabs.Item>;
}

Tabs.Item = Item;

export { Tabs };

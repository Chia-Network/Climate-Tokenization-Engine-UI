import {
  Sidebar as FlowbiteSidebar,
  SidebarProps,
  SidebarItemProps,
  SidebarItemsProps,
  SidebarItemGroupProps,
} from 'flowbite-react';

const SidebarTheme = {
  root: {
    base: 'h-full',
    inner: 'h-full overflow-y-auto overflow-x-hidden bg-leftNavBg px-3 py-4 dark:bg-gray-800',
  },
  item: {
    base: 'flex items-center justify-center rounded-lg p-2 text-leftNavText font-normal text-leftNavText hover:text-black hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700',
    active: 'bg-leftNavItemActive dark:bg-gray-700 text-black',
  },
};

function Sidebar({ children, ...props }: SidebarProps) {
  return (
    <FlowbiteSidebar theme={SidebarTheme} {...props}>
      {children}
    </FlowbiteSidebar>
  );
}

function Items({ children, ...props }: SidebarItemsProps) {
  return <FlowbiteSidebar.Items {...props}>{children}</FlowbiteSidebar.Items>;
}

function ItemGroup({ children, ...props }: SidebarItemGroupProps) {
  return <FlowbiteSidebar.ItemGroup {...props}>{children}</FlowbiteSidebar.ItemGroup>;
}

function Item({ children, ...props }: SidebarItemProps) {
  return (
    <FlowbiteSidebar.Item className={'active:bg-green-500 dark:active:bg-green-500'} {...props}>
      {children}
    </FlowbiteSidebar.Item>
  );
}

Sidebar.Item = Item;
Sidebar.Items = Items;
Sidebar.ItemGroup = ItemGroup;

export { Sidebar };
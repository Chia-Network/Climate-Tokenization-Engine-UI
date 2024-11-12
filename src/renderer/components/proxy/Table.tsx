import { Table as FlowbiteTable, TableBodyProps, TableCellProps, TableProps, TableRowProps } from 'flowbite-react';

const tableTheme = {
  root: {
    base: 'w-full text-left text-sm text-black dark:text-gray-400',
  },
  row: {
    base: 'group/row',
    hovered: 'hover:bg-emerald-50 dark:hover:bg-gray-600',
  },
};

// table has a lot more options other than what is exported here
// https://flowbite-react.com/docs/components/table

function Table({ children, ...props }: TableProps) {
  return (
    <FlowbiteTable theme={tableTheme} {...props}>
      {children}
    </FlowbiteTable>
  );
}

function Body({ children, ...props }: TableBodyProps) {
  return <FlowbiteTable.Body {...props}>{children}</FlowbiteTable.Body>;
}

function Row({ children, ...props }: TableRowProps) {
  return <FlowbiteTable.Row {...props}>{children}</FlowbiteTable.Row>;
}

function Cell({ children, ...props }: TableCellProps) {
  return <FlowbiteTable.Cell {...props}>{children}</FlowbiteTable.Cell>;
}

Table.Row = Row;
Table.Cell = Cell;
Table.Body = Body;

export { Table };

import {
  getCoreRowModel,
  ColumnDef,
  flexRender,
  useReactTable,
} from '@tanstack/react-table';
import css from './IncomeExpenses.module.css';

import { useGetIncomeExpensesQuery } from '../../../redux/dashboard/incomeExpensesApi';

interface Person {
  type: string;
  name: string;
  amount: string;
}

const columns: ColumnDef<Person>[] = [
  {
    header: 'Income/Expenses',
    footer: props => props.column.id,
    columns: [
      {
        accessorKey: 'type',
        header: 'Today',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'name',
        header: '',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'amount',
        header: '',
        footer: props => props.column.id,
      },
    ],
  },
];

const IncomeExpenses = () => {
  const { data } = useGetIncomeExpensesQuery();

  const table = useReactTable({
    data: data?.data || [],
    columns,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    debugTable: false,
    debugHeaders: false,
    debugColumns: false,
  });

  const getClassByType = (type: string) => {
    if (type === 'Expense') return css.expense;
    if (type === 'Income') return css.income;
    return css.error;
  };

  const getClassByAmount = (type: string) => {
    if (type === 'Expense') return css.col3Red;
    if (type === 'Income') return css.col3Green;
    return css.col3Error;
  };

  return (
    <table className={css.table}>
      <thead>
        {table.getHeaderGroups().map((headerGroup, index) => (
          <tr
            key={headerGroup.id}
            className={index === 0 ? css.header : css.subheader}
          >
            {headerGroup.headers.map(header => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className={index === 0 ? css.header : css.subheader}
                style={{ width: header.getSize() }}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => {
          return (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => {
                return (
                  <td
                    key={cell.id}
                    className={css.row}
                    style={{ width: cell.column.getSize() }}
                  >
                    {cell.column.id === 'type' ? (
                      <span className={getClassByType(row.original.type)}>
                        {row.original.type}
                      </span>
                    ) : cell.column.id === 'amount' ? (
                      <span className={getClassByAmount(row.original.type)}>
                        {row.original.amount}
                      </span>
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default IncomeExpenses;

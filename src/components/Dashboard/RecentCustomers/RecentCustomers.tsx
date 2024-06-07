import {
  getCoreRowModel,
  ColumnDef,
  flexRender,
  useReactTable,
} from '@tanstack/react-table';
import css from './RecentCustomers.module.css';

import { useGetCustomersQuery } from '../../../redux/customersApi';

interface Person {
  name: string;
  email: string;
  spent: string;
  photo: string;
}

const columns: ColumnDef<Person>[] = [
  {
    header: 'Recent Customers',
    footer: props => props.column.id,
    columns: [
      {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => (
          <div className={css.cellWrap}>
            <img
              src={row.original.photo}
              alt={row.original.name}
              className={css.avatar}
            />
            {row.original.name}
          </div>
        ),
        footer: props => props.column.id,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'spent',
        header: 'Spent',
        footer: props => props.column.id,
      },
    ],
  },
];

const RecentCustomersTable = () => {
  const { data } = useGetCustomersQuery();

  const table = useReactTable({
    data: data?.data.slice(0, 5) || [],
    columns,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    debugTable: false,
    debugHeaders: false,
    debugColumns: false,
  });

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
                    className={`${css.row} ${
                      cell.column.id === 'name'
                        ? css['col-name']
                        : cell.column.id === 'email'
                        ? css['col-email']
                        : ''
                    }`}
                    style={{ width: cell.column.getSize() }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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

export default RecentCustomersTable;

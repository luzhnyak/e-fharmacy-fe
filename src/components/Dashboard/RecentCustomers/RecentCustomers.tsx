import {
  getCoreRowModel,
  ColumnDef,
  flexRender,
  useReactTable,
} from "@tanstack/react-table";
import css from "./RecentCustomers.module.css";
import { customers } from "../../../data/customers";
import { useMemo } from "react";

interface Person {
  name: string;
  email: string;
  spent: string;
  avatar: string | undefined;
}

const columns: ColumnDef<Person>[] = [
  {
    header: "Recent Customers",
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className={css.cellWrap}>
            <img
              src={row.original.avatar}
              alt={row.original.name}
              className={css.avatar}
            />
            {row.original.name}
          </div>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "email",
        header: "Email",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "spent",
        header: "Spent",
        footer: (props) => props.column.id,
      },
    ],
  },
];

const RecentCustomersTable = () => {
  const myCustomers = customers.map((customer) => {
    return {
      avatar: customer.image || customer.photo,
      name: customer.name,
      email: customer.email,
      spent: customer.spent,
    };
  });

  const data = useMemo(() => myCustomers, [myCustomers]);

  const table = useReactTable({
    data,
    columns,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  return (
    <table className={css.table}>
      <thead>
        {table.getHeaderGroups().map((headerGroup, index) => (
          <tr
            key={headerGroup.id}
            className={index === 0 ? css.header : css.subheader}
          >
            {headerGroup.headers.map((header) => (
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
        {table.getRowModel().rows.map((row) => {
          return (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <td
                    key={cell.id}
                    className={`${css.row} ${
                      cell.column.id === "name"
                        ? css["col-name"]
                        : cell.column.id === "email"
                        ? css["col-email"]
                        : ""
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

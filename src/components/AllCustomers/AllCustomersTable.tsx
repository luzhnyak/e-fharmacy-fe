import {
  getCoreRowModel,
  ColumnDef,
  flexRender,
  useReactTable,
} from "@tanstack/react-table";
import css from "./AllCustomersTable.module.css";
import { useEffect, useMemo, useState } from "react";
import { customers } from "../../data/customers";

export interface Person {
  avatar: string | undefined;
  name: string;
  email: string;
  address: string;
  phone: string;
  date: string;
}

const AllCustomersTable = ({ searchQuery }: { searchQuery: string }) => {
  const columns: ColumnDef<Person>[] = [
    {
      header: "Customers Data",
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
          accessorKey: "address",
          header: "Address",
          footer: (props) => props.column.id,
        },
        {
          accessorKey: "phone",
          header: "Phone",
          footer: (props) => props.column.id,
        },
        {
          accessorKey: "date",
          header: "Register date",
          footer: (props) => props.column.id,
        },
      ],
    },
  ];

  const myCustomers = customers.map((customer) => {
    return {
      avatar: customer.image || customer.photo,
      name: customer.name,
      email: customer.email,
      address: customer.address,
      phone: customer.phone,
      date: customer.register_date,
    };
  });

  const data = useMemo(() => myCustomers, [myCustomers]);

  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    setFilteredData(
      data.filter((item) => item.name.toLowerCase().includes(lowercasedQuery))
    );
  }, [searchQuery, data]);

  const table = useReactTable({
    data: filteredData,
    columns,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  return (
    <>
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
                          : cell.column.id === "address"
                          ? css["col-address"]
                          : cell.column.id === "phone"
                          ? css["col-phone"]
                          : cell.column.id === "date"
                          ? css["col-date"]
                          : ""
                      }`}
                      style={{ width: cell.column.getSize() }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {filteredData.length === 0 && (
        <div className={css.noResults}>
          No results found for your search query.
        </div>
      )}
    </>
  );
};

export default AllCustomersTable;

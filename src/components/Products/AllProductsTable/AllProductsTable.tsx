import {
  getCoreRowModel,
  ColumnDef,
  flexRender,
  useReactTable,
} from '@tanstack/react-table';
import css from './AllProductsTable.module.css';
import { useState } from 'react';
import Icon from '../../Icon';
import Modal from '../../Modal/Modal';
import EditModal from '../../EditModalProduct/EditModal';
import DeleteModal from '../../DeleteModal/DeleteModal';

import { useGetProductsQuery } from '../../../redux/products/productsApi';

export interface Products {
  name: string;
  category: string;
  stock: string;
  suppliers: string;
  price: string;
}

const AllProductsTable = ({ searchQuery }: { searchQuery: string }) => {
  const { data } = useGetProductsQuery();

  console.log(searchQuery);

  const columns: ColumnDef<Products>[] = [
    {
      header: 'All products',
      footer: props => props.column.id,
      columns: [
        {
          accessorKey: 'name',
          header: 'Product Info',
          footer: props => props.column.id,
        },
        {
          accessorKey: 'category',
          header: 'Category',
          footer: props => props.column.id,
        },
        {
          accessorKey: 'stock',
          header: 'Stock',
          footer: props => props.column.id,
        },
        {
          accessorKey: 'suppliers',
          header: 'Suppliers',
          footer: props => props.column.id,
        },
        {
          accessorKey: 'price',
          header: 'Price',
          footer: props => props.column.id,
        },
        {
          accessorKey: 'action',
          header: 'Action',
          cell: ({ row }) => (
            <div className={css.buttonsWrap}>
              <div
                className={css.buttonEdit}
                onClick={() => openEditModal(row.original)}
              >
                <Icon name="edit" width={13} height={13} />
              </div>
              <div
                className={css.buttonDelete}
                onClick={() => openDeleteModal(row.original)}
              >
                <Icon name="delete" width={13} height={13} />
              </div>
            </div>
          ),
          footer: props => props.column.id,
        },
      ],
    },
  ];

  // const [filteredData, setFilteredData] = useState(data);
  const [editModalData, setEditModalData] = useState<Products | null>(null);
  const [deleteModalData, setDeleteModalData] = useState<Products | null>(null);

  const openEditModal = (rowData: Products) => {
    setEditModalData(rowData);
  };

  const openDeleteModal = (rowData: Products) => {
    setDeleteModalData(rowData);
  };

  const closeEditModal = () => {
    setEditModalData(null);
  };

  const closeDeleteModal = () => {
    setDeleteModalData(null);
  };

  // useEffect(() => {
  //   const lowercasedQuery = searchQuery.toLowerCase();
  //   setFilteredData(
  //     data.filter(item => item.name.toLowerCase().includes(lowercasedQuery))
  //   );
  // }, [searchQuery, data]);

  const table = useReactTable({
    data: data?.data || [],
    columns,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
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
                          ? css['col-info']
                          : cell.column.id === 'category'
                          ? css['col-category']
                          : cell.column.id === 'stock'
                          ? css['col-stock']
                          : ''
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
      {/* {filteredData.length === 0 && (
        <div className={css.noResults}>
          No results found for your search query.
        </div>
      )} */}

      {editModalData && (
        <Modal onClose={closeEditModal} title="Edit product">
          <EditModal onClose={closeEditModal} data={editModalData} />
        </Modal>
      )}
      {deleteModalData && (
        <Modal onClose={closeDeleteModal} title="Delete Product">
          <DeleteModal onClose={closeDeleteModal} data={deleteModalData} />
        </Modal>
      )}
    </>
  );
};

export default AllProductsTable;

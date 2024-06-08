import { FC, useEffect, useRef, useState } from 'react';
import css from './EditModal.module.css';
import Icon from '../../Icon';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Dropdown from '../../Dropdown/Dropdown';
import { productsApi } from '../../../redux/productsApi';

interface AddModalProps {
  onClose: () => void;
}

interface IForms {
  name: string;
  category: string;
  suppliers: string;
  stock: number;
  price: number;
}

const AddNewProductModal: FC<AddModalProps> = ({ onClose }) => {
  const [isOpenDropdown, setOpenDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [createProduct] = productsApi.useCreateProductMutation();

  const iconref = useRef<HTMLDivElement | null>(null);

  const schema = yup
    .object({
      name: yup.string().required('Product info is required'),
      category: yup.string().required('Category is required'),
      suppliers: yup.string().required('Suppliers is required'),
      stock: yup.number().required('Stock is required'),
      price: yup
        .number()
        .typeError('Price is required and must be a number')
        .required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<IForms>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IForms) => {
    await createProduct(data);
    reset();
    onClose();
  };

  const handleSelect = (selected: string) => {
    setSelectedFilter(selected);
    setOpenDropdown(false);
  };

  useEffect(() => {
    setValue('category', selectedFilter);
  }, [selectedFilter, setValue]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.wrap}>
          <div>
            <input
              {...register('name')}
              className={css.input}
              placeholder="Product info"
            />
            <p className={css.errormessage}>{errors.name?.message}</p>
          </div>

          <div className={css.inputWrap}>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className={css.input}
                  placeholder="Category"
                  value={selectedFilter}
                />
              )}
            />
            <p className={css.errormessage}>{errors.category?.message}</p>

            <div
              className={css.iconChevron}
              onClick={() => setOpenDropdown(!isOpenDropdown)}
              ref={iconref}
            >
              <Icon name="chevron-down" width={16} height={16} />
            </div>
            {isOpenDropdown && (
              <Dropdown
                onSelect={handleSelect}
                onClose={setOpenDropdown}
                ref={iconref}
              />
            )}
          </div>

          <div>
            <input
              {...register('suppliers')}
              className={css.input}
              placeholder="Suppliers"
            />
            <p className={css.errormessage}>{errors.suppliers?.message}</p>
          </div>

          <div>
            <input
              {...register('stock')}
              className={css.input}
              placeholder="Stock"
              type="number"
            />
            <p className={css.errormessage}>{errors.stock?.message}</p>
          </div>

          <div>
            <input
              {...register('price')}
              className={css.input}
              placeholder="Price"
              type="number"
            />
            <p className={css.errormessage}>{errors.price?.message}</p>
          </div>
        </div>

        <div className={css.buttonWrap}>
          <button type="submit" className={css.buttonAdd}>
            Add
          </button>

          <button type="button" className={css.buttonCancel} onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default AddNewProductModal;

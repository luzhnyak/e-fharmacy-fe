import { RootState, TypeDispatch } from '../redux/store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useTypeDispatch: () => TypeDispatch = useDispatch;

export const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector;

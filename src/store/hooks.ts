import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '@/store/index';

/**
 * Typed useDispatch hook supporting AppDispatch and thunk actions.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Typed useSelector hook pre-bound to RootState.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

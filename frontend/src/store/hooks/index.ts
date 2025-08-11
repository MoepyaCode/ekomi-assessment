import { useDispatch, useSelector } from 'react-redux'
import type {AppDispatch, AppSelector} from '../'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<AppSelector>()

export { usePagination } from '../../hooks/usePagination'
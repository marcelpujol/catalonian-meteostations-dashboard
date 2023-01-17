import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { update } from '../redux/toolbarSlice';

export const useToolbar = () => {
    const dispatch = useDispatch();

    const actions = useMemo(() => ({
        updateToolbar(title: string, backArrow: boolean)  {
            const action = update({title, backArrow});
            dispatch(action);
        }
    }), [dispatch]);

    return actions;
}
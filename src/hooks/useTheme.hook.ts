import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { update } from '../redux/themeSlice';

export const useTheme = () => {
    const dispatch = useDispatch();

    const actions = useMemo(() => ({
        updateTheme(darkMode: boolean) {
            const action = update({mode: darkMode});
            dispatch(action);
        }
    }), [dispatch])

    return actions;
}
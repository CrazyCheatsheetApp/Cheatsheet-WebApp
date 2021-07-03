import { useContext, useEffect, useState } from 'react';
import { useItemsApi } from '.';
import { AuthContext } from '../context';

const useItems = () => {
    const [refreshCount, setRefreshCount] = useState(0);
    const { user } = useContext(AuthContext);
    const { readItems } = useItemsApi();
    const [state, setState] = useState({
        data: null,
        loading: true,
        error: null
    });

    const refresh = () => {
        setRefreshCount((value) => value + 1);
    };

    useEffect(() => {
        if (!user) {
            setState({
                data: null,
                loading: false,
                error: new Error('Authentication required')
            });
            return;
        }

        const asyncOperation = async () => {
            try {
                let items = await readItems();
                setState({
                    data: items,
                    loading: false,
                    error: null
                });
            } catch (e) {
                setState({
                    data: null,
                    loading: false,
                    error: e
                });
            }
        };

        asyncOperation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, refreshCount]);

    return { ...state, refresh };
};

export default useItems;

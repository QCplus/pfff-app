import { useState, useEffect } from "react";
import ApiRequestBase from "../api/requests/ApiRequestBase";

function useFetch<T = any | null, E = any, P = any>(request: ApiRequestBase<T, E, P>, params?: P): [T | null, boolean] {
    const [state, setState] = useState<T>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        const fetchData = async () => {
            const response = await request.send(params);

            setState(response.data);
            setIsLoading(false);
        }

        fetchData();
    }, [request, params]);

    return [state ?? null, isLoading];
}

export default useFetch;
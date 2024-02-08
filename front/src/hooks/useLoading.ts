import { useEffect, useState } from "react";

const useLoading = (func: () => Promise<void>) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        func().then(() => setIsLoading(false));
    }, [func]);

    return isLoading;
};

export default useLoading;

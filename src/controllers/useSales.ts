import {useLocale} from "im-hooks";
import useUrl from "../services/useUrl";
import usePath from "../services/usePath";

const useSales = () => {
    const {t} = useLocale()
    const {getUrl} = useUrl()
    const {getPath} = usePath()
    return {t, getUrl, getPath, loading: false}
}

export default useSales
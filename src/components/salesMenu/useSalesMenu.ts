import {useLocale} from "im-hooks";
import useUrl from "../../services/useUrl";
import usePath from "../../services/usePath";

const useSalesMenu = () => {
    const {t} = useLocale()
    const {getUrl} = useUrl()
    const {getPath} = usePath()

    return {t, getUrl, getPath}
}

export default useSalesMenu
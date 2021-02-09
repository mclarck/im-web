import {useLocale} from "im-hooks";
import useLink from "../../services/useLink";
import useUrl from "../../services/useUrl";
import {useCallback, useEffect, useRef, useState} from "react";
import translations from "../../resources/translations";
import {useParams} from "react-router-dom";

const usePopMenu = () => {
    const {locale} = useParams<any>()
    const {t, lang} = useLocale(translations, locale)
    const {goTo} = useLink()
    const {getUrl} = useUrl()
    const [shown, showMenu] = useState<boolean>(false)
    const menu = useRef<any>()
    const show = () => showMenu((shown: boolean) => shown = true)
    const hide = () => showMenu((shown: boolean) => shown = false)
    const handleClick = useCallback((e: any) => {
        if (shown) {
            if (e.target.tagName === "A") {
                setTimeout(() => hide(), 500)
            } else {
                hide()
            }
        }
    }, [shown])

    useEffect(() => {
        window.addEventListener("click", handleClick)
        return () => {
            window.removeEventListener("click", handleClick)
        }
    }, [handleClick])

    return {t, hide, menu, show, shown, goTo, getUrl}
}
export default usePopMenu
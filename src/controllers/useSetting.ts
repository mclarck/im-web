import {useLazyQuery} from "@apollo/client";
import {useCallback, useEffect} from "react";
import {GET_SETTING} from "../model/setting/queries";

const useSetting = () => {
    const [fetch, {loading, data, error}] = useLazyQuery(GET_SETTING, {fetchPolicy: "network-only"});
    const bounds = data?.setting?.bounds
    const loadSetting = useCallback(() => fetch({variables: {id: "/api/settings/1"}}), [fetch])
    const onMutate = (setting: any) => {
        loadSetting();
    };

    useEffect(() => {
        loadSetting();
    }, [loadSetting]);

    if (error) console.log(error.message);
    if (data?.setting) console.log(data.setting);
    return {
        bounds,
        loading,
        location: data?.setting?.address?.location,
        address: data?.setting?.address,
        setting: data?.setting,
        onMutate
    }
}

export default useSetting
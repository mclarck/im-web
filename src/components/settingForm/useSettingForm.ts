import {useLocale, useSanitizer} from "im-hooks";
import {useForm} from "react-hook-form";
import _ from "lodash";
import {OpenStreetMapProvider} from "leaflet-geosearch";
import {useContext, useState} from "react";
import {RestClient} from "../../services/database";

const useSettingForm = (props: any) => {
    const {t} = useLocale();
    const {sanitize} = useSanitizer();
    const verb = props?.setting?.id ? "PUT" : "POST";
    const path = props?.setting?.id ? props?.setting?.id : "/api/settings";
    const {handleSubmit, register} = useForm();
    const rest = useContext(RestClient)
    const [loading, setLoading] = useState<boolean>(false)

    const submit = async (data: any) => {
        setLoading(true)
        try {
            await checkLocation(data);
            const res = await rest?.request(verb, path, prepare(data));
            props.onMutate(res);
        } catch (error) {
            console.log(error.message);
        }finally {
            setLoading(false)
        }
    };

    const prepare = (data: any) => {
        data = sanitize(data);
        data.openDays = data?.openDays?.split(";");
        data.emails = data?.emails?.split(";");
        data.phones = data?.phones?.split(";");
        const bounds = data?.bounds?.split(";");
        data.bounds = _.map(bounds, (b: string) => b.split(","));
        return data;
    };

    const checkLocation = async (data: any) => {
        const address = data?.address;
        if (address) {
            setLoading(true)
            try {
                const provider = new OpenStreetMapProvider();
                let query = `${address?.number} ${address?.street} ${address?.city}`;
                const res = await provider.search({query});
                if (res[0]) {
                    data.address.location = {
                        x: res[0]?.x,
                        y: res[0]?.y,
                        label: res[0]?.label,
                    };
                    console.log(data);
                }
            } catch (error) {
                console.log(error.message);
            }finally {
                setLoading(false)
            }
        }
    };

    return {handleSubmit, submit, register, t, loading}
}

export default useSettingForm
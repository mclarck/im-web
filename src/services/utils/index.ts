import {OpenStreetMapProvider} from "leaflet-geosearch";

const useUtils = () => {
    const isAddress = (address: any) => address?.street && address?.number
    const isUser = (user: any) => user?.username && user?.phone
    const shortAddress = (address: any) => address ? `${address?.apt}, ${address?.street} ${address?.number}` : null
    const checkAddress = async (address: any) => {
        try {
            const provider = new OpenStreetMapProvider();
            let query = `${address?.number} ${address?.street} ${address?.city}`;
            const res = await provider.search({query});
            return res[0]
        } catch (error) {
            console.log(error.message)
        }
    }
    return {isAddress, isUser, shortAddress, checkAddress}
}
export default useUtils
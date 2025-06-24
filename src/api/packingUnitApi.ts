import axios from "axios";
import { BASE_URL } from "./baseApi";

export const fetchPackingUniut = async () => {

    try {
        const res = await axios.get(`${BASE_URL}/packing-units`);
        // console.log(res)
        return res.data;
    } catch (err) {
        console.error('Error fetching units:', err);

    }

}

export const postPackingUnit = async (data: any) => {

    try {

        const res = axios.post(`${BASE_URL}/packing-units`, {
            name: data.name,
            userId: data.userId
        });

        // console.log(res)
        return res
    } catch (error) {
        console.log(error)
    }

}

export const updatePackingUnit = async (data: any) => {

    try {

        const res = await axios.put(`${BASE_URL}/packing-units/${data.id}`, {
            name: data.name,
            userId: data.userId
        });

        return res
        // console.log(res)

    } catch (error) {

    }

}

export const deletePackingUnit = async (id: number) => {
    try {
        const res = await axios.delete(`${BASE_URL}/packing-units/${id}`);
        return res
    } catch (error) {

    }
}
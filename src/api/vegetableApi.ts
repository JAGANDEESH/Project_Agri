import axios from "axios";
import { BASE_URL } from "./baseApi";



export const fetchVegetable = async (user_id:any) => {

    try {
        const res = await axios.get(`${BASE_URL}/VegetableMaster/${user_id}`);
        // console.log(res)
        return res.data;
    } catch (err) {
        console.error('Error fetching units:', err);

    }

}

export const postVegetable = async (data: any) => {

    try {

        const res = axios.post(`${BASE_URL}/vegetables`, {
           
            vegName: data.vegName,
            uom: data.uom,
            packingUnit: data.packingUnit,
            user_id: data.user_id

        });

        // console.log(res)
        return res
    } catch (error) {
        console.log(error)
    }

}

export const updateVegetable = async (data: any) => {

    try {

        const res = await axios.put(`${BASE_URL}/vegetables/${data.id}`, {
            name: data.vegName,
            uom: data.uom,
            packingUnit: data.packingUnit,
            user_id: data.user_id
        });

        return res
        // console.log(res)

    } catch (error) {

    }

}

export const deleteVegetable = async (id: number) => {
    try {
        const res = await axios.delete(`${BASE_URL}/vegetables/${id}`);
        return res
    } catch (error) {

    }
}
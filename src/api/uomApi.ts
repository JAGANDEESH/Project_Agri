import axios from "axios"
import { BASE_URL } from "./baseApi";


export const fetchUOM = async () => {
    try {

        const res = await axios.get(`${BASE_URL}/uoms`);
        return res.data

    } catch (error) {

    }
}

export const postUOM = async (data: any) => {

    try {
        const res = await axios.post(`${BASE_URL}/uoms`, {
            name: data.name,
            userId: data.userId,
        });
        return res
    } catch (error) {
console.log(error)
    }

}

export const putUOM = async (data: any) => {

    try {

        const res = await axios.put(`${BASE_URL}/uoms/${data.id}`, {
            name: data.name,
            userId: data.userId

        });

        return res

    } catch (error) {

    }

}

export const deleteUOM = async (id: number) => {
    try {

        const res = await axios.delete(`${BASE_URL}/uoms/${id}`);
        return res

    } catch (error) {

    }
}
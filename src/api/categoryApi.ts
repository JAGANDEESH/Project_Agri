import axios from "axios"
import { BASE_URL } from "./baseApi"


export const fetchCategory = async () => {
    try {

        const res = await axios.get(`${BASE_URL}/category`);
        return res.data

    } catch (error) {

    }
}

export const postCategory = async (data: any) => {

    try {
        const res = await axios.post(`${BASE_URL}/category`, {
            name: data.name,
            userId: data.userId,
        });
        return res
    } catch (error) {

    }

}

export const putCategory = async (data: any) => {

    try {

        const res = await axios.put(`${BASE_URL}/category/${data.id}`, {
            name: data.name,
            userId: data.userId

        });

        return res

    } catch (error) {

    }

}

export const deleteCategory = async (id: number) => {
    try {

        const res = await axios.delete(`${BASE_URL}/category/${id}`);
        return res

    } catch (error) {

    }
}
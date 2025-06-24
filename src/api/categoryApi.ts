import axios from "axios"


export const fetchCategory = async () => {
    try {

        const res = await axios.get('http://localhost:5000/api/category');
        return res.data

    } catch (error) {

    }
}

export const postCategory = async (data: any) => {

    try {
        const res = await axios.post('http://localhost:5000/api/category', {
            name: data.name,
            userId: data.userId,
        });
        return res
    } catch (error) {

    }

}

export const putCategory = async (data: any) => {

    try {

        const res = await axios.put(`http://localhost:5000/api/category/${data.id}`, {
            name: data.name,
            userId: data.userId

        });

        return res

    } catch (error) {

    }

}

export const deleteCategory = async (id: number) => {
    try {

        const res = await axios.delete(`http://localhost:5000/api/category/${id}`);
        return res

    } catch (error) {

    }
}
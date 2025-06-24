import axios from "axios"


export const fetchUOM = async () => {
    try {

        const res = await axios.get('http://localhost:5000/api/uoms');
        return res.data

    } catch (error) {

    }
}

export const postUOM = async (data: any) => {

    try {
        const res = await axios.post('http://localhost:5000/api/uoms', {
            name: data.name,
            userId: data.userId,
        });
        return res
    } catch (error) {

    }

}

export const putUOM = async (data: any) => {

    try {

        const res = await axios.put(`http://localhost:5000/api/uoms/${data.id}`, {
            name: data.name,
            userId: data.userId

        });

        return res

    } catch (error) {

    }

}

export const deleteUOM = async (id: number) => {
    try {

        const res = await axios.delete(`http://localhost:5000/api/uoms/${id}`);
        return res

    } catch (error) {

    }
}
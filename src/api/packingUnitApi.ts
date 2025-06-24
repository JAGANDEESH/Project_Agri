import axios from "axios";

export const fetchPackingUniut = async () => {

    try {
        const res = await axios.get('http://localhost:5000/api/packing-units');
        // console.log(res)
        return res.data;
    } catch (err) {
        console.error('Error fetching units:', err);

    }

}

export const postPackingUnit = async (data: any) => {

    try {

        const res = axios.post('http://localhost:5000/api/packing-units', {
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

        const res = await axios.put(`http://localhost:5000/api/packing-units/${data.id}`, {
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
      const res =  await axios.delete(`http://localhost:5000/api/packing-units/${id}`);
      return res
    } catch (error) {

    }
}
import APIManager from "./APIManager";

const fetchPickupRecord = async () => {
    const pickups = await APIManager.axios
        .get(`/v1/admin/pickup`)
        .then(
            response => {
                console.log("dksahnj", response)
                return response.data.data;
                
            },
        )
        .catch((err) => {
            return err.response.data
        })

    return pickups;
}

const editPickup = async (id, reqObj) => {
    const pickupDetails = await APIManager.axios
        .patch(`/v1/admin/pickup/${id}`, reqObj)
        .then(
            response => {
                return response.data;

            },
        )
        .catch((err) => {
            return err.response.data
        })
    return pickupDetails;
}

const deletePickup = async (id) => {
    const removePickup = APIManager.axios
        .delete(`/v1/admin/pickup/${id}`)
        .then(
            response => {
                console.log(response)
            }
        )
        .catch(
            error => {
                console.log(error)
            }
        )
    return removePickup;
}

const addPickup = async (pickup) => {
    const add = APIManager.axios
        .post(`/v1/admin/pickup`, pickup)
        .then(
            response => {
                console.log(response)
            }
        )
        .catch(
            error => {
                console.log(error)
            }
        )
    return add;
}

export default { fetchPickupRecord, addPickup, editPickup, deletePickup }
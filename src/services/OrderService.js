import APIManager from "./APIManager";

const fetchOrderRecord = async () => {
    const orders = await APIManager.axios
        .get(`/v1/admin/order`)
        .then(
            response => {
                console.log("dksahnj", response)
                return response.data.data;
                
            },
        )
        .catch((err) => {
            return err.response.data
        })

    return orders;
}

const editOrder = async (id, reqObj) => {
    const orderDetails = await APIManager.axios
        .patch(`/v1/admin/order/${id}`, reqObj)
        .then(
            response => {
                return response.data;

            },
        )
        .catch((err) => {
            return err.response.data
        })
    return orderDetails;
}

const deleteOrder = async (id) => {
    const removeOrder = APIManager.axios
        .delete(`/v1/admin/order/${id}`)
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
    return removeOrder;
}

const addOrder = async (order) => {
    const add = APIManager.axios
        .post(`/v1/admin/order`, order)
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

export default { fetchOrderRecord, addOrder, editOrder, deleteOrder }
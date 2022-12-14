import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/v1/orders'

const CreateOrder = (phone, items) => {
  const request = axios.post(baseUrl, {
    "order": {
        "phone_number": phone
    },
    "item_ids": items
})
  return request.then(response => response.data)
}

const UpdateOrder = (status, id) => {
  const request = axios.put(`${baseUrl}/${id}`, {
    "order": {
        "status": status
    }
})
  return request.then(response => response.data)
}

const exportedObject = {
  CreateOrder: CreateOrder,
  UpdateOrder: UpdateOrder
}

export default exportedObject
import api from '../../utils/index'
export const getOrders = body => api.post('/api/orders/get-orders', body)
export const updateOrders = body => api.post('/api/orders/update', body)

export const offerPage = body => api.post('/api/offers/offer/page', body)
export const offerRemove = body => api.post('/api/offers/offer/remove', body)
export const offer = body => api.post('/api/offers/offer', body)
export const offerAdd = body => api.post('/api/offers/offer/add', body)
export const offerUpdate = body => api.post('/api/offers/offer/update', body)

export const getUser = body => api.post('/api/users/get', body)
export const pageUser = body => api.post('/api/users/page', body)
export const userRemove = body => api.post('/api/users/user/remove', body)
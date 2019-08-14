import api from '../../utils/index'
export const getDetail = body => api.post('/api/introductions/get-detail', body)
export const update = body => api.post('/api/introductions/update', body)
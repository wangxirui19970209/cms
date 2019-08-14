import api from '../../utils/index'
export const submit = body => api.post('/api/admins/submit', body)
export const accountLogout = body => api.post('/api/admins/accountLogout', body)
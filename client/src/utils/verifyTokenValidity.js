import { apiService } from '@/services/'

export const verifyTokenValidity = async (jwt) => {
  apiService.setDefaultHeaders({ 'Authorization': `Bearer ${jwt || ''}` })
  const currentUser = await apiService.get('/users/me')

  return currentUser.status === 200 ? currentUser.data : false
}

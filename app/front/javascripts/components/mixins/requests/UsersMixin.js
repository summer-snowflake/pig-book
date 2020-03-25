import { axiosMixin } from './AxiosMixin'

export const userAxios = {
  patch: (userId, callback, errorCallback) => {
    let url = '/api/admin/users/' + userId + '/tally'
    axiosMixin.request('PATCH', callback, errorCallback, url)
  }
}

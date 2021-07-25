import axios from 'axios'
import store from 'epics/store'
import { baseUrl } from 'config/api'
import { getToken } from 'utils/auth'
import { getTestdata } from 'testdata/_mockApi'

const callApiSimulator = (method, needAuth, path, data, doneCallback, failCallback) => {
  let options = {}
  store.dispatch({ type: 'api.API_STARTED' })
  getTestdata(method, path, data)
    .then((res) => {
      if (doneCallback) doneCallback(res.data)
      store.dispatch({ type: 'api.API_DONE' })
    })
    .catch((err) => {
      let errorMessage = err.message
      if (failCallback) failCallback(errorMessage)
      store.dispatch({ type: 'api.API_FAILED', payload: { errorMessage } })
      setTimeout(() => {
        store.dispatch({ type: 'api.CLEAR_ERROR_MESSAGE' })
      }, 2500)
    })
}

export const callPostApiSimulator = (path, data, doneCallback, failCallback) => {
  callApiSimulator('POST', false, path, data, doneCallback, failCallback)
}

export const callGetApiSimulator = (path, doneCallback, failCallback) => {
  callApiSimulator('GET', false, path, undefined, doneCallback, failCallback)
}

export const callGetApiWithAuthSimulator = (path, doneCallback, failCallback) => {
  callApiSimulator('GET', true, path, undefined, doneCallback, failCallback)
}

export const callPostApiWithAuthSimulator = (path, data, doneCallback, failCallback) => {
  callApiSimulator('POST', true, path, data, doneCallback, failCallback)
}

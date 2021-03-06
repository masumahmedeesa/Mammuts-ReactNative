import Axios from 'axios'

const SetAuthToken = token => {
    if (token){
        Axios.defaults.headers.common['Authorization'] = token
    }else{
        Axios.defaults.headers.common['Authorization'] = ""
    }
}

export default SetAuthToken
import VueCookies from 'vue-cookies'
import { useStore } from 'vuex'

const store = useStore()

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:1337'

export default {
    async get (query) {
        if (VueCookies.get('token')) {
            try {
                const res = await fetch(apiUrl + query, {
                    method: 'get',
                    headers: {
                        Authorization: 'Bearer ' + VueCookies.get('token')
                    }
                })

                return await res.json()
            } catch (err) {
                store.commit('notice', {
                    type: 'error',
                    text: err.message
                })
            }
        } else {
            return false
        }
    },

    async post (url, data) {
        try {
            const res = await fetch(apiUrl + url, {
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                }
            })

            return await res.json()
        } catch (err) {
            store.commit('notice', {
                type: 'error',
                text: err.message
            })
        }
    },

    async downloadFile (url) {
        if (VueCookies.get('token')) {
            try {
                const res = await fetch(apiUrl + url, {
                    method: 'get',
                    headers: {
                        Authorization: 'Bearer ' + VueCookies.get('token')
                    }
                })
                const blob = await res.blob()

                const _url = window.URL || window.webkitURL;
                const link = _url.createObjectURL(blob);

                let a = document.createElement('a')
                a.href = link
                a.target = '_blank'

                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
            } catch (err) {
                store.commit('notice', {
                    type: 'error',
                    text: err.message
                })
            }
        } else {
            return false
        }
    },

    async save (url, data, id = '') {
        try {
            const formData = new FormData()
            formData.append('data', JSON.stringify(data))

            let addit = id ? `/${id}` : ''

            const res = await fetch(`${apiUrl}${url}${addit}`, {
                method: id ? 'put' : 'post',
                body: formData,
                headers: {
                    Authorization: 'Bearer ' + VueCookies.get('token')
                }
            })

            return await res.json()
        } catch (err) {
            store.commit('notice', {
                type: 'error',
                text: err.message
            })
        }
    },

    async delete (url) {
        try {
            const res = await fetch(apiUrl + url, {
                method: 'delete',
                headers: {
                    Authorization: 'Bearer ' + VueCookies.get('token')
                }
            })

            return await res.json()
        } catch (err) {
            store.commit('notice', {
                type: 'error',
                text: err.message
            })
        }
    },

    async uploadFile (data) {
        const formData = new FormData()
        formData.append('files', data.file)
        formData.append('refId', data.refId)
        formData.append('ref', data.ref)
        formData.append('field', data.field)

        try {
            const res = await fetch(`${apiUrl}/upload`, {
                method: 'post',
                body: formData
            })

            return await res.json()
        } catch (err) {
            store.commit('notice', {
                type: 'error',
                text: err.message
            })
        }
    }
}

// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

export async function client(clientData) {
    const config = {
        method: clientData.method,
        ...clientData.data.customConfig,
        headers: {
            ...clientData.data.customConfig.headers
        }
    }

    if (clientData.data.body) {
        config.body = clientData.data.body
    }

    let data
    try {
        const response = await fetch(`http://localhost:4000/elo-ranker-api${clientData.endpoint}`, config)

        data = await response.json()

        if (response.ok) {
            // Return a result object similar to Axios
            return {
                status: response.status,
                data,
                headers: response.headers,
                url: response.url
            }
        }

        throw new Error(response.statusText)
    } catch (err) {
        return Promise.reject(err.message ? err.message : data)
    }
}

client.get = function (endpoint, customConfig = {}) {
    return client({
        endpoint,
        method: 'GET',
        data: {
            body: null,
            customConfig
        }
    })
}

client.post = function (endpoint, body, customConfig = {}) {
    return client({
        endpoint,
        method: 'POST',
        data: {
            body,
            customConfig
        }
    })
}

client.put = function (endpoint, body, customConfig = {}) {
    return client({
        endpoint,
        method: 'PUT',
        data: {
            body,
            customConfig
        }
    })
}

client.delete = function (endpoint, customConfig = {}) {
    return client({
        endpoint,
        method: 'DELETE',
        data: {
            body: null,
            customConfig
        }
    })
}

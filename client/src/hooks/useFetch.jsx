export default async function useFetch(url, { body, method = 'GET', ...requestBody }) {
    const baseUrl = 'http://localhost:8000/api';

    const defaultRequest = {
        method,
        headers: {
            // Default headers can be added here if needed
        },
    };

    const fetchOptions = {
        ...defaultRequest,
        ...requestBody
    };

    let isPostMethod = method !== 'GET' && method !== 'HEAD';

    // Check if body is FormData
    if (isPostMethod) {
        if (body instanceof FormData) {
            fetchOptions.body = body;
        } else {
            fetchOptions.body = JSON.stringify(body);
            fetchOptions.headers['Content-Type'] = 'application/json';
        }
    }

    try {
        const fetchResponse = await fetch(baseUrl + url, fetchOptions);
        const response = await fetchResponse.json();

        if (!fetchResponse.ok) {
            throw new Error(response.message || 'Request failed');
        }

        return { status: true, data: response };
    } catch (error) {
        console.error(error);
        throw new Error(error.message || 'Client error');
    }
}

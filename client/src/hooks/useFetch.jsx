import { toast } from "@/components/ui/use-toast";

export default async function useFetch(url, { body, method = 'GET', ...requestBody }) {
    const baseUrl = 'http://localhost:8000/api';

    const defaultRequest = {
        method,
        headers: {
            // Default headers
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
            if (isPostMethod) {
                toast({
                    title: "Failed!",
                    description: response.error
                });
            }
            return false;
        }
        if (isPostMethod) {
            toast({
                title: 'Success',
                description: response.message
            });
        }
        return response;
    } catch (error) {
        console.error('Fetch error:', error);
        return false;
    }
}

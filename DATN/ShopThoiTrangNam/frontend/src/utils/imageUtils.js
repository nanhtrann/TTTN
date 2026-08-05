const API_BASE_URL = 'http://localhost:5000';

export function resolveImageUrl(image) {
    if (!image) {
        return 'https://via.placeholder.com/400x500';
    }

    if (/^https?:\/\//i.test(image)) {
        return image;
    }

    if (image.startsWith('/uploads/')) {
        return `${API_BASE_URL}${image}`;
    }

    if (image.startsWith('uploads/')) {
        return `${API_BASE_URL}/${image}`;
    }

    return image;
}

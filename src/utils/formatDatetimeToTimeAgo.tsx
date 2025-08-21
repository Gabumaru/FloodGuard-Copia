export default function formatDatetimeToTimeAgo(isoString: string): string {
    const messageDate = new Date(isoString);
    const now = new Date();

    if (isNaN(messageDate.getTime())) {
        throw new Error("Invalid ISO string format");
    }

    const diffInMilliseconds = now.getTime() - messageDate.getTime();
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    const diffInMonths = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 30));
    const diffInYears = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 365));

    if (diffInSeconds < 60) {
        return `Há ${diffInSeconds} segundo${diffInSeconds !== 1 ? 's' : ''}`;
    } else if (diffInMinutes < 60) {
        return `Há ${diffInMinutes} minuto${diffInMinutes !== 1 ? 's' : ''}`;
    } else if (diffInHours < 24) {
        return `Há ${diffInHours} hora${diffInHours !== 1 ? 's' : ''}`;
    } else if (diffInDays < 30) {
        return `Há ${diffInDays} dia${diffInDays !== 1 ? 's' : ''}`;
    } else if (diffInMonths < 12) {
        return `Há ${diffInMonths} mês${diffInMonths !== 1 ? 'es' : ''}`;
    } else {
        return `Há ${diffInYears} ano${diffInYears !== 1 ? 's' : ''}`;
    }
}
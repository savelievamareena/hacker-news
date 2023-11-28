export default function getPublicationDate(timestamp: number) : string {
    const pubDate = new Date(timestamp * 1000);
    return `${pubDate.getDate()} / ${pubDate.getMonth() + 1} / ${pubDate.getFullYear()}`
}
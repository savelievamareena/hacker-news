export default async function fetchComments(ids: number[] | undefined) {
    if (ids === undefined || ids.length < 1) {
        return [];
    }else {
        const fetchPromises = ids.map(id => {
            return fetchEntity(id, "comment");
        });
        return await Promise.all(fetchPromises);
    }
}

async function fetchEntity(id: number, type: string) {
    const urlAddress = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
    return fetch(urlAddress)
        .then(response => response.json())
        .then(data => {
            if(typeof data === "object" && data.type === type) {
                return data;
            }
            return null;
        });
}

export {fetchEntity};
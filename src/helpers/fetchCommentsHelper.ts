export default async function fetchComments(ids: number[] | undefined) {
    if (ids === undefined || ids.length < 1) {
        return [];
    }else {
        const fetchPromises = ids.map(id => {
            const urlAddress = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
            return fetch(urlAddress)
                .then(response => response.json())
                .then(data => {
                    if(typeof data === "object" && data.type === "comment") {
                        return data;
                    }
                    return null;
                });
        });
        return await Promise.all(fetchPromises);
    }
}
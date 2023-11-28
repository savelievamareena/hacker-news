export default function htmlDecode(input: string){
    const doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
}
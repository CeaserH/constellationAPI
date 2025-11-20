export interface ConstellationEntry {
    hourAgo: number;
    data: any;
}

const apiurl = "https://a.windbornesystems.com/treasure/";
const corsProxyUrl = "https://corsproxy.io/?";


export async function fetchConstellationHistory(): Promise<ConstellationEntry[]>{
    const history: ConstellationEntry[] = [];

    const queries = [
        { hour: 1, fileName: '01.json'},
        // { hour: 3, fileName: '03.json'}
    ];

    for(const query of queries){
        const fullUrl = corsProxyUrl + encodeURIComponent(apiurl + query.fileName);

        try {
            const response = await fetch(fullUrl);

            if(!response.ok){
                console.warn(`File ${query.fileName} not available (HTTP Status: ${response.status}). Skipping.`);
                continue;
            }

            const data = await response.json();

            history.push({
                hourAgo: query.hour,
                data
            });
        } catch(err){
            console.error(`Error fetching data for ${query.hour} hours ago (${query.fileName}):`, err);
        }
    }
    return history;
}
export async function fetchConstellationHistory(){

    const history = [];

    for(let i = 0; i <= 23; i++){
        const hour = i.toString().padStart(2, '0');
        const url = `https://a.windbornesystems.com/treasure/${hour}.json`;

        try{
            const response = await fetch(url);
            if(!response.ok) continue;

            const data = await response.json();
            history.push({
                hourAgo: i,
                data
            });
        } catch (err){
            console.error(`Error fetching ${hour}.json:`, err);
        }
    }

    return history;
}
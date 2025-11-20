export async function fetchConstellationHistory(){

    const history = [];

        try{
            const response = await fetch("https://a.windbornesystems.com/treasure/01.json");
            const data = await response.json();

            return[
                {
                    hourAgo: 0,
                    data
                }
            ];

        } catch (err){
            console.error(`Error fetching ${hour}.json:`, err);
            return [];
        }
}
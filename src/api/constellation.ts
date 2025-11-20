export async function fetchConstellationHistory(){

        try{
            const response = await fetch("https://a.windbornesystems.com/treasure/01.json");
            const data = await response.json();

            return[
                {
                    hourAgo: 1,
                    data
                }
            ];

        } catch (err){
            console.error(`Error fetching most recent:`, err);
            return [];
        }
}
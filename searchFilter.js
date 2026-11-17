//Search filter
async function search(input){

    try{
        const response = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');

        if(!response.ok){
            throw new Error("Failed to fetch resource");
        }

        const data = await response.json();
        const challenges = data.challenges;
        
        const filteredChallenges = challenges.filter(
            (challenges) => challenges.title.toLowerCase().includes(input.toLowerCase()) || challenges.description.toLowerCase().includes(input.toLowerCase())
        );

        return filteredChallenges;

    }
    catch(error){
        console.error(error);
    }
}


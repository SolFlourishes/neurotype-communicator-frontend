const axios = require('axios');

// --- 1. CONFIGURE YOUR TEST HERE ---

// Paste the URL of your Vercel Beta Preview deployment
const VERCEL_BETA_URL = "https://neurotype-communicator-frontend-j0xhci572.vercel.app/"; 

// Define the single input you want to test
const testInput = {
    context: "I want to let my boss know that I feel that she is overstepping sometimes and I'm walking on eggshells. I am able to run my team, manage my budget without her stepping in. ",
    text: "Dear Christina, I hope you are well. I wanted to share how I'm feeling. Sometimes I feel that we aren't clear on expectations especially with the team. There are times you go direct to them when I should be going to them. Also it feels that you don't trust me to manage the team and the budget. "
};

// --- END OF CONFIGURATION ---


// Define all the options for each selector
const senderStyles = ['direct', 'indirect'];
const receiverStyles = ['direct', 'indirect'];
const neurotypes = ['neurodivergent', 'neurotypical', 'unsure'];
const generations = ['Gen Alpha', 'Gen Z', 'Millennial', 'Xennial', 'Gen X', 'Boomer', 'unsure'];

// Function to make the API call
async function runTest(params) {
    const requestBody = {
        mode: 'draft',
        context: testInput.context,
        text: testInput.text,
        ...params
    };

    try {
        const response = await axios.post(`${VERCEL_BETA_URL}/api/translate`, requestBody);
        // We'll just grab the first 100 characters of the response for the summary table
        return {
            response: response.data.response.substring(0, 100).replace(/<[^>]*>/g, '').replace(/\n/g, ' ') + '...',
            explanation: response.data.explanation.substring(0, 100).replace(/<[^>]*>/g, '').replace(/\n/g, ' ') + '...'
        };
    } catch (error) {
        console.error(`API call failed for params:`, params, error.message);
        return { response: 'ERROR', explanation: 'ERROR' };
    }
}

// Main function to run all combinations
async function runAllTests() {
    console.log('Starting automated tests... This may take a few minutes.\n');

    let results = [];

    // Loop through all combinations
    for (const sender of senderStyles) {
        for (const receiver of receiverStyles) {
            for (const senderNT of neurotypes) {
                for (const receiverNT of neurotypes) {
                    for (const senderGen of generations) {
                        for (const receiverGen of generations) {
                            const params = { 
                                sender: sender, 
                                receiver: receiver, 
                                senderNeurotype: senderNT, 
                                receiverNeurotype: receiverNT,
                                senderGeneration: senderGen,
                                receiverGeneration: receiverGen
                            };
                            console.log(`Testing: My Style: ${sender}, Audience: ${receiver}, My NT: ${senderNT}, Audience NT: ${receiverNT}, My Gen: ${senderGen}, Audience Gen: ${receiverGen}`);
                            const result = await runTest(params);
                            results.push({ ...params, ...result });
                        }
                    }
                }
            }
        }
    }

    // Print the results as a markdown table
    console.log('\n\n--- TEST RESULTS ---');
    console.log('| My Style | Audience Style | My Neurotype | Audience Neurotype | My Generation | Audience Generation | Suggested Draft (preview) | Explanation (preview) |');
    console.log('|----------|----------------|--------------|--------------------|---------------|---------------------|---------------------------|-----------------------|');
    results.forEach(r => {
        console.log(`| ${r.sender} | ${r.receiver} | ${r.senderNeurotype} | ${r.receiverNeurotype} | ${r.senderGeneration} | ${r.receiverGeneration} | ${r.response} | ${r.explanation} |`);
    });

    console.log('\n--- TESTS COMPLETE ---');
}

runAllTests();
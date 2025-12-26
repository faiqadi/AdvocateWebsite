require('dotenv').config({ path: '.env.local' });
const { getArticles } = require('./lib/cms');

// Mock fetch if needed (Node 18 has native fetch)
// But we need to handle TS... ts-node handles TS.
// Wait, lib/cms.ts uses 'import', so check if ts-node handles ESM or if I need to use 'import' in test script.
// I'll use simple .ts file and run with ts-node.

// Using require for .env might fail in module.
// I'll assume ts-node loads .env? No.
// I'll try to use standard ESM.

async function run() {
    console.log('Testing getArticles for news...');
    try {
        const news = await getArticles({ category: 'news' });
        console.log('Success! News count:', news.length);
        console.log('First news item:', news[0]);
    } catch (err) {
        console.error('Failed:', err);
    }
}

run();

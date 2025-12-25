// Debug script to check profile phone data
const { getProfiles } = require('./lib/cms.ts');

async function debugProfilePhones() {
  try {
    console.log('Checking profile phone data...');
    const profiles = await getProfiles();

    console.log(`Found ${profiles.length} profiles`);

    profiles.forEach((profile, index) => {
      console.log(`${index + 1}. ${profile.name}:`);
      console.log(`   Phone: "${profile.phone}"`);
      console.log(`   Phone type: ${typeof profile.phone}`);
      console.log(`   Has valid phone: ${!!(profile.phone && typeof profile.phone === 'string' && profile.phone.trim())}`);
      console.log('');
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

debugProfilePhones();

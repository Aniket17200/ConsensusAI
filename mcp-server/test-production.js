const fetch = require('node-fetch');

const SERVER_URL = 'http://localhost:3000';

async function testProduction() {
  console.log('🚀 Testing production endpoints...\n');
  
  // Test 1: Health check
  try {
    const health = await fetch(`${SERVER_URL}/health`);
    const healthData = await health.json();
    console.log('✅ Health:', healthData.status);
  } catch (error) {
    console.log('❌ Health failed:', error.message);
  }
  
  // Test 2: Quick endpoint
  try {
    const quick = await fetch(`${SERVER_URL}/api/quick`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'Write a Python function to sort a list' })
    });
    const quickData = await quick.json();
    console.log('✅ Quick response quality:', quickData.data?.quality);
    console.log('📝 Sample response:', quickData.data?.text?.substring(0, 100) + '...');
  } catch (error) {
    console.log('❌ Quick failed:', error.message);
  }
  
  // Test 3: Discuss endpoint
  try {
    const discuss = await fetch(`${SERVER_URL}/api/discuss`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'Explain machine learning in simple terms' })
    });
    const discussData = await discuss.json();
    console.log('✅ Discuss models:', discussData.discussion?.selectedModels?.length);
    console.log('📊 Confidence:', Math.round(discussData.discussion?.confidence * 100) + '%');
  } catch (error) {
    console.log('❌ Discuss failed:', error.message);
  }
  
  console.log('\n🎉 Production tests completed!');
}

testProduction().catch(console.error);
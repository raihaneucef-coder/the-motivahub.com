import https from 'https';

function checkEnv(name) {
  const value = process.env[name];
  const present = !!value;
  const length = value ? value.length : 0;
  const trimmed = value ? value.trim() : '';
  const trimmedLength = trimmed.length;
  const startsWithBearer = value ? value.startsWith('Bearer ') : false;
  const startsWithClientId = value ? value.startsWith('Client-ID ') : false;
  
  console.log(name + ':');
  console.log('  present: ' + present);
  console.log('  raw_length: ' + length);
  console.log('  trimmed_length: ' + trimmedLength);
  console.log('  starts_with_Bearer: ' + startsWithBearer);
  console.log('  starts_with_Client-ID: ' + startsWithClientId);
  
  if (!present || length === 0) {
    console.log('  RESULT: MISSING or EMPTY');
    return false;
  }
  
  if (trimmedLength === 0) {
    console.log('  RESULT: ONLY WHITESPACE');
    return false;
  }
  
  console.log('  RESULT: PRESENT and NON-EMPTY');
  return true;
}

function testPexelsAuth() {
  return new Promise((resolve, reject) => {
    const key = process.env.PEXELS_API_KEY;
    if (!key) {
      reject(new Error('PEXELS_API_KEY is not set'));
      return;
    }
    
    const url = 'https://api.pexels.com/v1/search?query=test&per_page=1';
    const options = {
      headers: {
        'Authorization': 'Bearer ' + key
      }
    };
    
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve('Pexels auth OK (HTTP 200)');
        } else {
          // Show error details without exposing the key
          const truncated = data.slice(0, 300);
          reject(new Error('HTTP ' + res.statusCode + ' from Pexels. Response body (truncated): ' + truncated));
        }
      });
    }).on('error', (e) => {
      reject(new Error('Network error: ' + e.message));
    });
  });
}

function testUnsplashAuth() {
  return new Promise((resolve, reject) => {
    const key = process.env.UNSPLASH_API_KEY;
    if (!key) {
      reject(new Error('UNSPLASH_API_KEY is not set'));
      return;
    }
    
    const url = 'https://api.unsplash.com/search/photos?query=test&per_page=1';
    const options = {
      headers: {
        'Authorization': 'Client-ID ' + key
      }
    };
    
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve('Unsplash auth OK (HTTP 200)');
        } else {
          const truncated = data.slice(0, 300);
          reject(new Error('HTTP ' + res.statusCode + ' from Unsplash. Response body (truncated): ' + truncated));
        }
      });
    }).on('error', (e) => {
      reject(new Error('Network error: ' + e.message));
    });
  });
}

async function main() {
  console.log('=== Environment Variable Check ===');
  console.log('');
  
  const pexelsOk = checkEnv('PEXELS_API_KEY');
  console.log('');
  const unsplashOk = checkEnv('UNSPLASH_API_KEY');
  console.log('');
  
  if (!pexelsOk && !unsplashOk) {
    console.log('FATAL: Neither API key is available. Cannot test authentication.');
    process.exit(1);
  }
  
  console.log('=== Pexels Authentication Test ===');
  try {
    const result = await testPexelsAuth();
    console.log(result);
  } catch (e) {
    console.log('FAILED: ' + e.message);
  }
  console.log('');
  
  console.log('=== Unsplash Authentication Test ===');
  try {
    const result = await testUnsplashAuth();
    console.log(result);
  } catch (e) {
    console.log('FAILED: ' + e.message);
  }
}

main();

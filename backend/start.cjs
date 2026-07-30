// 🔧 DNS Fix: Must run BEFORE any ESM modules load.
// Your router's DNS refuses SRV queries needed by mongodb+srv://
// This forces Node.js to use Google's public DNS (8.8.8.8) instead.
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
dns.setDefaultResultOrder('ipv4first');

// Now launch the ESM app
import('./index.js').catch(err => {
  console.error('Failed to start app:', err);
  process.exit(1);
});

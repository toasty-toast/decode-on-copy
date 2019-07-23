const AdmZip = require('adm-zip');
const fs = require('fs');
const path = require('path');

const distPath = path.resolve(__dirname, '..', 'dist');
const zipPath = path.resolve(__dirname, '..', 'decode-on-copy-firefox.xpi');

if (!fs.existsSync(distPath)) {
	console.log(`Could not find directory: \"${distPath}\"`);
	process.exit(1);
}

const zip = new AdmZip();
fs.readdirSync(distPath).forEach(item => {
	const fullPath = path.resolve(distPath, item);
	const stat = fs.statSync(fullPath);
	if (stat && stat.isDirectory()) {
		zip.addLocalFolder(fullPath, item);
	} else {
		zip.addLocalFile(fullPath);
	}
});
zip.writeZip(zipPath);

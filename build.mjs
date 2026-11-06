import fs from 'node:fs';
import { build } from 'esbuild';

fs.rmSync('dist',{recursive:true,force:true});
fs.cpSync('public','dist',{recursive:true});
await build({entryPoints:['src/qr-entry.js'],bundle:true,minify:true,format:'iife',outfile:'dist/qrcode.js',platform:'browser'});



import { readFileSync } from 'fs';
import { request } from 'https';

const xml = readFileSync('docs/.vitepress/dist/sitemap.xml', 'utf-8');
const matches = xml.match(/<loc>(.*?)<\/loc>/g) || [];
const urlList = matches.map(m => m.replace(/<\/?loc>/g, ''));

const KEY = 'b5c07ad1556cbf950d03b26f7e17f4e8';
const HOST = 'openclaw-docs.dx3n.cn';

const body = JSON.stringify({
  host: HOST,
  key: KEY,
  keyLocation: `https://${HOST}/${KEY}.txt`,
  urlList,
});

function post(hostname, path) {
  return new Promise((resolve, reject) => {
    const buf = Buffer.from(body, 'utf-8');
    const req = request(
      {
        hostname,
        path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': buf.length,
        },
      },
      res => {
        let data = '';
        res.on('data', d => (data += d));
        res.on('end', () => resolve({ status: res.statusCode, body: data }));
      }
    );
    req.on('error', reject);
    req.write(buf);
    req.end();
  });
}

console.log(`提交 URL 数量: ${urlList.length}`);

// 提交到 Bing 国际版
console.log('\n[1] 提交到 Bing 国际版 (www.bing.com)...');
try {
  const r1 = await post('www.bing.com', '/indexnow');
  console.log(`  状态: ${r1.status}`, r1.status === 202 ? '✓ 成功' : r1.body || '');
} catch (e) {
  console.log('  错误:', e.message);
}

// 提交到 IndexNow.org（会广播到所有参与引擎，含中文 Bing）
console.log('\n[2] 提交到 IndexNow.org（涵盖国际版 + 中文版 Bing）...');
try {
  const r2 = await post('api.indexnow.org', '/indexnow');
  console.log(`  状态: ${r2.status}`, r2.status === 202 ? '✓ 成功' : r2.body || '');
} catch (e) {
  console.log('  错误:', e.message);
}

console.log('\n完成！');

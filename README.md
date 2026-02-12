# GLB - Base64 変換ツール

GLBファイルをBase64形式に変換し、Web上で読み込むためのツールと実装例です。

## 📋 プロジェクト構成

- **character.glb** - 3Dモデルファイル (glTF Binary Format)
- **glb-to-base64.html** - ブラウザでBase64に変換するHTMLツール
- **glb-base64-loader.js** - JavaScriptの読み込み実装例

## 🚀 jsDelivr CDN URL

jsDelivrを使用して、GitHubから直接GLBファイルを配信できます：

```
https://cdn.jsdelivr.net/gh/67950050-code/GLB@main/character.glb
```

### または GitHub Raw URL

```
https://raw.githubusercontent.com/67950050-code/GLB/main/character.glb
```

## 🔄 Base64に変換する方法

### 方法1: HTMLツール使用（推奨）

ブラウザで [glb-to-base64.html](glb-to-base64.html) を開き、CDN URLを入力して変換ボタンをクリック。

### 方法2: JavaScriptで自動変換

```javascript
import { fetchAndConvertToBase64, loadGLBFromBase64 } from './glb-base64-loader.js';

const cdnUrl = 'https://cdn.jsdelivr.net/gh/67950050-code/GLB@main/character.glb';
const base64 = await fetchAndConvertToBase64(cdnUrl);
console.log(base64); // Base64文字列
```

### 方法3: Node.js/CLI版

```bash
node -e "
  const fs = require('fs');
  const https = require('https');
  https.get('https://cdn.jsdelivr.net/gh/67950050-code/GLB@main/character.glb', (res) => {
    let data = '';
    res.setEncoding('binary');
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => console.log(Buffer.from(data, 'binary').toString('base64')));
  });
"
```

## 📦 Three.jsでの使用例

```javascript
import { loadGLBFromBase64 } from './glb-base64-loader.js';

const base64String = '...ここにBase64文字列...';
const scene = new THREE.Scene();

await loadGLBFromBase64(base64String, scene);
```

## 🔗 関連リンク

- [glTF/GLB フォーマット仕様](https://www.khronos.org/gltf/)
- [jsDelivr CDN](https://www.jsdelivr.com/)
- [Three.js GLTFLoader](https://threejs.org/docs/index.html#examples/en/loaders/GLTFLoader)

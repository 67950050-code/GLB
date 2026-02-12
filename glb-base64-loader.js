/**
 * Base64からGLBモデルを読み込む実装例
 * 使用方法: loadGLBFromBase64(base64String, scene)
 */

// jsDelivrから直接Base64に変換
async function fetchAndConvertToBase64(cdnUrl) {
    try {
        const response = await fetch(cdnUrl);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error('Error fetching GLB:', error);
    }
}

// Base64 → ArrayBuffer に変換
function base64ToArrayBuffer(base64) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

// Base64からGLBを読み込み（Three.jsの場合）
async function loadGLBFromBase64(base64String, scene) {
    const arrayBuffer = base64ToArrayBuffer(base64String);
    const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);

    const loader = new THREE.GLTFLoader();
    return new Promise((resolve, reject) => {
        loader.load(url, (gltf) => {
            scene.add(gltf.scene);
            URL.revokeObjectURL(url);
            resolve(gltf);
        }, undefined, reject);
    });
}

// 使用例
async function initializeScene() {
    // jsDelivr CDN URLまたは直接Base64を指定
    const cdnUrl = 'https://cdn.jsdelivr.net/gh/67950050-code/GLB@main/character.glb';
    
    // プリセット的にBase64を持っている場合：
    // const base64String = '...ここにBase64文字列...';
    // await loadGLBFromBase64(base64String, scene);

    // または、CDNからBase64に変換:
    // const base64 = await fetchAndConvertToBase64(cdnUrl);
    // await loadGLBFromBase64(base64, scene);
}

// CDNキャッシュ用のローカル変数（初回のみ取得）
let cachedBase64 = null;

async function getCachedBase64(cdnUrl) {
    if (!cachedBase64) {
        cachedBase64 = await fetchAndConvertToBase64(cdnUrl);
    }
    return cachedBase64;
}

// 環境変数など設定用
const GLB_CONFIG = {
    CDN_URL: 'https://cdn.jsdelivr.net/gh/67950050-code/GLB@main/character.glb',
    GITHUB_RAW_URL: 'https://raw.githubusercontent.com/67950050-code/GLB/main/character.glb'
};

export {
    fetchAndConvertToBase64,
    base64ToArrayBuffer,
    loadGLBFromBase64,
    getCachedBase64,
    GLB_CONFIG
};

/**
 * FUO OCR Quizlet - Offscreen Document Script (v1.4.0)
 * Tối ưu tốc độ cao: Preload worker + Fast fetch timeout (không bao giờ bị treo 90s)
 */

// Báo cho background biết Offscreen document đã sẵn sàng
chrome.runtime.sendMessage({ action: 'offscreen_ready' }).catch(() => {});

let worker = null;
let currentLang = '';
let initPromise = null;

async function fetchWithTimeout(url, timeoutMs = 3000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal, credentials: 'include' });
    clearTimeout(id);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const blob = await res.blob();
    if (blob.size < 100) throw new Error('Ảnh rỗng hoặc quá nhỏ');
    return blob;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

async function initWorker(lang = 'eng') {
  if (worker && currentLang === lang) {
    return worker;
  }
  if (initPromise && currentLang === lang) {
    return initPromise;
  }

  initPromise = (async () => {
    if (worker) {
      try {
        await worker.terminate();
      } catch (e) {}
      worker = null;
    }

    currentLang = lang;

    const workerPath = chrome.runtime.getURL('tesseract_lib/worker.min.js');
    const corePath = chrome.runtime.getURL('tesseract_lib');
    const langPath = chrome.runtime.getURL('tesseract_lib');

    worker = await Tesseract.createWorker(lang, 1, {
      workerPath: workerPath,
      corePath: corePath,
      langPath: langPath,
      workerBlobURL: false
    });

    initPromise = null;
    return worker;
  })();

  return initPromise;
}

// Khởi động trước bộ máy OCR ngay khi mở extension để không bị trễ ở câu đầu tiên
initWorker('eng').catch(e => console.warn('Preload worker:', e));

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.target !== 'offscreen') return;

  if (request.action === 'ocr') {
    (async () => {
      try {
        const lang = request.lang || 'eng';
        const ocrWorker = await initWorker(lang);

        let imageSource = null;

        // Ưu tiên 1: Tải ngay từ fallbackUrl (CDN data.fuoverflow.com cực nhanh, ~50ms, không bị treo)
        if (request.fallbackUrl) {
          try {
            imageSource = await fetchWithTimeout(request.fallbackUrl, 3000);
          } catch (e) {
            console.warn('FallbackUrl fetch error:', e);
          }
        }

        // Ưu tiên 2: Nếu chưa có thì thử tải imageUrl với timeout 3s (tránh bị treo 90s do Cloudflare)
        if (!imageSource && request.imageUrl) {
          try {
            imageSource = await fetchWithTimeout(request.imageUrl, 3000);
          } catch (e) {
            console.warn('ImageUrl fetch error:', e);
          }
        }

        // Ưu tiên 3: Data URL trực tiếp
        if (!imageSource && request.imageSource) {
          imageSource = request.imageSource;
        }

        if (!imageSource) {
          throw new Error('Không thể tải ảnh trong 3s');
        }

        const { data } = await ocrWorker.recognize(imageSource);
        sendResponse({
          success: true,
          text: data && data.text ? data.text.trim() : ''
        });
      } catch (err) {
        console.error('Lỗi Offscreen OCR:', err);
        sendResponse({
          success: false,
          error: err.message || String(err)
        });
      }
    })();
    return true; // Giữ kết nối gửi phản hồi bất đồng bộ
  }
});

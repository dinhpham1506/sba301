/**
 * FUO OCR Quizlet - Service Worker (background.js)
 * Điều phối Offscreen Document và chuyển tiếp yêu cầu OCR
 */

let isOffscreenReady = false;
let offscreenResolvers = [];

function notifyOffscreenReady() {
  isOffscreenReady = true;
  offscreenResolvers.forEach(resolve => resolve());
  offscreenResolvers = [];
}

async function setupOffscreenDocument(path) {
  if (chrome.offscreen && typeof chrome.offscreen.hasDocument === 'function') {
    if (await chrome.offscreen.hasDocument()) {
      isOffscreenReady = true;
      return;
    }
  }

  isOffscreenReady = false;

  await chrome.offscreen.createDocument({
    url: path,
    reasons: ['WORKERS', 'BLOBS', 'DOM_PARSER'],
    justification: 'Chạy bộ máy Tesseract OCR cục bộ'
  });

  if (!isOffscreenReady) {
    await new Promise(resolve => {
      offscreenResolvers.push(resolve);
      setTimeout(resolve, 1500); // timeout an toàn 1.5s
    });
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'offscreen_ready') {
    notifyOffscreenReady();
    sendResponse({ ack: true });
    return;
  }

  if (request.action === 'do_ocr') {
    (async () => {
      try {
        await setupOffscreenDocument('offscreen.html');

        // Gửi sang offscreen với cơ chế thử lại nếu document đang nạp
        let res = null;
        for (let attempt = 0; attempt < 5; attempt++) {
          try {
            res = await new Promise((resolve, reject) => {
              chrome.runtime.sendMessage(
                {
                  target: 'offscreen',
                  action: 'ocr',
                  imageUrl: request.imageUrl,
                  fallbackUrl: request.fallbackUrl,
                  imageSource: request.imageSource,
                  lang: request.lang || 'eng'
                },
                response => {
                  if (chrome.runtime.lastError) {
                    reject(new Error(chrome.runtime.lastError.message));
                  } else {
                    resolve(response);
                  }
                }
              );
            });
            if (res) break;
          } catch (sendErr) {
            if (sendErr.message && sendErr.message.includes('Receiving end does not exist')) {
              await new Promise(r => setTimeout(r, 250));
              continue;
            }
            throw sendErr;
          }
        }

        sendResponse(res || { success: false, error: 'Offscreen không phản hồi' });
      } catch (err) {
        console.error('Lỗi Background OCR:', err);
        sendResponse({ success: false, error: err.message || String(err) });
      }
    })();
    return true; // asynchronous
  }
});

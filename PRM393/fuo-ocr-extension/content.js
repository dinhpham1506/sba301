/**
 * FUO OCR Quizlet - Chrome Extension Content Script (v1.4.0)
 * Bóc tách tự động toàn bộ 121+ câu hỏi WebP trên FuOverflow
 * Hiển thị trực tiếp từng câu theo thời gian thực (Real-time Streaming)
 */

(function () {
  'use strict';

  if (document.getElementById('fuo-ocr-panel')) {
    return;
  }

  // State
  let scannedItems = []; // { id, name, title, src, fullUrl, rawText, status }
  let isScanning = false;
  let shouldStop = false;
  let currentFormatMode = 'numbered'; // Mặc định 'numbered' (Câu X [TAB] Nội dung) cho đề thi trắc nghiệm
  let currentSeparator = '\t'; // Ký tự phân cách giữa Thuật ngữ và Định nghĩa trong Quizlet

  // 1. Tạo và chèn giao diện Floating Panel
  function injectUI() {
    const style = document.createElement('style');
    style.id = 'fuo-ocr-styles';
    style.textContent = `
      #fuo-ocr-panel {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 470px;
        max-width: calc(100vw - 32px);
        background: #121316;
        color: #f4f4f5;
        border: 1px solid #27272a;
        border-radius: 12px;
        box-shadow: 0 16px 36px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.08);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        font-size: 13px;
        z-index: 2147483647;
        overflow: hidden;
        transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        display: flex;
        flex-direction: column;
      }

      #fuo-ocr-panel.minimized .fuo-body,
      #fuo-ocr-panel.minimized .fuo-footer {
        display: none !important;
      }

      #fuo-ocr-panel.minimized {
        width: 270px;
      }

      .fuo-header {
        background: #18181b;
        padding: 10px 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #27272a;
        user-select: none;
      }

      .fuo-title-group {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 600;
        font-size: 13.5px;
        color: #ffffff;
      }

      .fuo-title-icon {
        font-size: 16px;
      }

      .fuo-badge {
        font-size: 11px;
        font-weight: 500;
        padding: 2px 7px;
        border-radius: 12px;
        background: #27272a;
        color: #38bdf8;
      }

      .fuo-window-actions {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .fuo-win-btn {
        background: transparent;
        border: none;
        color: #a1a1aa;
        cursor: pointer;
        padding: 4px 6px;
        font-size: 13px;
        border-radius: 4px;
        line-height: 1;
        transition: all 0.15s ease;
      }

      .fuo-win-btn:hover {
        background: #27272a;
        color: #ffffff;
      }

      .fuo-body {
        padding: 12px 14px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-height: 75vh;
        overflow-y: auto;
      }

      .fuo-controls-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }

      .fuo-field {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .fuo-field label {
        font-size: 11px;
        color: #a1a1aa;
        font-weight: 500;
      }

      .fuo-select {
        background: #1f1f23;
        border: 1px solid #333338;
        color: #e4e4e7;
        font-size: 12px;
        padding: 6px 8px;
        border-radius: 6px;
        outline: none;
      }

      .fuo-select:focus {
        border-color: #6366f1;
      }

      .fuo-actions {
        display: flex;
        gap: 8px;
      }

      .fuo-btn {
        flex: 1;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 10px 14px;
        font-size: 13px;
        font-weight: 600;
        border-radius: 6px;
        border: none;
        cursor: pointer;
        transition: all 0.15s ease;
      }

      .fuo-btn-primary {
        background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);
        color: #ffffff;
        box-shadow: 0 2px 10px rgba(79, 70, 229, 0.4);
      }

      .fuo-btn-primary:hover:not(:disabled) {
        opacity: 0.95;
        transform: translateY(-1px);
      }

      .fuo-btn-secondary {
        background: #27272a;
        color: #e4e4e7;
        border: 1px solid #3f3f46;
      }

      .fuo-btn-secondary:hover:not(:disabled) {
        background: #3f3f46;
      }

      .fuo-btn-danger {
        background: #7f1d1d;
        color: #fecaca;
      }

      .fuo-btn-danger:hover:not(:disabled) {
        background: #991b1b;
      }

      .fuo-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .fuo-progress-container {
        display: none;
        flex-direction: column;
        gap: 5px;
        background: #1a1a1e;
        padding: 8px 10px;
        border-radius: 6px;
        border: 1px solid #27272a;
      }

      .fuo-progress-bar-bg {
        width: 100%;
        height: 6px;
        background: #27272a;
        border-radius: 3px;
        overflow: hidden;
      }

      .fuo-progress-bar-fill {
        width: 0%;
        height: 100%;
        background: linear-gradient(90deg, #10b981, #06b6d4);
        transition: width 0.15s ease;
      }

      .fuo-progress-text {
        display: flex;
        justify-content: space-between;
        font-size: 11.5px;
        font-weight: 500;
        color: #94a3b8;
      }

      .fuo-preview-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 11px;
        color: #a1a1aa;
      }

      .fuo-textarea {
        width: 100%;
        box-sizing: border-box;
        height: 180px;
        background: #09090b;
        border: 1px solid #27272a;
        border-radius: 6px;
        padding: 10px;
        color: #34d399;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 12px;
        line-height: 1.45;
        resize: vertical;
        outline: none;
        white-space: pre;
      }

      .fuo-textarea:focus {
        border-color: #10b981;
      }

      .fuo-footer {
        padding: 10px 14px;
        background: #18181b;
        border-top: 1px solid #27272a;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .fuo-footer-actions {
        display: flex;
        gap: 8px;
      }

      .fuo-btn-copy {
        background: #10b981;
        color: #ffffff;
        font-weight: 600;
        flex: 2;
      }

      .fuo-btn-copy:hover:not(:disabled) {
        background: #059669;
      }

      .fuo-btn-copy.copied {
        background: #0284c7 !important;
      }

      .fuo-tip {
        font-size: 11px;
        color: #71717a;
        line-height: 1.35;
        text-align: center;
      }

      .fuo-tip strong {
        color: #a1a1aa;
      }

      #fuo-ocr-reopen {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #18181b;
        color: #38bdf8;
        border: 1px solid #27272a;
        border-radius: 20px;
        padding: 7px 14px;
        font-size: 12px;
        font-weight: 600;
        box-shadow: 0 4px 14px rgba(0,0,0,0.4);
        cursor: pointer;
        z-index: 2147483646;
        display: none;
        align-items: center;
        gap: 6px;
        transition: transform 0.15s ease;
      }

      #fuo-ocr-reopen:hover {
        transform: translateY(-2px);
        background: #27272a;
      }
    `;
    document.head.appendChild(style);

    const panel = document.createElement('div');
    panel.id = 'fuo-ocr-panel';
    panel.innerHTML = `
      <div class="fuo-header">
        <div class="fuo-title-group">
          <span class="fuo-title-icon">📚</span>
          <span>FUO OCR Quizlet</span>
          <span class="fuo-badge" id="fuo-image-counter">Đang quét trang...</span>
        </div>
        <div class="fuo-window-actions">
          <button class="fuo-win-btn" id="fuo-btn-min" title="Thu nhỏ / Mở rộng">−</button>
          <button class="fuo-win-btn" id="fuo-btn-close" title="Đóng bảng">✕</button>
        </div>
      </div>

      <div class="fuo-body">
        <div class="fuo-controls-grid">
          <div class="fuo-field">
            <label>Ngôn ngữ OCR</label>
            <select class="fuo-select" id="fuo-lang-select">
              <option value="eng" selected>Tiếng Anh (eng - Siêu nhanh)</option>
              <option value="vie">Tiếng Việt (vie)</option>
            </select>
          </div>
          <div class="fuo-field">
            <label>Định dạng Quizlet</label>
            <select class="fuo-select" id="fuo-format-select">
              <option value="numbered" selected>Câu X [TAB] Toàn bộ nội dung</option>
              <option value="qa">Tách Câu hỏi [TAB] Đáp án</option>
              <option value="firstline">Dòng 1 [TAB] Các dòng sau</option>
              <option value="raw">Giữ nguyên bản (Raw)</option>
            </select>
          </div>
        </div>

        <div class="fuo-actions">
          <button class="fuo-btn fuo-btn-primary" id="fuo-btn-scan-ocr">
            <span>⚡</span>
            <span id="fuo-btn-scan-text-label">BẮT ĐẦU QUÉT FULL ĐỀ THI</span>
          </button>
          <button class="fuo-btn fuo-btn-danger" id="fuo-btn-stop" style="display: none; flex: 0 0 75px;">
            Dừng
          </button>
        </div>

        <div class="fuo-progress-container" id="fuo-progress-box">
          <div class="fuo-progress-bar-bg">
            <div class="fuo-progress-bar-fill" id="fuo-progress-fill"></div>
          </div>
          <div class="fuo-progress-text">
            <span id="fuo-status-label">Sẵn sàng</span>
            <span id="fuo-progress-pct">0%</span>
          </div>
        </div>

        <div>
          <div class="fuo-preview-header">
            <span>KẾT QUẢ ĐỊNH DẠNG QUIZLET (CẬP NHẬT TRỰC TIẾP)</span>
            <span id="fuo-stats-label">0 thẻ</span>
          </div>
          <textarea class="fuo-textarea" id="fuo-output" placeholder="Bấm 'BẮT ĐẦU QUÉT FULL ĐỀ THI' để tiện ích tự động bóc tách từ Câu 1 đến câu cuối cùng...&#10;&#10;Kết quả sẽ tự động được định dạng sẵn:&#10;Câu 1 [TAB] Nội dung đề bài & đáp án&#10;Câu 2 [TAB] Nội dung đề bài & đáp án&#10;&#10;Khi hoàn tất, chỉ cần bấm 'Copy kết quả' rồi dán thẳng vào mục Import của Quizlet!"></textarea>
        </div>
      </div>

      <div class="fuo-footer">
        <div class="fuo-footer-actions">
          <button class="fuo-btn fuo-btn-copy" id="fuo-btn-copy">
            <span>📋</span>
            <span id="fuo-copy-text">Copy kết quả</span>
          </button>
          <button class="fuo-btn fuo-btn-secondary" id="fuo-btn-export-txt" title="Tải file .txt về máy">
            <span>💾 .txt</span>
          </button>
          <button class="fuo-btn fuo-btn-secondary" id="fuo-btn-clear" title="Xóa kết quả">
            <span>🗑️</span>
          </button>
        </div>
        <div class="fuo-tip">
          💡 <strong>Quét cực nhanh:</strong> Mỗi câu hoàn thành sẽ xuất hiện ngay lập tức trong ô kết quả!
        </div>
      </div>
    `;

    document.body.appendChild(panel);

    const reopenBtn = document.createElement('div');
    reopenBtn.id = 'fuo-ocr-reopen';
    reopenBtn.innerHTML = `<span>📚</span><span>FUO OCR</span>`;
    document.body.appendChild(reopenBtn);

    bindEvents();
    updateImageCount();
  }

  // 2. Tìm tất cả câu hỏi / file đính kèm trên FuOverflow & Sắp xếp tự nhiên (Q1 -> Q121)
  function findFuOverflowQuestionsAndImages() {
    const items = [];
    const seenUrls = new Set();

    // 1. Quét danh sách đính kèm (.attachmentList li.file, .attachment-item)
    const attachmentFiles = document.querySelectorAll('.attachmentList li.file, .attachment-item');
    attachmentFiles.forEach((fileEl, idx) => {
      const link = fileEl.querySelector('a.file-preview, a[href*="/attachments/"], a');
      const nameEl = fileEl.querySelector('.file-name, [title]');
      const img = fileEl.querySelector('img');

      const fileName = (nameEl ? nameEl.getAttribute('title') || nameEl.textContent : '').trim() || `Q${idx + 1}.webp`;
      const thumbUrl = img ? (img.currentSrc || img.src) : '';
      const fullUrl = link ? link.href : thumbUrl;

      const dedupeKey = fullUrl || thumbUrl || fileName;
      if (dedupeKey && !seenUrls.has(dedupeKey)) {
        seenUrls.add(dedupeKey);
        const match = fileName.match(/(?:q|câu|cau|question)?\s*(\d+)/i);
        const order = match ? parseInt(match[1], 10) : idx + 1;

        items.push({
          id: order,
          order: order,
          name: fileName,
          title: `Câu ${order}`,
          fullUrl: fullUrl,
          thumbUrl: thumbUrl,
          element: img,
          type: 'attachment'
        });
      }
    });

    // 2. Quét các ảnh inline trong thân bài viết (.bbWrapper img, .bbImage)
    const inlineImgs = document.querySelectorAll('article.message .bbWrapper img, .message-content img');
    inlineImgs.forEach((img, idx) => {
      if (
        img.closest('.avatar') ||
        img.closest('.message-avatar') ||
        img.classList.contains('smilie') ||
        img.src.includes('/avatars/') ||
        img.src.includes('/smilies/') ||
        img.src.includes('/styles/') ||
        (img.width > 0 && img.width < 50) ||
        (img.height > 0 && img.height < 50)
      ) {
        return;
      }

      const parentLink = img.closest('a');
      const fullUrl = (parentLink && parentLink.href) ? parentLink.href : (img.currentSrc || img.src);
      const thumbUrl = img.currentSrc || img.src;

      const dedupeKey = fullUrl || thumbUrl;
      if (dedupeKey && !seenUrls.has(dedupeKey)) {
        seenUrls.add(dedupeKey);
        const fileNameMatch = fullUrl.match(/([^\/\?#]+(?:webp|png|jpe?g))/i);
        const fileName = fileNameMatch ? fileNameMatch[1] : `Ảnh ${idx + 1}`;
        const match = fileName.match(/(?:q|câu|cau|question)?\s*(\d+)/i);
        const order = match ? parseInt(match[1], 10) : 1000 + idx;

        items.push({
          id: order,
          order: order,
          name: fileName,
          title: `Câu ${order < 1000 ? order : idx + 1}`,
          fullUrl: fullUrl,
          thumbUrl: thumbUrl,
          element: img,
          type: 'inline'
        });
      }
    });

    // Sắp xếp tự nhiên theo thứ tự Câu 1 -> Câu 121+
    items.sort((a, b) => a.order - b.order);

    return items;
  }

  function updateImageCount() {
    const items = findFuOverflowQuestionsAndImages();
    const counter = document.getElementById('fuo-image-counter');
    if (counter) {
      if (items.length > 0) {
        counter.textContent = `${items.length} câu hỏi`;
      } else {
        counter.textContent = 'Dạng văn bản';
      }
    }
  }

  // 3. Làm sạch text và định dạng Quizlet
  function cleanText(text) {
    if (!text) return '';
    return text
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/[\t]+/g, ' ') // Xóa tab thừa để tránh lệch cột Quizlet
      .replace(/[ ]{2,}/g, ' ')
      .trim();
  }

  function parseQA(rawText, title) {
    const text = cleanText(rawText);
    if (!text) return null;

    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) return null;

    if (lines.length === 1) {
      return {
        term: title,
        definition: lines[0]
      };
    }

    let splitIdx = -1;
    let answerLine = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (/^(đáp án|answer|ans|key|correct answer)\s*[:\-]/i.test(line)) {
        answerLine = line;
      }
      if (splitIdx === -1 && /^[A-D][\.\)\:\-]\s+/i.test(line)) {
        splitIdx = i;
      }
    }

    if (splitIdx > 0) {
      const termLines = lines.slice(0, splitIdx);
      const defLines = lines.slice(splitIdx);
      return {
        term: termLines.join(' '),
        definition: defLines.join(' | ')
      };
    }

    if (answerLine) {
      const otherLines = lines.filter(l => l !== answerLine);
      return {
        term: otherLines.join(' '),
        definition: answerLine
      };
    }

    return {
      term: lines[0],
      definition: lines.slice(1).join(' | ')
    };
  }

  function refreshOutputText() {
    const outputEl = document.getElementById('fuo-output');
    const statsEl = document.getElementById('fuo-stats-label');
    if (!outputEl) return;

    if (scannedItems.length === 0) {
      outputEl.value = '';
      if (statsEl) statsEl.textContent = '0 thẻ';
      return;
    }

    const cards = [];

    scannedItems.forEach((item, idx) => {
      if (!item.rawText) return;

      const cleaned = cleanText(item.rawText);
      if (!cleaned) return;

      const itemTitle = item.title || `Câu ${idx + 1}`;

      if (currentFormatMode === 'numbered') {
        const inlineText = cleaned.replace(/\n+/g, ' | ');
        cards.push(`${itemTitle}${currentSeparator}${inlineText}`);
      } else if (currentFormatMode === 'qa') {
        const parsed = parseQA(cleaned, itemTitle);
        if (parsed) {
          cards.push(`${parsed.term}${currentSeparator}${parsed.definition}`);
        }
      } else if (currentFormatMode === 'firstline') {
        const lines = cleaned.split('\n').map(l => l.trim()).filter(Boolean);
        const term = lines[0] || itemTitle;
        const def = lines.slice(1).join(' | ') || term;
        cards.push(`${term}${currentSeparator}${def}`);
      } else {
        cards.push(cleaned);
      }
    });

    const fullResult = cards.join('\n');
    outputEl.value = fullResult;
    if (statsEl) {
      statsEl.textContent = `${cards.length} thẻ | ${fullResult.length} ký tự`;
    }
  }

  // 4. Quy trình quét Full tự động tốc độ cao
  async function startFullScan() {
    const items = findFuOverflowQuestionsAndImages();

    if (items.length === 0) {
      scanTextQuestions();
      return;
    }

    isScanning = true;
    shouldStop = false;
    scannedItems = [];
    refreshOutputText();

    const scanBtn = document.getElementById('fuo-btn-scan-ocr');
    const stopBtn = document.getElementById('fuo-btn-stop');
    const progressBox = document.getElementById('fuo-progress-box');
    const langSelect = document.getElementById('fuo-lang-select');

    scanBtn.disabled = true;
    stopBtn.style.display = 'inline-flex';
    progressBox.style.display = 'flex';

    const selectedLang = langSelect.value || 'eng';

    try {
      const total = items.length;
      updateStatus(`Đang chuẩn bị bộ máy OCR và nạp ${total} câu hỏi...`, 0);

      for (let i = 0; i < total; i++) {
        if (shouldStop) {
          updateStatus(`Đã dừng quét theo yêu cầu (đã lấy ${scannedItems.length}/${total} câu)`, Math.round((i / total) * 100));
          break;
        }

        const item = items[i];
        const currentNum = i + 1;
        const currentPercent = Math.max(1, Math.round((i / total) * 100));

        updateStatus(`Đang quét [${item.name || item.title}] (${currentNum}/${total})...`, currentPercent);

        try {
          // Gửi URL sang Offscreen qua background
          const response = await new Promise((resolve) => {
            chrome.runtime.sendMessage(
              {
                action: 'do_ocr',
                imageUrl: item.fullUrl,
                fallbackUrl: item.thumbUrl,
                lang: selectedLang
              },
              res => resolve(res)
            );
          });

          if (response && response.success && response.text) {
            scannedItems.push({
              id: item.id || currentNum,
              name: item.name,
              title: item.title || `Câu ${currentNum}`,
              src: item.fullUrl,
              rawText: response.text
            });
            refreshOutputText();
          } else {
            scannedItems.push({
              id: item.id || currentNum,
              name: item.name,
              title: item.title || `Câu ${currentNum}`,
              src: item.fullUrl,
              rawText: `[Chưa nhận dạng được: ${response ? response.error || 'Ảnh mờ' : 'Lỗi kết nối'}]`
            });
            refreshOutputText();
          }
        } catch (imgErr) {
          console.warn(`Lỗi câu ${item.name || currentNum}:`, imgErr);
          scannedItems.push({
            id: item.id || currentNum,
            name: item.name,
            title: item.title || `Câu ${currentNum}`,
            src: item.fullUrl,
            rawText: `[Lỗi câu ${currentNum}: ${imgErr.message}]`
          });
          refreshOutputText();
        }

        const donePercent = Math.round((currentNum / total) * 100);
        updateStatus(`✓ Xong ${item.name || currentNum} (${currentNum}/${total})`, donePercent);
      }

      if (!shouldStop) {
        updateStatus(`✓ Hoàn tất toàn bộ ${scannedItems.length}/${total} câu hỏi!`, 100);
      }
    } catch (err) {
      console.error('Lỗi trong tiến trình quét:', err);
      updateStatus(`Lỗi: ${err.message}`, 0);
      alert(`Lỗi quét: ${err.message}`);
    } finally {
      isScanning = false;
      scanBtn.disabled = false;
      stopBtn.style.display = 'none';
    }
  }

  // 5. Quét câu hỏi dạng văn bản thuần nếu bài viết không có ảnh
  function scanTextQuestions() {
    const posts = document.querySelectorAll('article.message .bbWrapper');
    if (posts.length === 0) {
      alert('Không tìm thấy nội dung bài viết dạng văn bản!');
      return;
    }

    scannedItems = [];
    let count = 0;

    posts.forEach((post) => {
      const clone = post.cloneNode(true);
      clone.querySelectorAll('blockquote, .bbCodeBlock, .attachmentList').forEach(el => el.remove());

      const rawContent = clone.innerText || clone.textContent || '';
      const cleaned = cleanText(rawContent);
      if (!cleaned) return;

      const questionBlocks = cleaned.split(/(?=(?:câu\s*\d+|question\s*\d+)[\.:\-])/i);
      questionBlocks.forEach(block => {
        const b = block.trim();
        if (b.length > 5) {
          count++;
          scannedItems.push({
            id: count,
            name: `Câu ${count}`,
            title: `Câu ${count}`,
            src: 'text',
            rawText: b
          });
        }
      });
    });

    refreshOutputText();
    updateStatus(`✓ Đã trích xuất ${scannedItems.length} câu hỏi văn bản!`, 100);
    const progressBox = document.getElementById('fuo-progress-box');
    if (progressBox) progressBox.style.display = 'flex';
  }

  function updateStatus(label, percent) {
    const labelEl = document.getElementById('fuo-status-label');
    const pctEl = document.getElementById('fuo-progress-pct');
    const fillEl = document.getElementById('fuo-progress-fill');

    if (labelEl) labelEl.textContent = label;
    if (pctEl && typeof percent !== 'undefined') pctEl.textContent = `${percent}%`;
    if (fillEl && typeof percent !== 'undefined') fillEl.style.width = `${percent}%`;
  }

  // 6. Đăng ký sự kiện
  function bindEvents() {
    const panel = document.getElementById('fuo-ocr-panel');
    const reopenBtn = document.getElementById('fuo-ocr-reopen');

    // Thu nhỏ / Phóng to
    const minBtn = document.getElementById('fuo-btn-min');
    minBtn.addEventListener('click', () => {
      panel.classList.toggle('minimized');
      minBtn.textContent = panel.classList.contains('minimized') ? '＋' : '−';
    });

    // Đóng panel
    const closeBtn = document.getElementById('fuo-btn-close');
    closeBtn.addEventListener('click', () => {
      panel.style.display = 'none';
      reopenBtn.style.display = 'inline-flex';
    });

    // Mở lại panel
    reopenBtn.addEventListener('click', () => {
      panel.style.display = 'flex';
      reopenBtn.style.display = 'none';
      updateImageCount();
    });

    // Nút Bắt đầu Quét Full
    document.getElementById('fuo-btn-scan-ocr').addEventListener('click', () => {
      if (!isScanning) {
        startFullScan();
      }
    });

    // Nút Dừng
    document.getElementById('fuo-btn-stop').addEventListener('click', () => {
      shouldStop = true;
      updateStatus('Đang dừng lại...', 0);
    });

    // Đổi định dạng
    document.getElementById('fuo-format-select').addEventListener('change', e => {
      currentFormatMode = e.target.value;
      refreshOutputText();
    });

    // Nút Copy kết quả
    const copyBtn = document.getElementById('fuo-btn-copy');
    const copyText = document.getElementById('fuo-copy-text');
    copyBtn.addEventListener('click', async () => {
      const outputEl = document.getElementById('fuo-output');
      const val = outputEl ? outputEl.value : '';

      if (!val.trim()) {
        alert('Chưa có nội dung kết quả để copy! Hãy bấm nút quét trước.');
        return;
      }

      try {
        await navigator.clipboard.writeText(val);
        copyBtn.classList.add('copied');
        copyText.textContent = '✓ Đã copy vào Clipboard!';

        setTimeout(() => {
          copyBtn.classList.remove('copied');
          copyText.textContent = 'Copy kết quả';
        }, 2500);
      } catch (err) {
        outputEl.select();
        document.execCommand('copy');
        alert('Đã copy nội dung kết quả!');
      }
    });

    // Tải file .txt
    document.getElementById('fuo-btn-export-txt').addEventListener('click', () => {
      const outputEl = document.getElementById('fuo-output');
      const val = outputEl ? outputEl.value : '';
      if (!val.trim()) {
        alert('Chưa có nội dung để tải!');
        return;
      }

      const blob = new Blob([val], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `fuoverflow_quizlet_${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });

    // Xóa kết quả
    document.getElementById('fuo-btn-clear').addEventListener('click', () => {
      if (confirm('Bạn có chắc muốn xóa toàn bộ kết quả đã quét không?')) {
        scannedItems = [];
        refreshOutputText();
        updateStatus('Sẵn sàng', 0);
        document.getElementById('fuo-progress-box').style.display = 'none';
      }
    });

    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
      chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'toggle_panel') {
          panel.style.display = panel.style.display === 'none' ? 'flex' : 'none';
          reopenBtn.style.display = panel.style.display === 'none' ? 'inline-flex' : 'none';
          sendResponse({ success: true });
        }
      });
    }

    window.addEventListener('scroll', () => {
      updateImageCount();
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectUI);
  } else {
    injectUI();
  }
})();

// Read the main page text with the browser's computer voice.
(() => {
  const button = document.querySelector('#read-page');
  const status = document.querySelector('#read-status');
  const main = document.querySelector('#main');
  if (!button || !main) return;

  if (!window.speechSynthesis || typeof window.SpeechSynthesisUtterance !== 'function') {
    button.disabled = true;
    status.textContent = 'Reading aloud is not supported by this browser.';
    return;
  }

  const synth = window.speechSynthesis;
  let reading = false;
  let run = 0;
  let currentUtterance = null;

  function setReading(value, message = '') {
    reading = value;
    button.textContent = value ? 'Stop reading' : 'Read this page';
    button.setAttribute('aria-pressed', String(value));
    status.textContent = message;
  }

  function stop() {
    run += 1;
    setReading(false);
    synth.cancel();
    currentUtterance = null;
  }

  function pageText() {
    const copy = main.cloneNode(true);
    copy.querySelectorAll('.read-controls, .slide-controls, nav, footer, script, style, pre, code, [hidden], img').forEach(element => element.remove());
    // Avoid reading reference numbers and image-enlargement instructions repeatedly.
    copy.querySelectorAll('a[href*="references.html#ref-"]').forEach(element => element.remove());
    copy.querySelectorAll('th, td').forEach(element => element.append(', '));
    copy.querySelectorAll('h1, h2, h3, p, li, caption, tr, dt, dd, figcaption').forEach(element => element.append('. '));
    return copy.textContent.replace(/click to enlarge\./gi, '')
      .replace(/\s+/g, ' ').replace(/\.\s*\./g, '.').trim();
  }

  function chunks(text) {
    const result = [];
    let chunk = '';
    for (const word of text.split(/\s+/)) {
      if (chunk && chunk.length + word.length + 1 > 230) {
        result.push(chunk);
        chunk = '';
      }
      chunk += (chunk ? ' ' : '') + word;
      if (chunk.length >= 100 && /[.!?]$/.test(word)) {
        result.push(chunk);
        chunk = '';
      }
    }
    if (chunk) result.push(chunk);
    return result;
  }

  function speak(parts, index, activeRun) {
    if (!reading || activeRun !== run) return;
    if (index >= parts.length) {
      currentUtterance = null;
      setReading(false, 'Finished reading.');
      return;
    }
    const utterance = new SpeechSynthesisUtterance(parts[index]);
    currentUtterance = utterance; // Keep a reference until this chunk finishes.
    utterance.lang = 'en-US';
    utterance.rate = 1;
    const voices = synth.getVoices();
    const english = voices.filter(voice => /^en\b/i.test(voice.lang));
    const voice = english.find(voice => voice.default) || english[0];
    if (voice) utterance.voice = voice;
    utterance.onend = () => speak(parts, index + 1, activeRun);
    utterance.onerror = event => {
      if (activeRun !== run) return;
      run += 1;
      currentUtterance = null;
      setReading(false, 'Could not read aloud. Click the button to try again.');
      synth.cancel();
    };
    synth.speak(utterance);
  }

  button.addEventListener('click', () => {
    if (reading) {
      stop();
      return;
    }
    const parts = chunks(pageText());
    if (!parts.length) {
      status.textContent = 'There is no text to read.';
      return;
    }
    stop();
    setReading(true, 'Reading with a computer voice.');
    speak(parts, 0, run);
  });

  // Stop when leaving, including when a browser restores a page from its cache.
  window.addEventListener('pagehide', stop);
})();

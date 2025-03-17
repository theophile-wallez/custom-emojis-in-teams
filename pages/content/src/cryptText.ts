const selector = '[id^=content-]';

export const cryptText = (el: HTMLElement) => {
  const text = el.querySelectorAll(selector);

  text.forEach(t => {
    const text = t.textContent;
    if (!text) return;

    // decode from base64
    // const clearMessage = atob(text);
    const clearMessage = text;

    t.innerHTML = `<p style="color: red;">${clearMessage}</p>`;
  });
};

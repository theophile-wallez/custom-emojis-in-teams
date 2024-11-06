const allTrs = document.querySelectorAll('tr')
function parseTrElements(trNodeList) {
  const records = {};

  Array.from(trNodeList).slice(1).forEach(tr => {  // Skip the first row (header)
    const imgElement = tr.querySelector('img.fluentImage');
    const nameElement = tr.querySelector('td:nth-child(2) p');
    
    // Get the <p> inside the third <td> and extract the last segment of text
    const keyElement = tr.querySelector('td:nth-child(3) p');
    let key = '';
    if (keyElement) {
      const textContent = keyElement.innerText.trim();
      const segments = textContent.split('\n').map(segment => segment.trim());
      key = segments[segments.length - 1]; // Get the last segment after the <br> tag
      key = key.replace(/[()]/g, '');  // Remove parentheses around key
    }

    if (imgElement && nameElement && key) {
      records[key] = {
        src: imgElement.src,
        name: nameElement.textContent
      };
    }
  });

  return records;
}

const res = parseTrElements(allTrs)
res
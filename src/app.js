let highlightedText = '';

function addTextToTwitter(event) {
  highlightedText = textHighlight();
  let coords = getTextCoords(highlightedText);
  showTooltip(highlightedText, coords);
}

function textHighlight() {
  const selection = document.getSelection();
  return selection;
}

function getTextCoords(selection) {
  const range = selection.getRangeAt(0);
  const clientRects = range.getClientRects();
  let coords = {
    topCoord: 0,
    leftCoord: 0,
    rightCoord: 0
  };

  [].forEach.call(clientRects, (currentValue, index) => {
    if (!index) {
      coords.topCoord = currentValue.top;
      coords.leftCoord = currentValue.left;
      coords.rightCoord = currentValue.right;
    } else {
      coords.leftCoord = coords.leftCoord < currentValue.left ? coords.leftCoord : currentValue.left;
      coords.rightCoord = coords.rightCoord > currentValue.right ? coords.rightCoord : currentValue.right;
    }
  });

  return coords;
}

function showTooltip(selection, coords) {
  let tooltip = document.querySelector('.tooltip');

  changeTooltipCoords(tooltip, coords);

  if (selection.toString().length) {
    tooltip.style.visibility = "visible";
  } else {
    tooltip.style.visibility = "hidden";
  }

  function changeTooltipCoords(element, coords) {
    const textWindowEl = window.getComputedStyle(document.querySelector('.text'));

    //element.style.left = (window.innerWidth - coords.rightCoord - coords.leftCoord) / 2 + 'px'; //coords.leftCoord - (window.innerWidth - textWindowEl.width) / 2

    element.style.left = coords.leftCoord - (window.innerWidth - parseInt(textWindowEl.width)) / 2 + (coords.rightCoord - coords.leftCoord) / 2 - 25 + 'px';
    element.style.top = coords.topCoord - 118 + 'px';
  }
}

function openTwitterWindow() {
  const width = 600;
  const height = 450;

  const left = window.outerWidth - width > 0 ? (window.outerWidth - width) / 2 : 0;
  const top = window.outerHeight - height > 0 ? (window.outerHeight - height) / 2 : 0;
  window.open(`https://twitter.com/intent/tweet?text=${highlightedText}`, 'popup', `width=${width},height=${height},left=${left},top=${top},scrollbars=no,resizable=no`);
}

document.querySelector('.tooltip').addEventListener("click", openTwitterWindow);

document.onmouseup = addTextToTwitter;

if (!document.all) document.captureEvents(Event.MOUSEUP);

if (module.hot) {
  module.hot.accept();
}

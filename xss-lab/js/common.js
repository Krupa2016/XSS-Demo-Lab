// common.js
// Shared helper loaded on every lab page.
// It wraps window.alert so that when a payload the user injects calls
// alert(...), we can (a) still show the real browser alert so it "feels"
// like a real XSS pop, and (b) flip a visible "Payload Executed" flag on
// the page so learners get immediate positive feedback without needing
// dev tools open.

(function () {
  const nativeAlert = window.alert.bind(window);

  window.alert = function (msg) {
    markFlag();
    return nativeAlert(msg);
  };

  function markFlag() {
    const flag = document.getElementById("xss-flag");
    if (flag) {
      flag.style.display = "block";
    }
    window.dispatchEvent(new CustomEvent("xss-lab-success"));
  }

  // expose a manual trigger too, in case a learner's payload doesn't use alert()
  // e.g. document.title change, image onerror, etc. Payloads can call
  // window.xssLabSuccess() directly, or labs can watch other signals.
  window.xssLabSuccess = markFlag;
})();

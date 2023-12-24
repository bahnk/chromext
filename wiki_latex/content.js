
function extractLatex() {
   const formulas = [];
   const images = document.querySelectorAll("img");
   for (let img of images) {
      if (img.alt && img.className.includes("mwe-math-fallback-image-inline")) {
         formulas.push(img.alt);
      }
   }
   return formulas;
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
   if (msg.text === "extract_latex") {
      const latexFormulas = extractLatex();
      console.log(latexFormulas);
      chrome.runtime.sendMessage({
         action: "save",
         data: latexFormulas,
         title: document.title.replace(/ - Wikipedia$/, "")
      });
      console.log("message passed");
   }
});

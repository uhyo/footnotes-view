const refs = document.querySelectorAll("a.ref");
console.log(refs);

const intersectingSet = new Set();

{
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const refId = Number(entry.target.getAttribute("href").slice(4));
      if (entry.isIntersecting) {
        intersectingSet.add(refId);
      } else {
        intersectingSet.delete(refId);
      }
    }
    if (document.startViewTransition) {
      document.startViewTransition(updateFootnotes);
    } else {
      updateFootnotes();
    }
  });

  for (const ref of refs) {
    observer.observe(ref);
  }

  function updateFootnotes() {
    console.log("update", Array.from(intersectingSet));
    const footer = document.querySelector("footer");
    const footnotes = document.querySelectorAll("p.footnote");
    footnotes.forEach((footnote) => {
      const refId = Number(footnote.getAttribute("id").slice(8));
      if (intersectingSet.has(refId)) {
        footnote.setAttribute("data-visible", "");
      } else {
        footnote.removeAttribute("data-visible");
      }
    });
    if (intersectingSet.size > 0) {
      footer.setAttribute("data-visible", "");
    } else {
      footer.removeAttribute("data-visible");
    }
  }
}
{
  const footer = document.querySelector("footer");
  const footerMarker = document.querySelector("#footer-top-marker");
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        footer.classList.add("static");
      } else {
        footer.classList.remove("static");
      }
    }
  });
  observer.observe(footerMarker);
}

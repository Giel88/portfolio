window.reinitialiseWebflow = function(nextContainer) {
  const pageId = nextContainer.dataset.wfPage;
  if (pageId) document.documentElement.setAttribute('data-wf-page', pageId);

  if (window.Webflow) {
    window.Webflow.destroy();
    window.Webflow.ready();
    if (window.Webflow.require) window.Webflow.require('ix2').init(nextContainer);
  }
};

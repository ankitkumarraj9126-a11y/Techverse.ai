chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "analyze") {
    // Basic analysis logic for demo
    const links = document.querySelectorAll('a').length;
    const headings = document.querySelectorAll('h1, h2, h3').length;
    console.log(`[TechVerse AI] Analyzed page: ${links} links, ${headings} headings.`);
    sendResponse({ success: true, data: { links, headings } });
  } 
  
  if (request.action === "extract") {
    // Basic extraction logic
    const title = document.title;
    const url = window.location.href;
    const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    
    const leadData = {
      company: title.split('-')[0].trim() || 'Unknown Company',
      website: url,
      description: description,
      source: 'Browser Agent'
    };
    
    console.log('[TechVerse AI] Extracted Lead:', leadData);
    // In production, this would make an API call to localhost:8000
    
    sendResponse({ success: true, lead: leadData });
  }
  return true;
});

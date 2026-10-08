document.addEventListener('DOMContentLoaded', () => {
  const currentUrlEl = document.getElementById('currentUrl');
  const analyzeBtn = document.getElementById('analyzeBtn');
  const saveBtn = document.getElementById('saveBtn');
  const dashboardBtn = document.getElementById('dashboardBtn');

  // Get current active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (tab && tab.url) {
      try {
        const url = new URL(tab.url);
        currentUrlEl.textContent = url.hostname;
      } catch (e) {
        currentUrlEl.textContent = tab.url;
      }
    }
  });

  analyzeBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "analyze" }, (response) => {
        analyzeBtn.textContent = "Analyzed!";
        setTimeout(() => analyzeBtn.textContent = "Analyze Page", 2000);
      });
    });
  });

  saveBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "extract" }, (response) => {
        // Here we would normally send to local backend
        saveBtn.textContent = "Saved!";
        setTimeout(() => saveBtn.textContent = "Save as Lead", 2000);
      });
    });
  });

  dashboardBtn.addEventListener('click', () => {
    chrome.tabs.create({ url: "http://localhost:3000/dashboard" });
  });
});

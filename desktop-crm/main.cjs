const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1050,
    minHeight: 700,
    backgroundColor: '#f6f2ef',
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  win.loadFile(path.join(__dirname, 'crm.html'));

  win.webContents.on('did-finish-load', () => {
    win.webContents.executeJavaScript(`
      (() => {
        const btn = document.getElementById('crmConnectBtn');
        if (!btn || btn.dataset.elaivaPatched === '1') return;
        btn.dataset.elaivaPatched = '1';

        btn.addEventListener('click', (event) => {
          event.preventDefault();
          event.stopImmediatePropagation();

          const old = document.getElementById('elaivaCrmKeyModal');
          if (old) old.remove();

          const modal = document.createElement('div');
          modal.id = 'elaivaCrmKeyModal';
          modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;padding:20px;z-index:99999;font-family:Arial,sans-serif;';
          modal.innerHTML = \`
            <div style="width:min(460px,100%);background:#fff;border-radius:16px;padding:24px;box-shadow:0 20px 70px rgba(0,0,0,.3);">
              <div style="font:italic bold 22px Georgia,serif;margin-bottom:8px;color:#292426;">🔐 Σύνδεση Leads</div>
              <div style="font-size:13px;color:#81777a;margin-bottom:16px;">Βάλε το CRM API key για να φορτώσεις τα leads του website.</div>
              <input id="elaivaCrmKeyInput" type="password" autocomplete="off" placeholder="CRM API key" style="width:100%;box-sizing:border-box;padding:12px;border:1px solid #e7dfe0;border-radius:9px;outline:none;font-size:14px;">
              <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">
                <button id="elaivaCrmCancel" style="border:0;border-radius:9px;padding:10px 14px;background:#e9e1e2;color:#292426;cursor:pointer;">Άκυρο</button>
                <button id="elaivaCrmSave" style="border:0;border-radius:9px;padding:10px 14px;background:#8d6673;color:#fff;cursor:pointer;">Σύνδεση</button>
              </div>
            </div>\`;
          document.body.appendChild(modal);

          const input = document.getElementById('elaivaCrmKeyInput');
          const close = () => modal.remove();
          document.getElementById('elaivaCrmCancel').onclick = close;
          document.getElementById('elaivaCrmSave').onclick = () => {
            const key = input.value.trim();
            if (!key) {
              input.focus();
              return;
            }
            localStorage.setItem('elaiva_crm_api_key', key);
            close();
            if (typeof window.loadRemoteLeads === 'function') window.loadRemoteLeads();
            else if (typeof window.show === 'function') window.show('leads');
          };
          input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') document.getElementById('elaivaCrmSave').click();
            if (e.key === 'Escape') close();
          });
          input.focus();
        }, true);
      })();
    `).catch(() => {});
  });

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

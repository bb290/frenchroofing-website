import { chromium } from 'playwright';
const b = await chromium.launch();
const pg = await b.newPage({ viewport: { width: 1100, height: 1400 } });
await pg.goto('https://www.sagareus.com/proposal?email=bbfrench206@gmail.com', { waitUntil: 'domcontentloaded', timeout: 60000 });
await pg.waitForSelector('.saga-pr-prefs:not([hidden])', { timeout: 25000 });
await pg.waitForTimeout(500);
console.log('term rows:', await pg.$$eval('.saga-pr-termrows h3', els => els.map(e => e.textContent)));
console.log('prefs is own card:', await pg.$eval('[id^="saga-pr-prefs"]', e => e.classList.contains('saga-pr-card')));
console.log('prefs heading/sub:', await pg.$eval('[id^="saga-pr-prefs"] h2', e => e.textContent), '|', await pg.$eval('[id^="saga-pr-prefs"] .saga-pr-sub', e => e.textContent.slice(0, 50)));
// autosave sanity after restructure
await pg.selectOption('select[id^="saga-pr-tdispatch"]', 'Dispatch');
await pg.waitForFunction(() => { const s = document.querySelector('.saga-pr-prefstatus'); return s && !s.hidden && s.classList.contains('is-ok'); }, { timeout: 15000 });
await pg.selectOption('select[id^="saga-pr-tdispatch"]', 'Dispatch + Notify');
await pg.waitForTimeout(1200);
console.log('autosave OK');
const t = pg.locator('.saga-pr-termrows').locator('xpath=ancestor::div[contains(@class,"saga-pr-card")]');
await t.screenshot({ path: '/private/tmp/claude-501/-Users-unbound24-Unbound/315604d9-be06-4c04-91eb-4c8b6fbb33e3/scratchpad/keyterms.png' });
await pg.locator('[id^="saga-pr-prefs"]').screenshot({ path: '/private/tmp/claude-501/-Users-unbound24-Unbound/315604d9-be06-4c04-91eb-4c8b6fbb33e3/scratchpad/prefs-card.png' });
await b.close();

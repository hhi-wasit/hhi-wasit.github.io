// Inject shared header and footer
function renderHeader(activePage) {
  const pages = [
    { href: 'index.html',       label: 'الرئيسية' },
    { href: 'departments.html', label: 'الأقسام' },
    { href: 'news.html',        label: 'الأخبار' },
    { href: 'theses.html',      label: 'رسائل التخرج' },
    { href: 'bulletin.html',    label: 'مجلة المعهد' },
    { href: 'about.html',       label: 'عن المعهد' },
    { href: 'contact.html',     label: 'اتصل بنا' },
  ];
  const links = pages.map(p =>
    `<li><a href="${p.href}"${p.href === activePage ? ' class="active"' : ''}>${p.label}</a></li>`
  ).join('');

  document.getElementById('site-header').innerHTML = `
    <div class="header-inner">
      <a href="index.html" class="logo-wrap" style="text-decoration:none">
        <img src="images/logo.jpg" alt="HHI Wasit Logo"
             style="width:44px;height:44px;border-radius:8px;object-fit:cover;flex-shrink:0;">
        <div class="logo-text">
          المعهد الصحي العالي
          <span>واسط · العراق</span>
        </div>
      </a>
      <div style="display:flex;align-items:center;gap:1rem">
        <button class="mobile-btn" id="mobileBtn"><i class="fas fa-bars"></i></button>
      </div>
      <nav id="mainNav">
        <ul>${links}</ul>
      </nav>
    </div>`;

  const btn = document.getElementById('mobileBtn');
  const nav = document.getElementById('mainNav');
  if (btn && nav) {
    btn.addEventListener('click', () => {
      nav.classList.toggle('open');
      const icon = btn.querySelector('i');
      icon.className = nav.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
    });
  }
}

function renderFooter() {
  const mr = 'margin-left';
  document.getElementById('site-footer').innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <div style="display:flex;align-items:center;gap:.7rem;margin-bottom:1rem">
            <img src="images/logo.jpg" alt="HHI Wasit Logo"
                 style="width:44px;height:44px;border-radius:8px;object-fit:cover;flex-shrink:0;">
            <div style="color:#fff;font-weight:700;line-height:1.2">
              المعهد الصحي العالي<br>
              <span style="font-size:.75rem;font-weight:400;color:#9ca3af">واسط، العراق</span>
            </div>
          </div>
          <p>تأهيل جيل من المهنيين الصحيين في التمريض والطوارئ والقبالة والتخدير.</p>
          <div class="social-row">
            <a href="#" class="social-btn"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social-btn"><i class="fab fa-twitter"></i></a>
            <a href="mailto:info@hhi-wasit.edu.iq" class="social-btn"><i class="fas fa-envelope"></i></a>
          </div>
        </div>
        <div class="footer-col">
          <h4>روابط سريعة</h4>
          <ul>
            <li><a href="index.html">الرئيسية</a></li>
            <li><a href="departments.html">الأقسام</a></li>
            <li><a href="news.html">الأخبار</a></li>
            <li><a href="theses.html">رسائل التخرج</a></li>
            <li><a href="bulletin.html">مجلة المعهد</a></li>
            <li><a href="about.html">عن المعهد</a></li>
            <li><a href="contact.html">اتصل بنا</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>الأقسام</h4>
          <ul>
            <li><a href="departments.html#nursing">التمريض</a></li>
            <li><a href="departments.html#emergency">طب الطوارئ</a></li>
            <li><a href="departments.html#midwifery">القبالة</a></li>
            <li><a href="departments.html#anesthesia">التخدير</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>اتصل بنا</h4>
          <p><i class="fas fa-map-marker-alt" style="color:var(--teal-light);${mr}:.5rem"></i>الكوت، محافظة واسط، العراق</p>
          <p><i class="fas fa-phone" style="color:var(--teal-light);${mr}:.5rem"></i>+964 23 123 4567</p>
          <p><i class="fas fa-envelope" style="color:var(--teal-light);${mr}:.5rem"></i><a href="mailto:info@hhi-wasit.edu.iq">info@hhi-wasit.edu.iq</a></p>
          <p style="margin-top:1rem"><a href="admin.html" style="color:#9ca3af;font-size:.8rem"><i class="fas fa-lock" style="${mr}:.3rem"></i>بوابة الإدارة</a></p>
        </div>
      </div>
     <div class="footer-bottom">
  <p>&copy; ${new Date().getFullYear()} Dr. Ahmed Azeez. All rights reserved.</p>
</div>

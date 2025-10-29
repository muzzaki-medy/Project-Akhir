// project.js (cleaned & reorganized)
// Wrap everything so the DOM is ready before we query elements
document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // ========== SIDEMENU ===========
  // ===============================
  const menuBtn = document.getElementById('menu-btn');
  const sideMenu = document.getElementById('side-menu');

  if (menuBtn && sideMenu) {
    menuBtn.addEventListener('click', () => {
      sideMenu.classList.toggle('open');
      menuBtn.textContent = sideMenu.classList.contains('open') ? '✕' : '☰';
    });

    document.querySelectorAll('.side-menu a').forEach(link => {
      link.addEventListener('click', () => {
        sideMenu.classList.remove('open');
        menuBtn.textContent = '☰';
      });
    });
  }

  // mark page loaded (fade-in)
  document.body.classList.add('fade-in');

  // ===============================
  // ====== SCROLL / FADE-UP =======
  // ===============================
  const fadeUpElements = document.querySelectorAll('.fade-up');
  function handleScroll() {
    fadeUpElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add('visible');
      }
    });
  }
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // ===============================
  // ======= HERO PARALLAX =========
  // ===============================
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      hero.style.backgroundPositionY = `${scrollY * 0.4}px`;
    });
  }

  // ===============================
  // ====== CUSTOM CURSOR ==========
  // ===============================
  const cursorCircle = document.createElement('div');
  cursorCircle.style.position = 'fixed';
  cursorCircle.style.width = '25px';
  cursorCircle.style.height = '25px';
  cursorCircle.style.border = '2px solid rgba(186, 152, 214, 0.7)';
  cursorCircle.style.borderRadius = '50%';
  cursorCircle.style.pointerEvents = 'none';
  cursorCircle.style.transition = 'transform 0.15s ease, opacity 0.3s ease';
  cursorCircle.style.zIndex = '9999';
  cursorCircle.style.opacity = '0.8';
  document.body.appendChild(cursorCircle);

  document.addEventListener('mousemove', e => {
    cursorCircle.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px) scale(1)`;
  });
  document.addEventListener('mousedown', () => {
    // scale down briefly on click
    cursorCircle.style.transform += ' scale(0.7)';
  });
  document.addEventListener('mouseup', () => {
    cursorCircle.style.transform = cursorCircle.style.transform.replace('scale(0.7)', 'scale(1)');
  });

  // ===============================
  // ===== SMOOTH INTERNAL LINKS ===
  // ===============================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===============================
  // ===== PRODUCT CARD TILT =======
  // ===============================
  const cards = Array.from(document.querySelectorAll('.product-card')); // single declaration
  if (cards.length) {
    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        // small tilt
        const rotateY = (x - rect.width / 2) / 25;
        const rotateX = -(y - rect.height / 2) / 25;
        card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateY(0deg) rotateX(0deg)';
      });
    });
  }

// ===============================
// ========== ORDER FORM =========
// ===============================
document.getElementById("orderForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // Ambil nilai input
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const product = document.getElementById("product").value;
  const quantity = document.getElementById("quantity").value;
  const pickup = document.getElementById("pickup").value; 
  const notes = document.getElementById("notes").value.trim();

  // Validasi sederhana
  if (!name || !phone || !product || !quantity || !pickup) {
    alert("Harap isi semua data yang wajib diisi!");
    return;
  }

  // Format pesan WhatsApp
  const message = `
Halo Ralitha Dessert 👋
Saya ingin memesan produk berikut:

- Nama: ${name}
- No. WhatsApp: ${phone}
- Produk: ${product}
- Jumlah: ${quantity}
- Tanggal Ambil: ${pickup}
- Catatan: ${notes || "-"}

Terima kasih!
  `.trim();

  // Encode pesan ke URL
  const encodedMessage = encodeURIComponent(message);
  const waNumber = "6287775128658"; // Nomor toko kamu

  // Arahkan ke WhatsApp
  const waLink = `https://wa.me/${waNumber}?text=${encodedMessage}`;
  window.open(waLink, "_blank");
});

orderForm.classList.add("highlight");
setTimeout(() => orderForm.classList.remove("highlight"), 2000);


  // ===============================
  // ======= TOAST (welcome) ======
  // ===============================
  function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '40px';
    toast.style.right = '30px';
    toast.style.background = '#b896d6';
    toast.style.color = 'white';
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '25px';
    toast.style.boxShadow = '0 6px 15px rgba(0,0,0,0.2)';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.5s ease';
    document.body.appendChild(toast);

    setTimeout(() => toast.style.opacity = '1', 50);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }

  window.addEventListener('load', () => {
    showToast("🍰 Welcome to Ralitha Dessert!");
  });

  // ===============================
  // ====== HERO TYPING TEXT =======
  // ===============================
  const heroText = document.querySelector('.hero-content h2');
  if (heroText) {
    const fullText = heroText.textContent.trim();
    heroText.textContent = '';
    let index = 0;
    function typeText() {
      if (index < fullText.length) {
        heroText.textContent += fullText.charAt(index);
        index++;
        setTimeout(typeText, 70);
      }
    }
    setTimeout(typeText, 600);
  }

  // ===============================
  // ===== LAZY LOAD IMAGES ========
  // ===============================
  const productImages = document.querySelectorAll('.product-card img');
  if (productImages.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('visible');
          observer.unobserve(img);
        }
      });
    }, { threshold: 0.2 });

    productImages.forEach(img => {
      img.classList.add('lazy-image');
      observer.observe(img);
    });
  }

  // ===============================
  // ===== ABOUT WORD FADE-IN ======
  // ===============================
  const aboutSection = document.querySelector('.about-section p');
  if (aboutSection) {
    const text = aboutSection.textContent.trim().split(' ');
    aboutSection.textContent = '';
    text.forEach((word, i) => {
      const span = document.createElement('span');
      span.textContent = word;
      const space = document.createTextNode(' ');
      aboutSection.appendChild(span);
      aboutSection.appendChild(space);
      span.style.opacity = 0;
      span.style.transition = `opacity 0.4s ease ${i * 0.08}s`;
      aboutSection.appendChild(span);
    });

    const aboutObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          aboutSection.querySelectorAll('span').forEach(span => {
            span.style.opacity = 1;
          });
          aboutObserver.unobserve(aboutSection);
        }
      });
    }, { threshold: 0.2 });

    aboutObserver.observe(aboutSection);
  }

  // ===============================
  // ====== PRODUCTS DATA ==========
  // ===============================
  const products = [
    { name: "Salad Buah",desc: "Segar dan manis dengan campuran buah pilihan dan yogurt lembut.", image: "project image/image1.png" },
    { name: "Es Kopyor", desc: "Minuman es kopyor asli dengan sirup cocopandan dan kelapa muda.", image: "project image/image2.png" },
    { name: "Puding Buah", desc: "Perpaduan buah segar dan puding lembut dengan aroma vanilla.", image: "project image/image3.png" },
    { name: "Puding Brownies", desc: "Perpaduan brownies lembut dan puding coklat premium yang manis pas.", image: "project image/image4.png" },
    { name: "Puding Caramel", desc: "Puding lembut dengan lapisan caramel manis dan wangi khas vanilla.", image: "project image/image5.png" },
    { name: "Singkong Thailand", desc: "Singkong empuk dengan saus santan kental manis dan gurih khas Thailand.", image: "project image/image6.png" },
    { name: "Roti Pisang Coklat", desc: "Roti lembut berisi potongan pisang dan lelehan coklat nikmat.", image: "project image/image7.png" },
    { name: "Bolu Pisang", desc: "Bolu pisang lembut dan harum, cocok untuk teman teh soremu.", image: "project image/image8.png" },
    { name: "Roti Lembut Savory", desc: "Roti asin lembut dengan topping keju dan daging asap gurih.", image: "project image/image9.png" },
    { name: "Makaroni Sekutel", desc: "Makaroni kering gurih pedas khas Ralitha Dessert yang bikin nagih.", image: "project image/image10.png" }
  ];

  // ===============================
  // ===== MODAL PRODUCT HANDLER ===
  // ===============================
  const modal = document.getElementById("product-modal");
  if (!modal) {
    console.warn("product-modal container not found in HTML. Add <div id=\"product-modal\" class=\"product-modal\"></div> before </body>");
  } else {
    // attach click listeners to cards (only if not previously attached)
    cards.forEach((card, index) => {
      // safety: check card exists
      if (!card) return;
      card.addEventListener("click", () => {
        const p = products[index] || { name: "Produk", desc: "Deskripsi belum tersedia.", image: "" };

        modal.innerHTML = `
          <div class="modal-content">
            <span class="close-btn" aria-label="close">&times;</span>
            ${p.image ? `<img src="${p.image}" alt="${p.name}" class="modal-image">` : ''}
            <h3>${p.name}</h3>
            <p>${p.desc}</p>
            <button id="order-btn">Pesan Sekarang</button>
          </div>
        `;
        modal.classList.add("open");

        // close
        modal.querySelector(".close-btn").addEventListener("click", () => {
          modal.classList.remove("open");
        });

        // scroll langsung ke form pemesanan di bawah
        modal.querySelector("#order-btn").addEventListener("click", () => {
          modal.classList.remove("open");
          const orderForm = document.getElementById("orderForm");
          if (orderForm) {
            orderForm.scrollIntoView({ behavior: "smooth" });
       }
      });

      });
    });
  }

}); // end DOMContentLoaded
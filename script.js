
const CONFIG = {
  paymentGatewayUrl: "https://rzp.io/rzp/0epGCVnM", // e.g., https://rzp.io/l/your-link or Instamojo/Stripe URL
  ebookDownloadUrl: "https://res.cloudinary.com/ghfbabxs/image/upload/v1786959955/12_month_placement_transformation_ABDUL_MAAZ_MURTAZA_attractive_cover.pdf",   // Hosted PDF URL (Google Drive, AWS S3, etc.)
  ebookCoverUrl: "BOOK_COVER_IMAGE_URL",     // Direct image URL for book cover
  authorImageUrl: "AUTHOR_IMAGE_URL",       // Direct image URL for author photo
  supportEmail: "abdulmaaz0522@gmail.com",             // e.g., support@yourdomain.com
  price: "₹99"                            // e.g., ₹99
};

document.addEventListener("DOMContentLoaded", () => {
  // 1. Inject Configured Price into DOM
  const priceElements = document.querySelectorAll(".js-price-display");
  priceElements.forEach(el => {
    el.textContent = CONFIG.price;
  });

  // 2. Wire up Buy Buttons to Payment Gateway
  const buyButtons = document.querySelectorAll(".js-buy-btn");
  buyButtons.forEach(btn => {
    btn.setAttribute("href", CONFIG.paymentGatewayUrl);
    // Open payment gateway in the same or new tab as needed
    btn.setAttribute("target", "_self");
  });

  // 3. Wire up Thank You Page Download Links
  const downloadButtons = document.querySelectorAll(".js-download-btn");
  downloadButtons.forEach(btn => {
    btn.setAttribute("href", CONFIG.ebookDownloadUrl);
  });

  // 4. Wire up Support Email
  const supportEmailLinks = document.querySelectorAll(".support-email-link");
  supportEmailLinks.forEach(link => {
    link.setAttribute("href", `mailto:${CONFIG.supportEmail}`);
    link.textContent = CONFIG.supportEmail;
  });

  // 5. Wire up Dynamic Images if Provided
  const bookCoverImg = document.querySelector(".book-cover-img");
  if (bookCoverImg && CONFIG.ebookCoverUrl !== "BOOK_COVER_IMAGE_URL") {
    bookCoverImg.src = CONFIG.ebookCoverUrl;
  }

  const authorPhoto = document.querySelector(".author-photo");
  if (authorPhoto && CONFIG.authorImageUrl !== "AUTHOR_IMAGE_URL") {
    authorPhoto.src = CONFIG.authorImageUrl;
  }

  // 6. Accessible FAQ Accordion
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      const isActive = item.classList.contains("active");

      // Close all other accordion items
      document.querySelectorAll(".faq-item").forEach(el => el.classList.remove("active"));

      // Toggle current
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });

  // 7. Subtle Scroll Reveal (Lightweight Vanilla Implementation)
  const revealElements = document.querySelectorAll(
    ".problem-card, .phase-card, .feature-card, .month-item, .tracker-item, .page-card, .trust-item"
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition = "opacity 0.4s ease-out, transform 0.4s ease-out";
    observer.observe(el);
  });
});
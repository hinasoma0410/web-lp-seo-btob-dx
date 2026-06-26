const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav a");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const floatingContact = document.querySelector(".floating-contact");
const contactSection = document.querySelector("#contact");

function updateFloatingContact() {
  const contactTop = contactSection.getBoundingClientRect().top;
  const isContactVisible = contactTop < window.innerHeight;

  floatingContact.style.opacity = isContactVisible ? "0" : "1";
  floatingContact.style.pointerEvents = isContactVisible ? "none" : "auto";
}

window.addEventListener("scroll", updateFloatingContact, { passive: true });
window.addEventListener("resize", updateFloatingContact);
updateFloatingContact();

const copyEmailButton = document.querySelector("[data-copy-email]");
const copyStatus = document.querySelector(".copy-status");

if (copyEmailButton) {
  copyEmailButton.addEventListener("click", async () => {
    const email = copyEmailButton.dataset.copyEmail;

    try {
      await navigator.clipboard.writeText(email);
      copyStatus.textContent = "メールアドレスをコピーしました。";
    } catch (error) {
      copyStatus.textContent = `コピーできない場合は、${email} 宛にご連絡ください。`;
    }
  });
}

const testimonialTrack = document.querySelector(".testimonial-track");

if (testimonialTrack) {
  const testimonialCards = Array.from(testimonialTrack.children);

  testimonialCards.forEach((card) => {
    testimonialTrack.appendChild(card.cloneNode(true));
  });

  let testimonialOffset = 0;
  let testimonialSpeed = 0.35;

  testimonialTrack.addEventListener("mouseenter", () => {
    testimonialSpeed = 0;
  });

  testimonialTrack.addEventListener("mouseleave", () => {
    testimonialSpeed = 0.35;
  });

  function moveTestimonials() {
    const resetPoint = testimonialTrack.scrollWidth / 2;
    testimonialOffset += testimonialSpeed;

    if (testimonialOffset >= resetPoint) {
      testimonialOffset = 0;
    }

    testimonialTrack.style.transform = `translateX(-${testimonialOffset}px)`;
    requestAnimationFrame(moveTestimonials);
  }

  moveTestimonials();
}

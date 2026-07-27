const whatsappNumber = "41783201099";

function openWhatsApp(message) {
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

function sendQuote(event) {
  event.preventDefault();
  const message = `Bonjour Garage Sica Vevey,

Je souhaite demander un devis.

Nom : ${document.getElementById("quote-name").value}
Téléphone : ${document.getElementById("quote-phone").value}
Véhicule : ${document.getElementById("quote-car").value}
Demande : ${document.getElementById("quote-message").value}

Merci.`;
  openWhatsApp(message);
}

function sendAppointment(event) {
  event.preventDefault();
  const message = `Bonjour Garage Sica Vevey,

Je souhaite prendre un rendez-vous.

Nom : ${document.getElementById("appt-name").value}
Téléphone : ${document.getElementById("appt-phone").value}
Véhicule : ${document.getElementById("appt-car").value}
Service : ${document.getElementById("appt-service").value}
Date souhaitée : ${document.getElementById("appt-date").value}
Heure souhaitée : ${document.getElementById("appt-time").value}

Merci de me confirmer la disponibilité.`;
  openWhatsApp(message);
}
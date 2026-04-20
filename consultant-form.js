const consultantParams = new URLSearchParams(window.location.search);
const consultantProduct = consultantParams.get("product");
const consultantSource = consultantParams.get("source");

const consultantForm = document.getElementById("consultantForm");
const leadProduct = document.getElementById("leadProduct");
const leadQtr = document.getElementById("leadQtr");
const leadName = document.getElementById("leadName");
const leadNumber = document.getElementById("leadNumber");
const leadEmail = document.getElementById("leadEmail");
const leadNote = document.getElementById("leadNote");

if (leadProduct && consultantProduct) {
  leadProduct.value = consultantProduct;
}

if (leadNote && consultantSource) {
  leadNote.value = `Source: ${consultantSource}`;
}

if (consultantForm) {
  consultantForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const message = [
      "Hi WOODNEST, I need a sofa consultation.",
      `Name: ${leadName?.value || ""}`,
      `Number: ${leadNumber?.value || ""}`,
      `Email: ${leadEmail?.value || ""}`,
      `QTR: ${leadQtr?.value || ""}`,
      `Product: ${leadProduct?.value || ""}`,
      `Note: ${leadNote?.value || ""}`
    ].join("\n");

    const whatsappUrl = `https://wa.me/919832477151?text=${encodeURIComponent(message)}`;
    window.location.href = whatsappUrl;
  });
}

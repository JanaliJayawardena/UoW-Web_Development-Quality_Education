document.addEventListener("DOMContentLoaded", function () {
  //code to runs when the page is loaded
  const informativeRadios = document.querySelectorAll('input[name="informative"]');
  const improvementsSection = document.getElementById("improvements-section");
  const improvementsInput = document.getElementById("improvements");

  informativeRadios.forEach(function (radio) {
    radio.addEventListener("change", function () {
      //if no is selected, the improvements section is displayed
      if (radio.value === "no") {
        improvementsSection.style.display = "block";
        improvementsInput.required = true;
      } else {
        improvementsSection.style.display = "none";
        improvementsInput.required = false;
      }
    });
  });

  const stars = document.querySelectorAll(".star");
  stars.forEach(function (star) {
    star.addEventListener("click", function () {
      const value = star.getAttribute("data-value");
      document.getElementById("star-rating").value = value;
      // Add active class to all stars up to the clicked one
      stars.forEach(function (s) {
        if (parseInt(s.getAttribute("data-value")) <= parseInt(value)) {
          s.classList.add("active");
        } else {
          s.classList.remove("active");
        }
      });
    });
  });
});

const submitBtn = document.getElementById("submit-btn");
const editBtn = document.getElementById("edit-btn");
const previewContainer = document.getElementById("preview-container");
const previewText = document.getElementById("preview-text");
const confirmBtn = document.getElementById("confirm-btn");
const cancelBtn = document.getElementById("cancel-btn");
const feedbackFormContainer = document.getElementById("feedback-form"); //feedback-form-container
const thankYouMessage = document.getElementById("thank-you-message");

// Function to validate name
function validateName(name) {
  // Check each character in the name
  for (let i = 0; i < name.length; i++) {
    let character = name[i];
    // Check if the character is not a letter and not a period
    if (
      !(character.toLowerCase() != character.toUpperCase()) &&
      character !== "." &&
      character !== " "
    ) {
      return false; // Invalid character found
    }
  }
  return true; // All characters are valid
}
submitBtn.addEventListener("click", function () {
  // Get the value of the name input field
  const nameInput = document.getElementById("name");
  const nameValue = nameInput.value.trim();
  // Check if the name field is empty
  if (nameValue === "" || !validateName(nameValue)) {
    // Display an error message for empty name
    alert(
      "Please enter your name using alphabetic characters and periods only."
    );
    return; // Exit the function without generating the preview
  }

  // Get the value of the email input field
  const emailInput = document.getElementById("email");
  const emailValue = emailInput.value.trim();

  // Check if the email field is not empty
  if (emailValue !== "") {
    // Check if the email contains '@' and '.com'
    if (!emailValue.includes("@") || !emailValue.includes(".com")) {
      // Display an error message for invalid email format
      alert("Please enter a valid email address.");
      return; // Exit the function without generating the preview
    }
  }

  // Get the value of the updates select field
  const updatesSelect = document.getElementById("updates");
  const updatesValue = updatesSelect.value;

  // Check if an option is selected for updates
  if (updatesValue === "") {
    // Display an error message
    alert("Please select an option for updates.");
    return; // Exit the function without generating the preview
  }

  // Continue with generating the preview if the name, email, and updates fields are valid

  // Get the form data
  const formData = new FormData(document.getElementById("feedback-form"));

  // Prepare the preview content
  let previewContent = "<h3>Preview:</h3><ul>";

  // Iterate over form data and format it
  for (const [key, value] of formData.entries()) {
    if (key === "star-rating") {
      previewContent += `<li><strong>${key}:</strong> ${"★".repeat(
        parseInt(value)
      )}</li>`;
    } else {
      previewContent += `<li><strong>${key}:</strong> ${value}</li>`;
    }
  }
  previewContent += "</ul>";

  
  // Update the preview container with the formatted content
  previewText.innerHTML = previewContent;

  // Display the preview container
  previewContainer.style.display = "block";
});

confirmBtn.addEventListener("click", function () {
  const formData = new FormData(document.getElementById("feedback-form"));

  // Get the value of the name input field
  const nameInput = document.getElementById("name");
  const nameValue = nameInput.value.trim();

  // Get the value of the email input field
  const emailInput = document.getElementById("email");
  const emailValue = emailInput.value.trim();

  let emailMessage = "";

  // Iterate over form data and format it
  for (const [key, value] of formData.entries()) {
    if (key === "star-rating") {
      emailMessage += `${key}: ${"★".repeat(parseInt(value))}\n`;
    } else {
      emailMessage += `${key}: ${value}\n`;
    }
  }

  var params = {
    name: nameValue,
    message: emailMessage,
    to_email: emailValue,
  };

  const serviceID = "service_5om2zy7";
  const templateID = "template_4fbjsut";

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      console.log(res);
      alert("A copy of responses has been emailed successfully.");
    })
    .catch((err) => console.log(err));

  // Hide the preview container and display the thank you message
  previewContainer.style.display = "none";
  thankYouMessage.style.display = "block";
  feedbackFormContainer.style.display = "none";
});

cancelBtn.addEventListener("click", function () {
  // Code to hide preview and display submit button
  previewContainer.style.display = "none";
  submitBtn.style.display = "inline-block";
  editBtn.style.display = "none";
});

editBtn.addEventListener("click", function () {
  // Code to hide preview, display submit button, and show form
  previewContainer.style.display = "none";
  submitBtn.style.display = "inline-block";
  editBtn.style.display = "none";
  feedbackFormContainer.style.display = "block"; // Show the form
  thankYouMessage.style.display = "none"; // Hide the thank you message
});
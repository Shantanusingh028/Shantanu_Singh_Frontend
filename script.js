document.addEventListener("DOMContentLoaded", function () {
    // Highlight the active navigation link based on current page
    const currentPath = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach((link) => {
      if (link.getAttribute("href") === currentPath) {
        link.classList.add("active");
      }
    });
  
    // About Us page: Toggle extra information
    const moreInfoBtn = document.getElementById("moreInfoBtn");
    if (moreInfoBtn) {
      moreInfoBtn.addEventListener("click", function () {
        const moreInfoDiv = document.getElementById("moreInfo");
        if (moreInfoDiv.classList.contains("hidden")) {
          moreInfoDiv.classList.remove("hidden");
          moreInfoDiv.classList.add("visible");
          moreInfoBtn.textContent = "Show Less";
        } else {
          moreInfoDiv.classList.remove("visible");
          moreInfoDiv.classList.add("hidden");
          moreInfoBtn.textContent = "Learn More";
        }
      });
    }
  
    // Certifications page: Fetch and display badges from Credly
    const certificationsContainer = document.getElementById("certificationsContainer");
    if (certificationsContainer) {
      fetchCertifications();
    }
  });
  
  function fetchCertifications() {
    // This is a hypothetical endpoint.
    // Depending on Credly’s API, you might need to adjust the URL,
    // handle authentication, or work around CORS restrictions (e.g., via a server-side proxy).
    const credlyApiUrl = "https://api.credly.com/v1.1/users/shantanu-singh.809545fa/badges";
  
    fetch(credlyApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok: " + response.statusText);
        }
        return response.json();
      })
      .then((json) => {
        // Assuming the API returns a JSON object with a field "data" that is an array of badge objects.
        // Each badge object is expected to have properties such as "name" and "image_url".
        const badges = json.data;
        const container = document.getElementById("certificationsContainer");
        if (badges && badges.length > 0) {
          badges.forEach((badge) => {
            const badgeDiv = document.createElement("div");
            badgeDiv.className = "badge";
            const img = document.createElement("img");
            // Use the image URL provided by the API or a placeholder if missing.
            img.src = badge.image_url || "https://via.placeholder.com/150?text=Badge";
            img.alt = badge.name || "Certification Badge";
            const caption = document.createElement("p");
            caption.textContent = badge.name || "Unnamed Badge";
            badgeDiv.appendChild(img);
            badgeDiv.appendChild(caption);
            container.appendChild(badgeDiv);
          });
        } else {
          container.innerHTML = "<p>No certifications found.</p>";
        }
      })
      .catch((error) => {
        console.error("Error fetching badges:", error);
        const container = document.getElementById("certificationsContainer");
        container.innerHTML = "<p>Unable to load certifications at this time.</p>";
      });
  }
  
function applyFilters() {
    sb = document.getElementById("searchBox")
    filterTerm = sb.value;
    tb = null;
    var rows = null;
    try { // for update inventory page
        console.log("trying")
        tb =  document.querySelector("#product-container table tbody");
        rows = tb.getElementsByTagName("tr");
    }
    catch (e) { // for all products page
        rows = document.getElementsByClassName("card");
    }
    Array.from(rows).forEach(row => {
        const text = row.textContent.toLowerCase();  // Get all text content from the row and convert to lowercase.
        if (text.includes(filterTerm)) {
            row.style.display = "";  // If the row contains the term, show the row (clear any inline display settings).
        } else {
            row.style.display = "none";  // If the row does not contain the term, hide the row.
        }
    });
  }

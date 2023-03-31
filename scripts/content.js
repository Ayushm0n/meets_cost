console.log("running content");
let guestListElement = document.getElementsByClassName("Rzij1d");
let emailList = [];
function fetchGuestList() {
  guestListElement = document.getElementsByClassName("Rzij1d")?.item(0);
  if (guestListElement) {
    var peopleList = guestListElement?.children;
    let currEmailList = [];
    for (let person of peopleList) {
      if (person.dataset.email) {
        currEmailList.push(person.dataset.email);
      }
    }
    if (emailList !== currEmailList) {
      emailList = currEmailList;
    }
  }
}

function getDisplayDiv() {
  const displayDiv = document.createElement("div");
  displayDiv.style.position = "absolute";
  displayDiv.style.top = "0";
  displayDiv.style.right = "0";
  displayDiv.style.display = "flex";
  displayDiv.style.justifyContent = "center";
  displayDiv.style.alignItems = "center";
  displayDiv.style.padding = "0.5rem";
  return displayDiv;
}

function getCostByEmail(email) {
  return 100;
}

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function (mutations, observer) {
  fetchGuestList();
  if (emailList.length > 0) {
    let totalCost = 0;
    emailList.forEach((email) => {
      const cost = getCostByEmail(email);
      totalCost += cost;

      if (!document.getElementById("cost-chip" + email)) {
        const personRow = document.querySelector(
          "[data-hovercard-id='" + email + "']"
        );
        personRow.style.position = "relative";

        const costChip = getDisplayDiv();
        costChip.id = "cost-chip" + email;
        costChip.innerHTML = "( ₹" + cost + " per hour )";

        personRow.appendChild(costChip);
      } else {
        document.getElementById("cost-chip" + email).innerHTML =
          "( ₹" + cost + " per hour )";
      }
    });

    if (document.getElementById("total-cost-chip")) {
      document.getElementById("total-cost-chip").innerHTML =
        "Total Meeting Cost: ₹ " + totalCost;
    } else {
      const totalCostChip = document.createElement("div");
      totalCostChip.style.width = "100%";
      totalCostChip.style.display = "flex";

      const rupeeIconElement = document.createElement("div");
      rupeeIconElement.innerHTML = "₹";
      rupeeIconElement.style.fontSize = "1.25rem";
      rupeeIconElement.style.color = "rgb(95, 99, 104)";
      rupeeIconElement.style.padding = "0 0 0 28px";
      rupeeIconElement.style.width = "40px";
      rupeeIconElement.style.display = "flex";
      rupeeIconElement.style.alignItems = "center";

      const totalCostChipText = document.createElement("div");
      totalCostChipText.style.fontWeight = "bold";
      totalCostChipText.style.fontSize = "1.2rem";
      totalCostChipText.style.margin = "0.5rem 0";
      totalCostChipText.id = "total-cost-chip";
      totalCostChipText.innerHTML = "Total Cost: ₹" + totalCost;
      totalCostChip.appendChild(rupeeIconElement);
      totalCostChip.appendChild(totalCostChipText);
      guestListElement.parentNode?.insertBefore(
        totalCostChip,
        guestListElement
      );
    }
  }
});

observer.observe(document, {
  subtree: true,
  attributes: true,
});

// Function to load completed bounties
function loadCompletedbounties() {
  const completedbountyList = document.getElementById('completedbountyList');
  // In a real application, you would fetch this data from a server or local storage
  const completedbounties = [
      { id: 1, title: "Customer Satisfaction bounty", completedDate: "2023-05-15" },
      { id: 2, title: "Product Feedback bounty", completedDate: "2023-05-20" }
  ];

  completedbountyList.innerHTML = '';
  completedbounties.forEach(bounty => {
      const li = document.createElement('li');
      li.className = 'bounty-item';
      li.innerHTML = `
          <strong>${bounty.title}</strong><br>
          Completed on: ${bounty.completedDate}
      `;
      completedbountyList.appendChild(li);
  });
}

// Load completed bounties when the page loads
window.addEventListener('load', loadCompletedbounties);

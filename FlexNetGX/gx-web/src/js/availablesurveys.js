// availablebounties.js

// Function to load available bounties
function loadAvailablebounties() {
  const bountyList = document.getElementById('bountyList');
  // In a real application, you would fetch this data from a server
  const availablebounties = [
      { id: 1, title: "Customer Satisfaction bounty" },
      { id: 2, title: "Product Feedback bounty" },
      { id: 3, title: "Website Usability bounty" }
  ];

  bountyList.innerHTML = '';
  availablebounties.forEach(bounty => {
      const li = document.createElement('li');
      li.className = 'bounty-item';
      li.innerHTML = `
          ${bounty.title}
          <button class="take-bounty-btn" data-id="${bounty.id}">Take bounty</button>
      `;
      bountyList.appendChild(li);
  });

  // Add event listeners to buttons
  document.querySelectorAll('.take-bounty-btn').forEach(btn => {
      btn.addEventListener('click', function() {
          const bountyId = this.getAttribute('data-id');
          // Send a message to the parent window to load the bounty
          window.parent.postMessage({type: 'loadbounty', bountyId: bountyId}, '*');
      });
  });
}

// Load bounties when the page loads
window.addEventListener('load', loadAvailablebounties);

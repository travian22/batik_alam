// Menangani navigasi halaman
document.addEventListener("DOMContentLoaded", function() {
    // Set default page to display
    document.getElementById("beranda-page").style.display = "block";
    
    // Simulasi navigasi antara halaman
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute("href").split(".")[0]; // Get 'index', 'tentang', etc.
            
            // Hide all pages
            const pages = document.querySelectorAll("[id$='-page']");
            pages.forEach(page => page.style.display = "none");
            
            // Show target page
            document.getElementById(targetPage + "-page").style.display = "block";
            
            // Update active nav link
            navLinks.forEach(nl => nl.classList.remove("active"));
            this.classList.add("active");
            
            // Scroll to top
            window.scrollTo(0, 0);
        });
    });
    
    // Simulasi navigasi tab di Galeri
    const galleryTabs = document.querySelectorAll("#galleryTab a");
    galleryTabs.forEach(tab => {
        tab.addEventListener("click", function(e) {
            e.preventDefault();
            const targetTab = this.getAttribute("href"); // Get '#produk-tab', etc.
            
            // Hide all tab panes
            document.querySelectorAll(".tab-pane").forEach(pane => {
                pane.classList.remove("show", "active");
            });
            
            // Show target tab pane
            document.querySelector(targetTab).classList.add("show", "active");
            
            // Update active tab
            galleryTabs.forEach(gt => gt.classList.remove("active"));
            this.classList.add("active");
        });
    });
    
    // Form Kontak
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const messageResult = document.getElementById("message-result");
            messageResult.innerHTML = `
                <div class="alert alert-success">
                    <i class="fas fa-check-circle me-2"></i>
                    Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.
                </div>
            `;
            messageResult.style.display = "block";
            this.reset();
        });
    }
    
    // Form Pesanan
    const orderForm = document.getElementById("order-form");
    if (orderForm) {
        orderForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById("orderName").value;
            const product = document.getElementById("orderProduct").value;
            const quantity = document.getElementById("orderQuantity").value;
            
            // Get current date
            const today = new Date();
            const formattedDate = today.toLocaleDateString('id-ID');
            
            // Create new row in table
            const table = document.getElementById("orderTable").getElementsByTagName('tbody')[0];
            const newRow = table.insertRow();
            
            // Insert cells with data
            const rowCount = table.rows.length;
            newRow.insertCell(0).textContent = rowCount;
            newRow.insertCell(1).textContent = formattedDate;
            newRow.insertCell(2).textContent = name;
            newRow.insertCell(3).textContent = product;
            newRow.insertCell(4).textContent = quantity;
            
            const statusCell = newRow.insertCell(5);
            statusCell.innerHTML = '<span class="badge bg-warning">Menunggu Pembayaran</span>';
            
            // Reset form
            this.reset();
            
            // Scroll to table
            document.getElementById("orderTable").scrollIntoView({ behavior: 'smooth' });
            
            // Show alert
            alert("Pesanan Anda telah diproses! Silakan cek email Anda untuk detail pembayaran.");
        });
    }
});

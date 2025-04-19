// File: product-filter.js
// Fungsi untuk menangani pencarian dan filter produk

document.addEventListener("DOMContentLoaded", function() {
    // Dapatkan referensi ke elemen input dan select
    const searchInput = document.getElementById("searchProduct");
    const filterCategory = document.getElementById("filterCategory");
    
    // Pastikan elemen ada di halaman sebelum menambahkan event listener
    if (searchInput && filterCategory) {
        console.log("Filter produk script loaded");
        
        // Event listener untuk pencarian
        searchInput.addEventListener("input", filterProducts);
        
        // Event listener untuk filter kategori
        filterCategory.addEventListener("change", filterProducts);
        
        // Tombol search juga bisa memicu filter
        const searchButton = document.querySelector("#searchProduct + button");
        if (searchButton) {
            searchButton.addEventListener("click", filterProducts);
        }
        
        // Fungsi untuk memfilter produk
        function filterProducts() {
            const searchTerm = searchInput.value.toLowerCase();
            const category = filterCategory.value;
            
            console.log("Filtering products - Search:", searchTerm, "Category:", category);
            
            // Dapatkan semua kartu produk
            const productCards = document.querySelectorAll(".card");
            let visibleCount = 0;
            
            productCards.forEach(card => {
                const cardTitle = card.querySelector(".card-title").textContent.toLowerCase();
                const cardDesc = card.querySelector(".card-text").textContent.toLowerCase();
                const cardCategory = card.querySelector(".badge").textContent.toLowerCase();
                
                // Cek apakah sesuai dengan kata kunci pencarian
                const matchesSearch = cardTitle.includes(searchTerm) || 
                                    cardDesc.includes(searchTerm);
                
                // Cek apakah sesuai dengan kategori yang dipilih
                let matchesCategory = true;
                if (category !== "all") {
                    // Convert kategori dari select ke text yang sesuai dengan badge
                    let categoryText;
                    switch(category) {
                        case "kain": categoryText = "kain batik"; break;
                        case "baju": categoryText = "baju batik"; break;
                        case "aksesoris": categoryText = "aksesoris"; break;
                        default: categoryText = "";
                    }
                    matchesCategory = cardCategory.includes(categoryText);
                }
                
                // Tampilkan kartu jika cocok dengan pencarian dan kategori
                const productContainer = card.closest(".col-md-4");
                if (matchesSearch && matchesCategory) {
                    productContainer.style.display = "block";
                    visibleCount++;
                } else {
                    productContainer.style.display = "none";
                }
            });
            
            // Tambahkan pesan jika tidak ada produk yang ditemukan
            const noResultsMsg = document.getElementById("no-results-message");
            if (visibleCount === 0) {
                if (!noResultsMsg) {
                    const container = document.querySelector(".row:has(.card)").parentNode;
                    const message = document.createElement("div");
                    message.id = "no-results-message";
                    message.className = "alert alert-info mt-3";
                    message.innerHTML = `<i class="fas fa-info-circle me-2"></i>Tidak ada produk yang sesuai dengan pencarian Anda.`;
                    container.appendChild(message);
                }
            } else if (noResultsMsg) {
                noResultsMsg.remove();
            }
        }
    }
});
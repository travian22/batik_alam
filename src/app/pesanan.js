// Tunggu hingga dokumen sepenuhnya dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi array untuk menyimpan pesanan
    let orders = JSON.parse(localStorage.getItem('batikAlamOrders')) || [];
    
    // Referensi ke form dan tabel
    const orderForm = document.getElementById('order-form');
    const orderTable = document.getElementById('orderTable');
    
    // Event listener untuk submit form
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Ambil nilai dari form
            const name = document.getElementById('orderName').value;
            const email = document.getElementById('orderEmail').value;
            const phone = document.getElementById('orderPhone').value;
            const address = document.getElementById('orderAddress').value;
            const product = document.getElementById('orderProduct').value;
            const size = document.getElementById('orderSize').value || 'N/A';
            const quantity = document.getElementById('orderQuantity').value;
            const notes = document.getElementById('orderNotes').value;
            const payment = document.getElementById('orderPayment').value;
            
            // Buat objek pesanan baru
            const newOrder = {
                id: orders.length + 1,
                date: new Date().toLocaleDateString('id-ID'),
                name: name,
                email: email,
                phone: phone,
                address: address,
                product: product,
                size: size,
                quantity: quantity,
                notes: notes,
                payment: payment,
                status: 'Menunggu Pembayaran'
            };
            
            // Tambahkan pesanan baru ke array
            orders.push(newOrder);
            
            // Simpan ke localStorage
            localStorage.setItem('batikAlamOrders', JSON.stringify(orders));
            
            // Perbarui tabel pesanan
            updateOrderTable();
            
            // Reset form
            orderForm.reset();
            
            // Tampilkan pesan sukses
            alert('Pesanan Anda telah berhasil diproses! Silakan cek email untuk informasi lebih lanjut.');
        });
    }
    
    // Fungsi untuk memperbarui tabel pesanan
    function updateOrderTable() {
        if (!orderTable) return;
        
        const tbody = orderTable.querySelector('tbody');
        tbody.innerHTML = '';
        
        if (orders.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="6" class="text-center">Belum ada pesanan</td>';
            tbody.appendChild(row);
            return;
        }
        
        // Tampilkan 5 pesanan terakhir
        const recentOrders = orders.slice(-5).reverse();
        
        recentOrders.forEach((order, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${order.date}</td>
                <td>${order.name}</td>
                <td>${order.product}</td>
                <td>${order.quantity}</td>
                <td><span class="badge bg-warning">${order.status}</span></td>
            `;
            tbody.appendChild(row);
        });
    }
    
    // Inisialisasi tabel pesanan saat halaman dimuat
    updateOrderTable();
});
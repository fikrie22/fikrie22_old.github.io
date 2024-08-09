let categories = {};
let sections = {};

// Fungsi untuk memuat data dari file JSON
async function loadData() {
    try {
        const response = await fetch('../data.json');
        const data = await response.json();
        categories = data.categories;
        sections = data.sections;
        console.log("Data berhasil dimuat:", categories, sections); // Debugging
    } catch (error) {
        console.error("Gagal memuat file JSON:", error);
    }
}

// Fungsi untuk menghasilkan kode NBA
function generateNBA() {
    var input = document.getElementById("input").value;
    var lines = input.split(/\r?\n|\r/); // Membagi input berdasarkan baris baru atau baris
    var output = "";

    lines.forEach(function(line) {
        var parts = line.split(".");
        if (parts.length === 4) {
            var category = "";
            var section = "";

            // Mendapatkan kategori berdasarkan bagian pertama dan kedua
            if (categories[parts[0]] && categories[parts[0]][parts[1]]) {
                category = categories[parts[0]][parts[1]];
            } else {
                output += "Format input tidak valid. Pastikan formatnya adalah X.Y.Z.W\n";
                return;
            }

            // Mendapatkan section berdasarkan bagian ketiga
            if (sections[parts[2]]) {
                section = sections[parts[2]];
            } else {
                output += "Format input tidak valid. Pastikan formatnya adalah X.Y.Z.W\n";
                return;
            }

            // Memodifikasi bagian W sesuai dengan panjangnya
            var wParts = "";
            if (parts[3].length === 3) {
                wParts = parts[3].substring(0, 2) + "." + parts[3].substring(2); // Jika W adalah 3 digit
            } else if (parts[3].length === 2) {
                wParts = parts[3][0] + "." + parts[3][1]; // Jika W adalah 2 digit
            } else if (parts[3].length === 1) {
                wParts = "0." + parts[3]; // Jika W adalah 1 digit, tambahkan "0." di depannya
            }

            var nbaCode = "NBA." + category + "." + section + "." + wParts + "\n";
            output += nbaCode;
        } else {
            output += "Format input tidak valid. Pastikan formatnya adalah X.Y.Z.W\n";
        }
    });
    document.getElementById("output").textContent = output; // Gunakan textContent untuk menghindari pemformatan HTML
}

// Memastikan fungsi dijalankan setelah data terload
window.onload = async function() {
    await loadData();
    document.getElementById("generateBtn").addEventListener("click", generateNBA);
}

function copyOutput() {
    // Mendapatkan elemen output
    var outputElement = document.getElementById('output');
    
    // Mengambil teks dari elemen output
    var text = outputElement.textContent || outputElement.innerText;

    // Membuat elemen sementara untuk menampung teks
    var tempElement = document.createElement('textarea');
    tempElement.value = text;
    document.body.appendChild(tempElement);
    
    // Memilih dan menyalin teks dari elemen sementara
    tempElement.select();
    try {
        var successful = document.execCommand('copy');
        if (successful) {
            alert('Salinan berhasil!');
        } else {
            alert('Salinan gagal!');
        }
    } catch (err) {
        alert('Terjadi kesalahan saat menyalin.');
    }

    // Menghapus elemen sementara dari DOM
    document.body.removeChild(tempElement);
}

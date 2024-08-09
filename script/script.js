function generateNBA() {
    const input = document.getElementById("input").value;
    const lines = input.split(/\r?\n|\r/); // Membagi input berdasarkan baris baru atau baris
    let output = "";

    lines.forEach(line => {
        const parts = line.split(".");
        if (parts.length === 4) {
            const [x, y, z, w] = parts;
            let category;
            if (x === "10") {
                switch (y) {
                    case "13": category = "B1A"; break;
                    case "14": category = "B2A"; break;
                    case "15": category = "B3A"; break;
                    case "19": category = "B1B"; break;
                    case "20": category = "B2B"; break;
                    case "21": category = "B3B"; break;
                    default:
                        output += "Format input tidak valid. Pastikan formatnya adalah X.Y.Z.W\n\n";
                        return;
                }
            } else {
                output += "Format input tidak valid. Pastikan formatnya adalah X.Y.Z.W\n\n";
                return;
            }

            let section;
            switch (z) {
                case "1": section = "A"; break;
                case "2": section = "B"; break;
                case "3": section = "C"; break;
                default:
                    output += "Format input tidak valid. Pastikan formatnya adalah X.Y.Z.W\n\n";
                    return;
            }

            // Memodifikasi bagian W sesuai dengan panjangnya
            const wParts = w.padStart(3, '0').replace(/(\d{2})(\d{1})/, '$1.$2');

            const nbaCode = `NBA.${category}.${section}.${wParts}\n`;
            output += nbaCode + "\n";
        } else {
            output += "Format input tidak valid. Pastikan formatnya adalah X.Y.Z.W\n\n";
        }
    });

    document.getElementById("output").innerText = output.trim();
}

function copyOutput() {
    const outputElement = document.getElementById('output');
    const text = outputElement.textContent || outputElement.innerText;

    // Mengambil teks dari elemen output dan menghapus spasi di awal dan akhir
    const trimmedText = text.trim();

    const tempElement = document.createElement('textarea');
    tempElement.value = trimmedText;
    document.body.appendChild(tempElement);
    
    tempElement.select();
    try {
        const successful = document.execCommand('copy');
        alert(successful ? 'Salinan berhasil!' : 'Salinan gagal!');
    } catch {
        alert('Terjadi kesalahan saat menyalin.');
    }

    document.body.removeChild(tempElement);
}

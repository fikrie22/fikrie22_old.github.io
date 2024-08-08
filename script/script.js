        function generateNBA() {
            var input = document.getElementById("input").value;
            var lines = input.split(/\r?\n|\r/); // Membagi input berdasarkan baris baru atau baris
            var output = "";
            lines.forEach(function(line) {
                var parts = line.split(".");
                if (parts.length === 4) {
                    var category = "";
                    if (parts[0] === "10") {
                        if (parts[1] === "13") {
                            category = "B1A";
                        } else if (parts[1] === "14") {
                            category = "B2A";
                        } else if (parts[1] === "15") {
                            category = "B3A";
                        } else if (parts[1] === "19") {
                            category = "B1B";
                        } else if (parts[1] === "20") {
                            category = "B2B";
                        } else if (parts[1] === "21") {
                            category = "B3B";
                        } else {
                            output += "Format input tidak valid. Pastikan formatnya adalah X.Y.Z.W\n";
                            return;
                        }
                    } else {
                        output += "Format input tidak valid. Pastikan formatnya adalah X.Y.Z.W\n";
                        return;
                    }
                    var section = "";
                    if (parts[2] === "1") {
                        section = "A";
                    } else if (parts[2] === "2") {
                        section = "B";
                    } else if (parts[2] === "3") {
                        section = "C";
                    } else {
                        output += "Format input tidak valid. Pastikan formatnya adalah X.Y.Z.W\n";
                        return;
                    }
                    var nbaCode = "NBA." + category + "." + section + "." + parts[3][0] + "." + parts[3][1] + "\n";
                    output += nbaCode;
                } else {
                    output += "Format input tidak valid. Pastikan formatnya adalah X.Y.Z.W\n";
                }
            });
            document.getElementById("output").innerText = output;
        }

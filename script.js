// ===================================
// 1. MENGAMBIL ELEMEN HTML
// ===================================

const loveForm = document.getElementById("love-form");

const yourNameInput = document.getElementById("your-name");

const partnerNameInput =
    document.getElementById("partner-name");

const anniversaryInput =
    document.getElementById("anniversary");

const formCard = document.getElementById("form-card");

const letterCard = document.getElementById("letter-card");

const greeting = document.getElementById("greeting");

const letterContent =
    document.getElementById("letter-content");

const signature = document.getElementById("signature");

const daysTogether =
    document.getElementById("days-together");

const backButton = document.getElementById("back-button");

const musicButton =
    document.getElementById("music-button");

const loveMusic = document.getElementById("love-music");

const heartContainer =
    document.getElementById("heart-container");


// ===================================
// 2. PENGATURAN MUSIK
// ===================================

// Musik akan diambil dari file lokal.
// Letakkan file musik bernama "musik.mp3"
// di dalam folder "static" yang akan kita buat.

loveMusic.src = "static/musik.mp3";


// ===================================
// 3. MEMBUKA SURAT CINTA
// ===================================

loveForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const yourName = yourNameInput.value.trim();

    const partnerName = partnerNameInput.value.trim();

    const anniversaryValue = anniversaryInput.value;

    if (!yourName || !partnerName || !anniversaryValue) {

        alert("Lengkapi semua data terlebih dahulu, ya ❤️");

        return;
    }

    // Tanggal dipisahkan menjadi tahun, bulan, dan hari.
    // Cara ini menghindari masalah perbedaan zona waktu.

    const parts = anniversaryValue.split("-").map(Number);

    const anniversaryDate = new Date(
        parts[0],
        parts[1] - 1,
        parts[2]
    );

    // Tanggal jadian tidak boleh di masa depan.

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (anniversaryDate > today) {

        alert(
            "Tanggal jadian tidak boleh di masa depan, ya ❤️"
        );

        return;
    }

    // Menampilkan nama pasangan.

    greeting.textContent =
        `Untuk ${partnerName}, seseorang yang kusayangi ❤️`;

    signature.textContent = yourName;

    // Menghitung hari bersama.

    const millisecondsPerDay = 24 * 60 * 60 * 1000;

    const difference =
        today.getTime() - anniversaryDate.getTime();

    const totalDays = Math.floor(
        difference / millisecondsPerDay
    );

    daysTogether.textContent =
        totalDays.toLocaleString("id-ID");

    // Format tanggal jadian.

    const formattedDate = new Intl.DateTimeFormat(
        "id-ID",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    ).format(anniversaryDate);

    // Membuat surat cinta secara otomatis.

    const paragraphs = [

        `Hai ${partnerName}, ❤️`,

        `Terima kasih sudah hadir dalam kehidupanku. Dari sekian banyak orang yang bisa kutemui, aku bersyukur karena kita dipertemukan dan diberi kesempatan untuk saling mengenal.`,

        `Sejak tanggal ${formattedDate}, kita mulai menulis cerita kita sendiri. Sekarang, sudah ${totalDays} hari kita berjalan bersama. Bagiku, setiap hari adalah kesempatan untuk semakin mengenalmu, memahami perasaanmu, dan belajar menjadi seseorang yang lebih baik.`,

        `Aku mungkin bukan orang yang sempurna. Ada kalanya aku salah bicara, kurang memahami perasaanmu, atau belum bisa menjadi seperti yang kamu harapkan. Tetapi aku ingin terus belajar, memperbaiki diri, dan membuktikan rasa sayangku melalui sikap, perhatian, serta kejujuran.`,

        `Aku ingin menjadi seseorang yang bisa kamu ajak bercerita saat harimu terasa berat, seseorang yang ikut bahagia ketika kamu tersenyum, dan seseorang yang tetap mau mendengarkan ketika kita sedang menghadapi masalah.`,

        `Semoga kita bisa terus bertumbuh bersama, saling menghargai, saling menjaga kepercayaan, dan menyelesaikan perbedaan dengan kepala dingin. Aku tidak bisa menjanjikan bahwa setiap hari akan selalu mudah, tetapi aku berharap kita selalu punya kemauan untuk saling memahami dan memperjuangkan hubungan ini dengan cara yang baik.`,

        `Terima kasih sudah menjadi bagian indah dalam perjalanan hidupku, ${partnerName}. Semoga cerita kita terus dipenuhi kenangan manis, tawa, doa, dan hal-hal sederhana yang membuat kita bersyukur.`,

        `Aku menyayangimu, hari ini, esok, dan semoga untuk waktu yang sangat panjang. Jika suatu saat kamu membaca surat ini lagi, ingatlah bahwa surat sederhana ini dibuat khusus untukmu. 💗`,

        `Dengan penuh cinta,\n${yourName} ❤️`

    ];

    // Gunakan textContent agar nama yang dimasukkan
    // tidak diperlakukan sebagai kode HTML.

    letterContent.textContent = paragraphs.join("\n\n");

    // Beralih ke tampilan surat.

    formCard.hidden = true;

    letterCard.hidden = false;

    // Mulai animasi hati.

    startHearts();

    // Posisi layar kembali ke atas.

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ===================================
// 4. KEMBALI KE FORMULIR
// ===================================

backButton.addEventListener("click", function() {

    letterCard.hidden = true;

    formCard.hidden = false;

    stopMusic();

    stopHearts();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ===================================
// 5. MUSIK ROMANTIS
// ===================================

musicButton.addEventListener("click", async function() {

    if (loveMusic.paused) {

        try {

            await loveMusic.play();

            musicButton.textContent = "⏸ Jeda Musik";

        } catch (error) {

            alert(
                "Musik belum bisa diputar. " +
                "Pastikan file static/musik.mp3 tersedia."
            );

        }

    } else {

        loveMusic.pause();

        musicButton.textContent = "🎵 Putar Musik";

    }

});


function stopMusic() {

    loveMusic.pause();

    loveMusic.currentTime = 0;

    musicButton.textContent = "🎵 Putar Musik";

}


// ===================================
// 6. ANIMASI HATI BERJATUHAN
// ===================================

let heartInterval = null;

function createHeart() {

    const heart = document.createElement("span");

    heart.className = "falling-heart";

    const heartSymbols = ["❤️", "💗", "💕", "💖", "💘"];

    heart.textContent =
        heartSymbols[
            Math.floor(Math.random() * heartSymbols.length)
        ];

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.fontSize =
        (Math.random() * 18 + 14) + "px";

    const duration = Math.random() * 4 + 4;

    heart.style.animationDuration = duration + "s";

    heartContainer.appendChild(heart);

    setTimeout(function() {

        heart.remove();

    }, duration * 1000);

}


function startHearts() {

    stopHearts();

    // Membuat beberapa hati langsung muncul.

    for (let i = 0; i < 12; i++) {

        setTimeout(createHeart, i * 180);

    }

    // Menambahkan hati secara berkala.

    heartInterval = setInterval(createHeart, 450);

}


function stopHearts() {

    if (heartInterval !== null) {

        clearInterval(heartInterval);

        heartInterval = null;

    }

    heartContainer.replaceChildren();

}


// ===================================
// 7. ANIMASI HATI SAAT HALAMAN DIBUKA
// ===================================

for (let i = 0; i < 8; i++) {

    setTimeout(createHeart, i * 500);

}
# Laporan Praktikum Konstruksi Perangkat Lunak 
#### Nama : Muhammad Agam Nasywaan
#### NIM : 2211104085 / SE-06-03

## Tugas Jurnal

### SayaTubeVideo - Menambahkan Dua Class SayaTubeVideo dan SayaTubeUser
```
class SayaTubeVideo {
    constructor(title) {
        this.id = Math.floor(10000 + Math.random() * 90000); // Generate random 5-digit ID
        this.title = title;
        this.playCount = 0;
    }

    IncreasePlayCount(count) {
        this.playCount += count;
    }

    PrintVideoDetails() {
        console.log(`Video ID: ${this.id}`);
        console.log(`Title: ${this.title}`);
        console.log(`Play Count: ${this.playCount}`);
    }
}

class SayaTubeUser {
    constructor(username) {
        this.id = Math.floor(10000 + Math.random() * 90000); // Generate random 5-digit ID
        this.username = username;
        this.uploadedVideos = [];
    }

    AddVideo(video) {
        if (video instanceof SayaTubeVideo) {
            this.uploadedVideos.push(video);
        } else {
            console.log("Invalid video instance.");
        }
    }

    GetTotalVideoPlayCount() {
        return this.uploadedVideos.reduce((sum, video) => sum + video.playCount, 0);
    }

    PrintAllVideoPlaycount() {
        console.log(`User: ${this.username}`);
        this.uploadedVideos.forEach((video, index) => {
            console.log(`Video ${index + 1} judul: ${video.title}`);
        });
    }
}

function main() {
    let user = new SayaTubeUser("Agam");

    let videos = [
        "Review Film Avengers oleh Agam",
        "Review Film Thor: Love an Thunder oleh Agam",
        "Review Film Ironman 3 oleh Agam",
        "Review Film Avegers: Age of Ultron oleh Agam",
        "Review Film Guardian of the Galaxy oleh Agam",
        "Review Film The Dark Knight oleh Agam",
        "Review Film Jurassic World Dominion oleh Agam",
        "Review Film Jurassic Park 3 oleh Agam",
        "Review Film Parasite oleh Agam",
        "Review Film Train to Busan oleh Agam"
    ];

    videos.forEach(title => {
        let video = new SayaTubeVideo(title);
        video.IncreasePlayCount(Math.floor(Math.random() * 1000));
        user.AddVideo(video);
    });

    user.PrintAllVideoPlaycount();
    console.log(`Total Play Count: ${user.GetTotalVideoPlayCount()}`);
}

main();
```

#### Output
![Image](https://github.com/user-attachments/assets/82809339-d44f-4303-9a93-8b8d2b6bd0b4)

#### Penjelasan Kode
Kode ini menambahkan class SayaTubeUser yang merepresentasikan pengguna dengan ID acak, username, dan daftar video yang diunggah. Class ini memiliki method AddVideo(video) untuk menambahkan objek SayaTubeVideo ke dalam daftar, GetTotalVideoPlayCount() untuk menghitung total jumlah pemutaran semua video pengguna, dan PrintAllVideoPlaycount() untuk mencetak daftar video yang diunggah. Dalam fungsi main(), dibuat instance pengguna bernama "Agam" yang mengunggah 10 video review film dengan judul berbeda, setiap video diberi jumlah pemutaran acak hingga 1000, lalu semua video dicetak bersama total jumlah pemutarannya.


### Design by Contract - Penambahan Design by Contract Pada Semua Kelas
```
class SayaTubeVideo {
    constructor(title) {
        if (!title || title.length > 200) {
            throw new Error("Judul video harus tidak null dan maksimal 200 karakter.");
        }
        
        this.id = Math.floor(10000 + Math.random() * 90000); // Generate random 5-digit ID
        this.title = title;
        this.playCount = 0;
    }

    IncreasePlayCount(count) {
        if (typeof count !== 'number' || count < 0 || count > 25000000) {
            throw new Error("Jumlah play count harus bernilai positif dan maksimal 25.000.000.");
        }
        
        try {
            if (this.playCount + count > Number.MAX_SAFE_INTEGER) {
                throw new Error("Play count melebihi batas maksimum integer.");
            }
            this.playCount += count;
        } catch (error) {
            console.error(error.message);
        }
    }

    PrintVideoDetails() {
        console.log(`Video ID: ${this.id}`);
        console.log(`Title: ${this.title}`);
        console.log(`Play Count: ${this.playCount}`);
    }
}

class SayaTubeUser {
    constructor(username) {
        if (!username || username.length > 100) {
            throw new Error("Username tidak boleh kosong dan maksimal 100 karakter.");
        }
        
        this.id = Math.floor(10000 + Math.random() * 90000); // Generate random 5-digit ID
        this.username = username;
        this.uploadedVideos = [];
    }

    AddVideo(video) {
        if (!(video instanceof SayaTubeVideo) || video.playCount > Number.MAX_SAFE_INTEGER) {
            throw new Error("Video tidak valid atau memiliki play count melebihi batas integer.");
        }
        this.uploadedVideos.push(video);
    }

    GetTotalVideoPlayCount() {
        return this.uploadedVideos.reduce((sum, video) => sum + video.playCount, 0);
    }

    PrintAllVideoPlaycount() {
        console.log(`User: ${this.username}`);
        this.uploadedVideos.slice(0, 8).forEach((video, index) => {
            console.log(`Video ${index + 1} judul: ${video.title}`);
        });
    }
}

function main() {
    try {
        let user = new SayaTubeUser("Agam");

        let videos = [
            "Review Film Avengers oleh Agam",
            "Review Film Thor: Love an Thunder oleh Agam",
            "Review Film Ironman 3 oleh Agam",
            "Review Film Avegers: Age of Ultron oleh Agam",
            "Review Film Guardian of the Galaxy oleh Agam",
            "Review Film The Dark Knight oleh Agam",
            "Review Film Jurassic World Dominion oleh Agam",
            "Review Film Jurassic Park 3 oleh Agam",
            "Review Film Parasite oleh Agam",
            "Review Film Train to Busan oleh Agam"
        ];

        videos.forEach(title => {
            try {
                let video = new SayaTubeVideo(title);
                video.IncreasePlayCount(Math.floor(Math.random() * 1000));
                user.AddVideo(video);
            } catch (error) {
                console.error(error.message);
            }
        });

        user.PrintAllVideoPlaycount();
        console.log(`Total Play Count: ${user.GetTotalVideoPlayCount()}`);

        // Menguji exception untuk play count overflow
        try {
            let testVideo = new SayaTubeVideo("Test Overflow Video");
            for (let i = 0; i < 10; i++) {
                testVideo.IncreasePlayCount(25000000);
            }
        } catch (error) {
            console.error(error.message);
        }
    } catch (error) {
        console.error(error.message);
    }
}

main();
```

#### Output
![Image](https://github.com/user-attachments/assets/e0940a70-9315-4ca7-a42e-1fa703fbcf8c)

#### Penjelasan Kode
Kode ini merupakan peningkatan dari versi sebelumnya dengan tambahan validasi yang lebih ketat dan penanganan error yang lebih baik. SayaTubeVideo kini memastikan judul tidak kosong dan maksimal 200 karakter, serta membatasi IncreasePlayCount() agar hanya menerima angka positif hingga 25 juta untuk mencegah overflow. SayaTubeUser juga divalidasi agar username tidak kosong dan maksimal 100 karakter, serta hanya menerima objek SayaTubeVideo yang valid saat menambahkan video. Fungsi PrintAllVideoPlaycount() kini membatasi output maksimal 8 video agar tidak membanjiri layar. Dalam main(), setelah membuat user dan menambahkan video dengan jumlah play count acak, program juga menguji skenario play count overflow dengan mencoba menambahkan 25 juta pemutaran sebanyak 10 kali ke sebuah video, yang kemudian ditangani oleh exception.
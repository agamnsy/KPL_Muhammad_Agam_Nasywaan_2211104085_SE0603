// Class representing a single YouTube-like video
class SayaTubeVideo {
    constructor(title) {
        // Generate random 5-digit ID
        this.videoId = Math.floor(10000 + Math.random() * 90000);
        this.videoTitle = title;
        this.playCount = 0;
    }

    // Increase the play count of the video
    increasePlayCount(count) {
        this.playCount += count;
    }

    // Print the details of the video
    printVideoDetails() {
        console.log(`Video ID: ${this.videoId}`);
        console.log(`Title: ${this.videoTitle}`);
        console.log(`Play Count: ${this.playCount}`);
    }
}

// Class representing a user who uploads videos
class SayaTubeUser {
    constructor(username) {
        // Generate random 5-digit ID
        this.userId = Math.floor(10000 + Math.random() * 90000);
        this.username = username;
        this.uploadedVideos = [];
    }

    // Add a video to the user's uploaded video list
    addVideo(video) {
        if (video instanceof SayaTubeVideo) {
            this.uploadedVideos.push(video);
        } else {
            console.log("Invalid video instance.");
        }
    }

    // Get the total number of video play counts
    getTotalVideoPlayCount() {
        return this.uploadedVideos.reduce((sum, video) => sum + video.playCount, 0);
    }

    // Print all uploaded videos with their titles
    printAllVideoPlayCount() {
        console.log(`User: ${this.username}`);
        this.uploadedVideos.forEach((video, index) => {
            console.log(`Video ${index + 1} title: ${video.videoTitle}`);
        });
    }
}

// Main function for running the program
function main() {
    const user = new SayaTubeUser("Agam");

    const videoTitles = [
        "Review Film Avengers oleh Agam",
        "Review Film Thor: Love and Thunder oleh Agam",
        "Review Film Ironman 3 oleh Agam",
        "Review Film Avengers: Age of Ultron oleh Agam",
        "Review Film Guardians of the Galaxy oleh Agam",
        "Review Film The Dark Knight oleh Agam",
        "Review Film Jurassic World Dominion oleh Agam",
        "Review Film Jurassic Park 3 oleh Agam",
        "Review Film Parasite oleh Agam",
        "Review Film Train to Busan oleh Agam"
    ];

    // Create and add videos to user
    videoTitles.forEach((title) => {
        const video = new SayaTubeVideo(title);
        const randomPlayCount = Math.floor(Math.random() * 1000);
        video.increasePlayCount(randomPlayCount);
        user.addVideo(video);
    });

    user.printAllVideoPlayCount();
    console.log(`Total Play Count: ${user.getTotalVideoPlayCount()}`);
}

main();

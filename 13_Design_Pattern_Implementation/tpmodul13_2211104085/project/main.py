# main.py
from youtube_channel import YouTubeChannel
from subscriber import Subscriber

if __name__ == "__main__":
    # Create channels
    channel1 = YouTubeChannel("TechWithTim")
    channel2 = YouTubeChannel("DailyCoding")

    # Create subscribers
    alice = Subscriber("Alice")
    bob = Subscriber("Bob")

    # Alice subscribes to both channels
    channel1.events.subscribe("new_video", alice)
    channel2.events.subscribe("new_video", alice)

    # Bob only subscribes to TechWithTim
    channel1.events.subscribe("new_video", bob)

    # Channels upload videos
    channel1.upload_video("Python Tips and Tricks")
    channel2.upload_video("Coding Interview Challenge")

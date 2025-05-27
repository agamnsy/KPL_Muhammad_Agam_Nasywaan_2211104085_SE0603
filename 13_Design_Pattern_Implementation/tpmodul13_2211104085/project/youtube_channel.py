from event_manager import EventManager

class YouTubeChannel:
    def __init__(self, name):
        self.name = name
        self.events = EventManager()

    def upload_video(self, video_title):
        print(f"[{self.name}] Uploaded a new video: {video_title}")
        self.events.notify("new_video", (self.name, video_title) )
        print("\n")

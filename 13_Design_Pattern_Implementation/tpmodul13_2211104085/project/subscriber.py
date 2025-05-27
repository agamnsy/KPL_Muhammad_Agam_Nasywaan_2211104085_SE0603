class Subscriber:
    def __init__(self, username):
        self.username = username

    def update(self, data):
        channel_name, video_title = data
        print(f"Hi {self.username}, new video uploaded by {channel_name}: '{video_title}'")

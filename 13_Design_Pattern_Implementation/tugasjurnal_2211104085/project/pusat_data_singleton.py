class PusatDataSingleton:
    _instance = None  # Property singleton
    def __init__(self):
        self.DataTersimpan = []  # List of strings

    @classmethod
    def GetDataSingleton(cls):
        if cls._instance is None:
            cls._instance = PusatDataSingleton()
        return cls._instance

    def GetSemuaData(self):
        return self.DataTersimpan

    def PrintSemuaData(self):
        print("Isi data:")
        for data in self.DataTersimpan:
            print(f"- {data}")

    def AddSebuahData(self, input):
        self.DataTersimpan.append(input)

    def HapusSebuahData(self, index):
        if 0 <= index < len(self.DataTersimpan):
            removed = self.DataTersimpan.pop(index)
            print(f"Data '{removed}' telah dihapus.")
        else:
            print("Index tidak valid.")

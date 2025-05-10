# Install library (jalankan ini untuk menginstall dependencies)
# !pip install fastapi uvicorn nest-asyncio pyngrok

# Import libraries
from fastapi import FastAPI, HTTPException, status # type: ignore
from pydantic import BaseModel # type: ignore
import nest_asyncio
from pyngrok import ngrok, conf
import uvicorn
from typing import List, Dict, Any, Optional

# Models
class Mahasiswa(BaseModel):
    """Model representing a student with name and student ID"""
    nama: str
    nim: str

class ResponseMessage(BaseModel):
    """Standard response model for API responses"""
    pesan: str
    data: Optional[Dict[str, Any]] = None

# Initialize data
class MahasiswaRepository:
    """Repository to manage mahasiswa data"""
    def __init__(self):
        self.mahasiswa_list = [
            {"nama": "Muhammad Agam Nasywaan", "nim": "2211104085"},
            {"nama": "Muhammad Chairul Anam", "nim": "2211104072"},
            {"nama": "Muhammad Imam Al Amin", "nim": "2211104077"},
            {"nama": "Chayla Ravanelly Quintitawati", "nim": "2211104082"},
            {"nama": "Namirah Salsabila", "nim": "2211104087"}
        ]

    def get_all(self) -> List[Dict[str, str]]:
        """Get all mahasiswa records"""
        return self.mahasiswa_list

    def get_by_index(self, index: int) -> Dict[str, str]:
        """Get a mahasiswa by index"""
        if 0 <= index < len(self.mahasiswa_list):
            return self.mahasiswa_list[index]
        return None

    def add(self, mahasiswa: Mahasiswa) -> None:
        """Add a new mahasiswa"""
        self.mahasiswa_list.append(mahasiswa.dict())

    def delete(self, index: int) -> Dict[str, str]:
        """Delete a mahasiswa by index"""
        if 0 <= index < len(self.mahasiswa_list):
            return self.mahasiswa_list.pop(index)
        return None

# Create the FastAPI application
def create_app() -> FastAPI:
    """Create and configure the FastAPI application"""
    app = FastAPI(
        title="API Mahasiswa",
        description="API untuk mengelola data mahasiswa SE-06-3",
        version="1.0.0"
    )

    # Create repository instance
    repo = MahasiswaRepository()

    # Register routes
    @app.get("/api/mahasiswa", response_model=List[Dict[str, str]])
    def get_semua_mahasiswa():
        """Get all mahasiswa data"""
        return repo.get_all()

    @app.get("/api/mahasiswa/{index}")
    def get_mahasiswa(index: int):
        """Get mahasiswa by index"""
        mahasiswa = repo.get_by_index(index)
        if mahasiswa:
            return mahasiswa
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Index tidak ditemukan"
        )

    @app.post("/api/mahasiswa", response_model=ResponseMessage)
    def tambah_mahasiswa(mahasiswa: Mahasiswa):
        """Add a new mahasiswa"""
        repo.add(mahasiswa)
        return ResponseMessage(pesan="Mahasiswa berhasil ditambahkan")

    @app.delete("/api/mahasiswa/{index}", response_model=ResponseMessage)
    def hapus_mahasiswa(index: int):
        """Delete mahasiswa by index"""
        deleted = repo.delete(index)
        if deleted:
            return ResponseMessage(
                pesan="Mahasiswa berhasil dihapus",
                data=deleted
            )
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Index tidak ditemukan"
        )

    return app

def start_server():
    """Configure and start the server with ngrok tunnel"""
    # Configure ngrok
    conf.get_default().auth_token = "2wFymwB49ivdxPUxcGRsyEZF9OM_88dueVUsHUg3BtJjrGAL"

    # Apply nest_asyncio to allow asyncio to work in Jupyter
    nest_asyncio.apply()

    # Create ngrok tunnel
    public_url = ngrok.connect(8000)
    print("🚀 Swagger UI:", public_url.public_url + "/docs")
    print("🚀 API URL:", public_url.public_url)

    # Run the server
    app = create_app()
    uvicorn.run(app, port=8000)

# Run the application
if __name__ == "__main__":
    start_server()
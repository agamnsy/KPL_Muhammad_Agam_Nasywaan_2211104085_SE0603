# Laporan Praktikum Konstruksi Perangkat Lunak

#### Nama : Muhammad Agam Nasywaan

#### NIM : 2211104085 / SE-06-03

## Tugas Jurnal

### Implementasi Web API

#### File movies.py

```
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
class Movie(BaseModel):
    """Model representing a movie with title, director, stars, and description"""
    title: str
    director: str
    stars: List[str]
    description: str

class ResponseMessage(BaseModel):
    """Standard response model for API responses"""
    pesan: str
    data: Optional[Dict[str, Any]] = None

# Initialize data
class MovieRepository:
    """Repository to manage movie data"""
    def __init__(self):
        self.movie_list = [
            {
                "title": "Avengers: Endgame",
                "director": "Anthony Russo, Joe Russo",
                "stars": ["Robert Downey Jr.", "Chris Evans", "Scarlett Johansson"],
                "description": "After the devastating events of Infinity War, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe."
            },
            {
                "title": "Interstellar",
                "director": "Christopher Nolan",
                "stars": ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
                "description": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
            },
            {
                "title": "Jurassic World",
                "director": "Colin Trevorrow",
                "stars": ["Chris Pratt", "Bryce Dallas Howard", "Vincent D'Onofrio"],
                "description": "A new theme park, built on the original site of Jurassic Park, creates a genetically modified hybrid dinosaur which escapes containment and goes on a killing spree."
            }
        ]


    def get_all(self) -> List[Dict[str, Any]]:
        """Get all movie records"""
        return self.movie_list

    def get_by_index(self, index: int) -> Dict[str, Any]:
        """Get a movie by index"""
        if 0 <= index < len(self.movie_list):
            return self.movie_list[index]
        return None

    def add(self, movie: Movie) -> None:
        """Add a new movie"""
        self.movie_list.append(movie.dict())

    def delete(self, index: int) -> Dict[str, Any]:
        """Delete a movie by index"""
        if 0 <= index < len(self.movie_list):
            return self.movie_list.pop(index)
        return None

# Create the FastAPI application
def create_app() -> FastAPI:
    """Create and configure the FastAPI application"""
    app = FastAPI(
        title="API Movies",
        description="API untuk mengelola data movie dari top movie IMDB",
        version="1.0.0"
    )

    # Create repository instance
    repo = MovieRepository()

    # Register routes
    @app.get("/api/Movies", response_model=List[Dict[str, Any]])
    def get_all_movies():
        """Get all movie data"""
        return repo.get_all()

    @app.get("/api/Movies/{id}")
    def get_movie(id: int):
        """Get movie by index id"""
        movie = repo.get_by_index(id)
        if movie:
            return movie
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Movie dengan ID tersebut tidak ditemukan"
        )

    @app.post("/api/Movies", response_model=ResponseMessage)
    def add_movie(movie: Movie):
        """Add a new movie"""
        repo.add(movie)
        return ResponseMessage(pesan="Film berhasil ditambahkan")

    @app.delete("/api/Movies/{id}", response_model=ResponseMessage)
    def delete_movie(id: int):
        """Delete movie by index id"""
        deleted = repo.delete(id)
        if deleted:
            return ResponseMessage(
                pesan="Film berhasil dihapus",
                data=deleted
            )
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Movie dengan ID tersebut tidak ditemukan"
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
```

#### Output - 1

Mencoba “GET /api/Movies” saat baru dijalankan yang mengeluarkan list film dari TOP 3 IMDB seperti pada tampilan berikut pada saat dicoba dengan menekan tombol “Try it out” dan tombol “Execute”.
![Image](https://github.com/user-attachments/assets/fb448973-6b98-49e8-9d60-a99c8fcbe530)

#### Output - 2

Menambahkan Movie baru yaitu urutan ke-4 pada TOP IMDB list dengan memanggil API pada bagian “POST /api/Movies”.
![Image](https://github.com/user-attachments/assets/2f9b93ee-ef96-4b03-9d39-536b20693511)

#### Output - 3

Cek list/array dari semua Movie lagi dengan “GET /api/Movies”.
![Image](https://github.com/user-attachments/assets/725d9a6c-aade-4d20-b16c-1c428f83506d)

#### Output - 4

Mencoba meminta Movie dengan index 3, “GET /api/Movies/3” yang seharusnya mengembalikan Movie yang baru saja ditambah.
![Image](https://github.com/user-attachments/assets/4e9d4280-36e5-461a-9e63-4f35bfca8ea3)

#### Output - 5

Menghapus objek Movie dengan index ke-1 dengan “DELETE /api/Movies/1”.
![Image](https://github.com/user-attachments/assets/b2e301a9-5f3a-48f6-8e06-f38c0927a5aa)

#### Output - 6

Cek list/array dari semua Movie sekali lagi dengan “GET /api/Movies.
![Image](https://github.com/user-attachments/assets/8bca29e5-b04f-4b99-b702-007a3d0d4683)

#### Penjelasan Kode

Kode di atas merupakan implementasi aplikasi API berbasis FastAPI yang berfungsi untuk mengelola data film top dari IMDb. Aplikasi ini menggunakan model Movie untuk merepresentasikan data film yang terdiri dari judul, sutradara, daftar aktor utama, dan deskripsi, serta ResponseMessage untuk respons standar. Data awal berisi tiga film terkenal dan dikelola oleh MovieRepository, yang menyediakan fungsi untuk mengambil semua data, mengambil data berdasarkan indeks, menambah film baru, dan menghapus film. Endpoint API mencakup GET untuk semua atau satu film berdasarkan ID, POST untuk menambah film, dan DELETE untuk menghapus film. Aplikasi ini juga menggunakan pyngrok untuk membuat tunnel publik agar API dapat diakses secara online, serta nest_asyncio agar dapat berjalan di lingkungan seperti Jupyter Notebook. Seluruh aplikasi dijalankan menggunakan server uvicorn.

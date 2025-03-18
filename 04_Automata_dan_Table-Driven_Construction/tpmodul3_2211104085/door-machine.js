class DoorMachine {
    constructor() {
        this.states = {
            TERKUNCI: 'TERKUNCI',
            TERBUKA: 'TERBUKA'
        };
        this.state = this.states.TERKUNCI; // State awal adalah TERKUNCI
        console.log('Pintu terkunci');
    }

    bukaPintu() {
        if (this.state === this.states.TERKUNCI) {
            console.log('Pintu masih terkunci! Tidak dapat dibuka.');
        } else if (this.state === this.states.TERBUKA) {
            console.log('Pintu sudah terbuka.');
        }
    }

    kunciPintu() {
        if (this.state === this.states.TERBUKA) {
            this.state = this.states.TERKUNCI;
            console.log('Pintu terkunci');
        } else {
            console.log('Pintu sudah terkunci.');
        }
    }

    bukaKunci() {
        if (this.state === this.states.TERKUNCI) {
            this.state = this.states.TERBUKA;
            console.log('Pintu tidak terkunci');
        } else {
            console.log('Pintu sudah tidak terkunci.');
        }
    }
}

const pintu = new DoorMachine();

pintu.bukaPintu();
pintu.bukaKunci();
pintu.bukaPintu();
pintu.kunciPintu();
pintu.bukaPintu();
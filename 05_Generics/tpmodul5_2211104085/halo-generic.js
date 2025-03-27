class HaloGeneric {
    SapaUser(user) {
        console.log(`\nHalo ${user}\n`);
    }
}

function main() {
    const halo = new HaloGeneric();
    const namaPraktikan = "Agam";
    halo.SapaUser(namaPraktikan);
}

main();

module.exports = {
    houseTileModel: {
        houseTiles: {
            listItem: "#grillaavisos article",
            data: {
                url: {
                    selector: ".mas-info a",
                    attr: "href"
                }
            },
            price: ".contenedor-info strong"
        }
    },
    houseModel: {
        bedrooms: "#primerosLi li:nth-of-type(2)",
        area: "#primerosLi li:nth-of-type(3)",
        description: "#descripcionLarga",
        generalCharacteristics: "#SeccionCaracteristica .listados",
        rooms: "#SectionAmbientes .listados",
        commodities: "#SeccionComodidades .listados",
        services: "#SectionServicios .listados",
        building: "#SectionEdificio .listados",
        sellerPhoneNumber: "#preYtel a"
    }
}

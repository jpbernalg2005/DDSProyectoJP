// URL base para las imágenes de los ítems
export const IMG_BASE_URL = "https://render.albiononline.com/api/v1/item/";

// --- MAPEO COMPLETO DE NOMBRES DE ÍTEMS ---
// (Esta lista debe estar completa para mostrar nombres reales)
export const ITEM_NAME_MAP = {
    // Armaduras de Placa
    "T8_ARMOR_PLATE_SET1": "Armadura de Soldado",
    "T8_ARMOR_PLATE_SET2": "Armadura de Caballero",
    "T8_ARMOR_PLATE_SET3": "Armadura de Guardián",
    "T8_ARMOR_PLATE_ROYAL": "Armadura Real",
    "T8_ARMOR_PLATE_HELL": "Armadura Demoniaca",
    "T8_ARMOR_PLATE_KEEPER": "Armadura de Juez",
    "T8_ARMOR_PLATE_AVALON": "Armadura de Valor",
    "T8_ARMOR_PLATE_FEY": "Armadura Crepuscular",
    "T8_ARMOR_PLATE_UNDEAD": "Armadura de Guardatumba",

    "T8_HEAD_PLATE_SET1": "Casco de Soldado",
    "T8_HEAD_PLATE_SET2": "Casco de Caballero",
    "T8_HEAD_PLATE_SET3": "Casco de Guardián",
    "T8_HEAD_PLATE_ROYAL": "Casco Real",
    "T8_HEAD_PLATE_HELL": "Casco Demoniaco",
    "T8_HEAD_PLATE_KEEPER": "Casco de Juez",
    "T8_HEAD_PLATE_AVALON": "Casco de Valor",
    "T8_HEAD_PLATE_FEY": "Casco Crepuscular",
    "T8_HEAD_PLATE_UNDEAD": "Casco de Guardatumba",

    "T8_SHOES_PLATE_SET1": "Botas de Soldado",
    "T8_SHOES_PLATE_SET2": "Botas de Caballero",
    "T8_SHOES_PLATE_SET3": "Botas de Guardián",
    "T8_SHOES_PLATE_ROYAL": "Botas Reales",
    "T8_SHOES_PLATE_HELL": "Botas Demoniacas",
    "T8_SHOES_PLATE_KEEPER": "Botas de Juez",
    "T8_SHOES_PLATE_AVALON": "Botas de Valor",
    "T8_SHOES_PLATE_FEY": "Botas Crepuscular",
    "T8_SHOES_PLATE_UNDEAD": "Botas de Guardatumba",

    // Armaduras de Cuero
    "T8_ARMOR_LEATHER_SET1": "Chaqueta de Mercenario",
    "T8_ARMOR_LEATHER_SET2": "Chaqueta de Cazador",
    "T8_ARMOR_LEATHER_SET3": "Chaqueta de Asesino",
    "T8_ARMOR_LEATHER_ROYAL": "Chaqueta Real",
    "T8_ARMOR_LEATHER_HELL": "Chaqueta de Vandalo",
    "T8_ARMOR_LEATHER_MORGANA": "Chaqueta de Acechador",
    "T8_ARMOR_LEATHER_AVALON": "Chaqueta de Tenacidad",
    "T8_ARMOR_LEATHER_FEY": "Chaqueta de Caminanieblas",
    "T8_ARMOR_LEATHER_UNDEAD": "Chaqueta de Espectro",

    "T8_HEAD_LEATHER_SET1": "Capucha de Mercenario",
    "T8_HEAD_LEATHER_SET2": "Capucha de Cazador",
    "T8_HEAD_LEATHER_SET3": "Capucha de Asesino",
    "T8_HEAD_LEATHER_ROYAL": "Capucha Real",
    "T8_HEAD_LEATHER_HELL": "Capucha de Vandalo",
    "T8_HEAD_LEATHER_MORGANA": "Capucha de Acechador",
    "T8_HEAD_LEATHER_AVALON": "Capucha de Tenacidad",
    "T8_HEAD_LEATHER_FEY": "Capucha de Caminanieblas",
    "T8_HEAD_LEATHER_UNDEAD": "Capucha de Espectro",

    "T8_SHOES_LEATHER_SET1": "Zapatos de Mercenario",
    "T8_SHOES_LEATHER_SET2": "Zapatos de Cazador",
    "T8_SHOES_LEATHER_SET3": "Zapatos de Asesino",
    "T8_SHOES_LEATHER_ROYAL": "Zapatos Reales",
    "T8_SHOES_LEATHER_HELL": "Zapatos de Vandalo",
    "T8_SHOES_LEATHER_MORGANA": "Zapatos de Acechador",
    "T8_SHOES_LEATHER_AVALON": "Zapatos de Tenacidad",
    "T8_SHOES_LEATHER_FEY": "Zapatos de Caminanieblas",
    "T8_SHOES_LEATHER_UNDEAD": "Zapatos de Espectro",

    // Armaduras de Tela
    "T8_ARMOR_CLOTH_SET1": "Tunica de Erudito",
    "T8_ARMOR_CLOTH_SET2": "Tunica de Clérigo",
    "T8_ARMOR_CLOTH_SET3": "Tunica de Mago",
    "T8_ARMOR_CLOTH_ROYAL": "Tunica Real",
    "T8_ARMOR_CLOTH_HELL": "Tunica de Diablo",
    "T8_ARMOR_CLOTH_KEEPER": "Tunica de Druida",
    "T8_ARMOR_CLOTH_AVALON": "Tunica de Pureza",
    "T8_ARMOR_CLOTH_FEY": "Tunica de Escamas Fericas",
    "T8_ARMOR_CLOTH_MORGANA": "Tunica de Sectario",

    "T8_HEAD_CLOTH_SET1": "Habito de Erudito",
    "T8_HEAD_CLOTH_SET2": "Habito de Clérigo",
    "T8_HEAD_CLOTH_SET3": "Habito de Mago",
    "T8_HEAD_CLOTH_ROYAL": "Habito Real",
    "T8_HEAD_CLOTH_HELL": "Habito de Diablo",
    "T8_HEAD_CLOTH_KEEPER": "Habito de Druida",
    "T8_HEAD_CLOTH_AVALON": "Habito de Pureza",
    "T8_HEAD_CLOTH_FEY": "Sombrero de Escamas Fericas",
    "T8_HEAD_CLOTH_MORGANA": "Habito de Sectario",

    "T8_SHOES_CLOTH_SET1": "Sandalias de Erudito",
    "T8_SHOES_CLOTH_SET2": "Sandalias de Clérigo",
    "T8_SHOES_CLOTH_SET3": "Sandalias de Mago",
    "T8_SHOES_CLOTH_ROYAL": "Sandalias Reales",
    "T8_SHOES_CLOTH_HELL": "Sandalias de Diablo",
    "T8_SHOES_CLOTH_KEEPER": "Sandalias de Druida",
    "T8_SHOES_CLOTH_AVALON": "Sandalias de Pureza",
    "T8_SHOES_CLOTH_FEY": "Sandalias de Escamas Fericas",
    "T8_SHOES_CLOTH_MORGANA": "Sandalias de Sectario",
    
    // Bastones Malditos 
    "T8_MAIN_CURSEDSTAFF": "Bastón Maldito",
    "T8_2H_CURSEDSTAFF": "Gran Bastón Maldito",
    "T8_2H_DEMONICSTAFF": "Bastón Demoniaco",
    "T8_MAIN_CURSEDSTAFF_UNDEAD": "Bastón de maldicion de vida",
    "T8_2H_SKULLORB_HELL": "Calavera Infernal",
    "T8_2H_CURSEDSTAFF_MORGANA": "Bastón de maldiciones",
    "T8_MAIN_CURSEDSTAFF_AVALON": "Invocador Oscuro",
    "T8_MAIN_CURSEDSTAFF_CRYSTAL": "Putrefacto ",
    
    // Bastones de Escarcha
    "T8_MAIN_FROSTSTAFF": "Bastón de Escarcha",
    "T8_2H_FROSTSTAFF": "Gran Bastón de Escarcha",
    "T8_2H_GLACIALSTAFF": "Bastón Granizobardo",
    "T8_MAIN_FROSTSTAFF_KEEPER": "Bastón de Hielo del Guardián",
    "T8_2H_ICECRYSTAL_UNDEAD": "Cristal de Hielo de Escarcha No Muerto",
    "T8_2H_FROSTSTAFF_CRYSTAL": "Bastón de Escarcha de Cristal",
    "T8_2H_ICEGAUNTLETS_HELL": "Guanteletes de Hielo Infernal",
    "T8_MAIN_FROSTSTAFF_AVALON": "Bastón de Chillido de Avalon",

    // Bastones Arcanos
    "T8_MAIN_ARCANESTAFF": "Bastón Arcano",
    "T8_2H_ARCANESTAFF": "Gran Bastón Arcano",
    "T8_2H_ENIGMATICSTAFF": "Bastón Enigmático",
    "T8_MAIN_ARCANESTAFF_UNDEAD": "Bastón Arcano de No Muerto",
    "T8_2H_ARCANESTAFF_HELL": "Bastón Arcano Infernal",
    "T8_2H_ENIGMATICORB_MORGANA": "Enigmatico",
    "T8_2H_ARCANE_RINGPAIR_AVALON": "Par de Anillos Arcanos de Avalon",
    "T8_2H_ARCANESTAFF_CRYSTAL": "Bastón Astral",
    
    // Bastones Sagrados
    "T8_MAIN_HOLYSTAFF": "Bastón Sagrado",
    "T8_2H_HOLYSTAFF": "Gran Bastón Sagrado",
    "T8_2H_DIVINESTAFF": "Bastón Divino",
    "T8_MAIN_HOLYSTAFF_MORGANA": "Bastón de Salvación de Morgana",
    "T8_2H_HOLYSTAFF_HELL": "Bastón Sagrado Infernal",
    "T8_2H_HOLYSTAFF_UNDEAD": "Bastón Sagrado de No Muerto",
    "T8_MAIN_HOLYSTAFF_AVALON": "Bastón Curativo de Avalon",
    "T8_2H_HOLYSTAFF_CRYSTAL": "Bastón Sagrado de Cristal",

    // Bastones de Fuego
    "T8_MAIN_FIRESTAFF": "Bastón de Fuego",
    "T8_2H_FIRESTAFF": "Gran Bastón de Fuego",
    "T8_2H_INFERNOSTAFF": "Bastón Infernal",
    "T8_MAIN_FIRESTAFF_KEEPER": "Bastón de Fuego del Guardián",
    "T8_2H_FIRESTAFF_HELL": "Bastón de Fuego Infernal",
    "T8_2H_INFERNOSTAFF_MORGANA": "Bastón de la Ira de Morgana",
    "T8_2H_FIRE_RINGPAIR_AVALON": "Par de Anillos de Fuego de Avalon",
    "T8_MAIN_FIRESTAFF_CRYSTAL": "Bastón de Fuego de Cristal",

    // Bastones de Naturaleza
    "T8_2H_NATURESTAFF": "Gran Bastón de Naturaleza",
    "T8_MAIN_NATURESTAFF": "Bastón de Naturaleza",
    "T8_2H_WILDSTAFF": "Bastón Salvaje",
    "T8_2H_NATURESTAFF_HELL": "Bastón de Naturaleza Infernal",
    "T8_MAIN_NATURESTAFF_KEEPER": "Bastón de Druida del Guardián",
    "T8_2H_NATURESTAFF_KEEPER": "Bastón Salvaje del Guardián",
    "T8_MAIN_NATURESTAFF_AVALON": "Bastón de Redención de Avalon",
    "T8_MAIN_NATURESTAFF_CRYSTAL": "Bastón de Naturaleza de Cristal",

    // Armas Cambiaformas (Nombres de las Formas)
    "T8_2H_SHAPESHIFTER_SET1": "Forma de oso",
    "T8_2H_SHAPESHIFTER_SET2": "Forma de lobo",
    "T8_2H_SHAPESHIFTER_SET3": "Forma de serpiente",
    "T8_2H_SHAPESHIFTER_MORGANA": "Forma de murciélago de Morgana",
    "T8_2H_SHAPESHIFTER_HELL": "Forma de demonio Infernal",
    "T8_2H_SHAPESHIFTER_KEEPER": "Forma de jabalí de Guardián",
    "T8_2H_SHAPESHIFTER_AVALON": "Forma de dríada de Avalon",
    "T8_2H_SHAPESHIFTER_CRYSTAL": "Forma de fénix de Cristal",

    // Quarter Staffs
    "T8_2H_QUARTERSTAFF": "Bastón Doble",
    "T8_2H_IRONCLADEDSTAFF": "Bastón Revestido de Hierro",
    "T8_2H_DOUBLEBLADEDSTAFF": "Bastón Doble Filo",
    "T8_2H_COMBATSTAFF_MORGANA": "Bastón de Combate de Morgana",
    "T8_2H_TWINSCYTHE_HELL": "Doble Guadaña Infernal",
    "T8_2H_ROCKSTAFF_KEEPER": "Bastón de Roca del Guardián",
    "T8_2H_QUARTERSTAFF_AVALON": "Bastón de Gravedad de Avalon",
    "T8_2H_DOUBLEBLADEDSTAFF_CRYSTAL": "Bastón de Doble Filo de Cristal",

    // Spears
    "T8_MAIN_SPEAR": "Lanza",
    "T8_2H_SPEAR": "Pica",
    "T8_2H_GLAIVE": "Guja",
    "T8_MAIN_SPEAR_KEEPER": "Lanza de Cazador del Guardián",
    "T8_2H_HARPOON_HELL": "Arpón Infernal",
    "T8_2H_TRIDENT_UNDEAD": "Tridente de No Muerto",
    "T8_MAIN_SPEAR_LANCE_AVALON": "Lanza de Garra de Avalon",
    "T8_2H_GLAIVE_CRYSTAL": "Guja de Cristal",

    // Daggers
    "T8_MAIN_DAGGER": "Daga",
    "T8_2H_DAGGERPAIR": "Par de Dagas",
    "T8_2H_CLAWPAIR": "Garras",
    "T8_MAIN_RAPIER_MORGANA": "Florete de Morgana",
    "T8_MAIN_DAGGER_HELL": "Daga Infernal",
    "T8_2H_DUALSICKLE_UNDEAD": "Doble Hoz de No Muerto",
    "T8_2H_DAGGER_KATAR_AVALON": "Katar de Daga de Avalon",
    "T8_2H_DAGGERPAIR_CRYSTAL": "Par de Dagas de Cristal",

    // Crossbows
    "T8_MAIN_1HCROSSBOW": "Ballesta",
    "T8_2H_CROSSBOW": "Ballesta Pesada",
    "T8_2H_CROSSBOWLARGE": "Ballesta de Asedio",
    "T8_2H_REPEATINGCROSSBOW_UNDEAD": "Ballesta Repetidora de No Muerto",
    "T8_2H_DUALCROSSBOW_HELL": "Doble Ballesta Infernal",
    "T8_2H_CROSSBOWLARGE_MORGANA": "Ballesta de Artillería de Morgana",
    "T8_2H_CROSSBOW_CANNON_AVALON": "Cañón de Ballesta de Avalon",
    "T8_2H_DUALCROSSBOW_CRYSTAL": "Doble Ballesta de Cristal",

    // Bows
    "T8_2H_BOW": "Arco",
    "T8_2H_WARBOW": "Arco de Guerra",
    "T8_2H_LONGBOW": "Arco Largo",
    "T8_2H_BOW_HELL": "Arco Infernal",
    "T8_2H_BOW_AVALON": "Arco Susurrante de Avalon",
    "T8_2H_BOW_KEEPER": "Arco de Cuerno del Guardián",
    "T8_2H_BOW_CRYSTAL": "Arco de Cristal",
    "T8_2H_LONGBOW_UNDEAD": "Arco Largo de No Muerto",

    // Knuckles
    "T8_2H_KNUCKLES_SET1": "Puños de Pelea",
    "T8_2H_KNUCKLES_SET2": "Guanteletes",
    "T8_2H_KNUCKLES_SET3": "Manoplas",
    "T8_2H_KNUCKLES_KEEPER": "Puños de Batalla del Guardián",
    "T8_2H_KNUCKLES_HELL": "Puños Demoníacos Infernales",
    "T8_2H_KNUCKLES_MORGANA": "Puños Vengativos de Morgana",
    "T8_2H_KNUCKLES_AVALON": "Puños de Avalancha de Avalon",
    "T8_2H_KNUCKLES_CRYSTAL": "Puños de Cristal",

    // Hammers
    "T8_MAIN_HAMMER": "Martillo",
    "T8_2H_HAMMER": "Gran Martillo",
    "T8_2H_POLEHAMMER": "Martillo de Guerra",
    "T8_2H_HAMMER_UNDEAD": "Martillo de Sepulturero No Muerto",
    "T8_2H_DUALHAMMER_HELL": "Doble Martillo Infernal",
    "T8_2H_HAMMER_AVALON": "Martillo de Carga de Avalon",
    "T8_2H_RAM_KEEPER": "Ariete del Guardián",
    "T8_2H_HAMMER_CRYSTAL": "Martillo de Cristal",

    // Maces
    "T8_MAIN_MACE": "Maza",
    "T8_2H_MACE": "Gran Maza",
    "T8_2H_FLAIL": "Mangual",
    "T8_MAIN_ROCKMACE_KEEPER": "Maza de Roca del Guardián",
    "T8_MAIN_MACE_HELL": "Maza Infernal",
    "T8_2H_MACE_MORGANA": "Maza de Morgana",
    "T8_2H_DUALMACE_AVALON": "Doble Maza de Avalon",
    "T8_MAIN_MACE_CRYSTAL": "Maza de Cristal",

    // Axes
    "T8_MAIN_AXE": "Hacha",
    "T8_2H_AXE": "Gran Hacha",
    "T8_2H_HALBERD": "Alabarda",
    "T8_2H_SCYTHE_HELL": "Guadaña Infernal",
    "T8_2H_SCYTHE_CRYSTAL": "Guadaña de Cristal",
    "T8_2H_DUALAXE_KEEPER": "Doble Hacha del Guardián",
    "T8_2H_AXE_AVALON": "Hacha Real de Avalon",
    "T8_2H_HALBERD_MORGANA": "Alabarda de Morgana",

    // Swords
    "T8_MAIN_SWORD": "Espada",
    "T8_2H_CLAYMORE": "Claymore",
    "T8_2H_DUALSWORD": "Espadas Dobles",
    "T8_MAIN_SCIMITAR_MORGANA": "Cimitarra de Morgana",
    "T8_2H_CLEAVER_HELL": "Cuchilla Infernal",
    "T8_2H_DUALSCIMITAR_UNDEAD": "Cimitarra Doble de No Muerto",
    "T8_2H_CLAYMORE_AVALON": "Mandoble de Punición de Avalon",
    "T8_MAIN_SWORD_CRYSTAL": "Espada de Cristal",

    // Off-Hand Items
    "T8_OFF_BOOK": "Libro de la Naturaleza",
    "T8_OFF_ORB_MORGANA": "Orbe de Morgana",
    "T8_OFF_DEMONSKULL_HELL": "Cráneo Demoníaco Infernal",
    "T8_OFF_TOTEM_KEEPER": "Tótem del Guardián",
    "T8_OFF_CENSER_AVALON": "Incensario de Avalon",
    "T8_OFF_TOME_CRYSTAL": "Tomo de Cristal",
    
    "T8_OFF_TORCH": "Antorcha",
    "T8_OFF_HORN_KEEPER": "Cuerno de Guerra del Guardián",
    "T8_OFF_TALISMAN_AVALON": "Talismán de Avalon",
    "T8_OFF_LAMP_UNDEAD": "Lámpara de No Muerto",
    "T8_OFF_JESTERCANE_HELL": "Bastón de Bufón Infernal",
    "T8_OFF_TORCH_CRYSTAL": "Antorcha de Cristal",
    
    "T8_OFF_SHIELD": "Escudo",
    "T8_OFF_TOWERSHIELD_UNDEAD": "Escudo de Torre de No Muerto",
    "T8_OFF_SHIELD_HELL": "Escudo Infernal",
    "T8_OFF_SPIKEDSHIELD_MORGANA": "Escudo de Púas de Morgana",
    "T8_OFF_SHIELD_AVALON": "Escudo de Bastión de Avalon",
    "T8_OFF_SHIELD_CRYSTAL": "Escudo de Cristal"
};

// Slots de equipamiento en orden para renderizado en la tarjeta
export const EQUIPMENT_SLOTS = [
    'mainhand', 'offhand', 'head', 'chest', 'shoes', 'cape', 'bag', 'food', 'potion'
];
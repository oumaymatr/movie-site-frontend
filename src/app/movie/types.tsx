export interface Movie {
    _id: string;
    titre: string;
    description: string;
    affiche: string;
    note: string;
    date_de_sortie: string; // or Date if you plan to handle it as a Date object
  }
import { MenuItem } from './menu.model';

export const MENUvisiteur: MenuItem[] = [

  {
    id: 7,
    label: 'Vente',
    link: '/catalog/sale',
    parentId: 4
  },
  {
    id: 5,
    label: 'Location',
    link: '/catalog/rent',
    parentId: 4
  },
  // {
  //   id: 18,
  //   label: 'Paiement',
  //   link: '/vendor/property-promotion',
  //   parentId: 16,
  //
  // },
  // {
  //   id: 35,
  //   label: 'Advertisement',
  //   link: '/advertisement/add-advertisement',
  // },
  // {
  //   id: 26,
  //   label: 'Contacts',
  //   link: '/pages/contacts',
  // },
];
export const MENU: MenuItem[] = [

  {
    id: 7,
    label: 'Vente',
    link: '/catalog/sale',
    parentId: 4
  },
  {
    id: 5,
    label: 'Location',
    link: '/catalog/rent',
    parentId: 4
  },
  {
    id: 18,
    label: 'Paiement',
    link: '/vendor/property-promotion',
    parentId: 16,

  },
  // {
  //   id: 35,
  //   label: 'Advertisement',
  //   link: '/advertisement/add-advertisement',
  // },
  // {
  //   id: 26,
  //   label: 'Contacts',
  //   link: '/pages/contacts',
  // },

  {
    id: 7,
    label: 'Mon compte',

    subItems: [

      {
        id: 8,
        label: 'Informations personnelles',
        link: '/account/info',
        parentId: 7
      },
      {
        id: 10,
        label: 'Mes annonces',
        link: '/account/properties',
        parentId: 7
      },

    ]
  },
];

export const MENUAdmin: MenuItem[] = [

  {
    id: 7,
    label: 'Vente',
    link: '/catalog/sale',
    parentId: 4
  },
  {
    id: 5,
    label: 'Location',
    link: '/catalog/rent',
    parentId: 4
  },
  {
    id: 18,
    label: 'Paiement',
    link: '/vendor/property-promotion',
    parentId: 16,

  },
  // {
  //   id: 35,
  //   label: 'Advertisement',
  //   link: '/advertisement/add-advertisement',
  // },
  // {
  //   id: 26,
  //   label: 'Contacts',
  //   link: '/pages/contacts',
  // },

  {
    id: 8,
    label: 'Profil',
    link: '/account/info',
    parentId: 7
  },
  {
    id: 18,
    label: 'Tableau de bord',
    link: '/pages/blog-grid',
    parentId: 16,

  },
  {
    id: 22,
    label: 'Liste des utilisateurs',
    link: '/pages/about',
  }
];

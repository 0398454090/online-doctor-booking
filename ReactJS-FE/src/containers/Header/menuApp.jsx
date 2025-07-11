
export const adminMenu = [
    // Menu for admin users
    { 
        name: 'menu.admin.manage-user', menus: [
            {
                name: 'menu.admin.manage-doctor', link: '/system/user-doctor',
            },
            {
                name: 'menu.admin.manage-admin', link: '/system/user-admin',
            },
            {
                name: 'menu.admin.manage-patient', link: '/system/user-patient',
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux',
            }
        ]
    },
    // manage clinic
    {
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic',
            }
        ] 
    },
    // manage speciality
    {
        name: 'menu.admin.speciality',
        menus: [
            {
                name: 'menu.admin.manage-speciality', link: '/system/manage-speciality',
            }
        ]
    },
    // manage handbook
    {
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook',
            }
        ]
    }

];
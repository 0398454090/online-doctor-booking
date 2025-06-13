'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Users', [{
                email: 'admin@gmail.com.com',
                password: '123456', // mật khẩu đã hash
                firstName: 'Ngoc',
                lastName: 'Pham',
                address: 'Ho Chi Minh',
                gender: 1,
                typeRole: 'ROLE',
                keyRole: 'R1',
                phonenumber: '0123456789',
                positionId: 'pos1',
                image: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            // bạn có thể thêm nhiều record nữa ở đây
        ], {});
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
    }
};
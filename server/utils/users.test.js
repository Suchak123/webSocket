const {expect} = require('expect');

const {Users} = require('./users');

describe('Users', () => {

    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: "1",
            name: "Mike",
            room: "Room1"
        },{
            id: "2",
            name: "Sam",
            room: "Room2"
        },{
            id: "3",
            name: "Juan",
            room: "Room1"
        }
    ]
    })

    it('should add new user', () => {
        let users = new Users();
        let user = {
            id: "sdncnd",
            name: "Mackle",
            room: "Room1"
        };

        let reUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should return name for room1', ()=> {
        let userList = users.getUserList('Room1');

        expect(userList).toEqual(['Mike', 'Juan'])
    });
    it('should return name for room2', ()=> {
        let userList = users.getUserList('Room2');

        expect(userList).toEqual(['Sam'])
    });
    it('should find user', ()=> {
        let userID = '2',
        user = users.getUser(userID);

        expect(user.id).toBe(userID);
    });
    it('should not find user', ()=> {
        let userID = '150',
        user = users.getUser(userID);

        expect(user).toBeUndefined();
    });

    it('should remove a user', () => {
        let userID = '1',
        user = users.removeUser(userID);

        expect(user.id).toBe(userID);
        expect(users.users.length).toBe(2);
    });
    it('should not remove a user', () => {
        let userID = '108',
        user = users.removeUser(userID);

        expect(user).toBeUndefined();
        expect(users.users.length).toBe(3);
    });
});
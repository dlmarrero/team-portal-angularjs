describe('app root', function () {

    beforeEach(module('app'));

    it('should have a registerCtrl', function () {
        expect(registerCtrl).toBeDefined();
    })
})
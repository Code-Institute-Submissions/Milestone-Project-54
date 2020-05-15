describe("JQuery test", function() {
        it("should find jQuery", function() {
            expect($).not.toBeNull();
        });  
});
describe("rating test", function() {
        it("should return for one star", function() {
           
            expect(rating(1)).toEqual("1");
        });  
});

describe("JQuery test", function() {
        it("should find jQuery", function() {
            expect($).not.toBeNull();
        });  
});
describe("Send Email test", function() {
        it("should find loggrd out SUCCESS! 200 OK", function() {
          $(":submit").trigger('submit');   
         sendEmail("Rimantas");
         expect($(this.val())).havetoBeCalledWith("Undefined");
        });  
});

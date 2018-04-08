var InstagramShare = require("nativescript-instagram-share").InstagramShare;
var instagramShare = new InstagramShare();

describe("greet function", function() {
    it("exists", function() {
        expect(instagramShare.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(instagramShare.greet()).toEqual("Hello, NS");
    });
});
function handler(event) {
    var request = event.request;
    console.log('This is my cloudfront function test 🎉!!!');
    return request;
}
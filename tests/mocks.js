function MockResponse() {
    this.status = (code) => {
        this.code = code;
        return this;
    }
    this.send = (body) => {
        this.body = body;
        return this;
    }
};

function MockRequest(params, body) {
    this.params = params;
    this.body = body;
};

module.exports.MockRequest = MockRequest;
module.exports.MockResponse = MockResponse;
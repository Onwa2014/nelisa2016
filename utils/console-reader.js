module.exports = function(stream){

    var self = this;

    this.records = [];

    var stream = stream;
    var originalWriter = stream.write;

    this.start = function(){
        self.records = [];
        stream.write = function(string){
            self.records.push(string.trim());
        };
    }

    this.stop = function(){
        stream.write = originalWriter;
    }
};
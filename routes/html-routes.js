module.exports = function(app) {
    // open the home page 
    app.get('/', function(req,res){
        res.render('index',)
    });
}
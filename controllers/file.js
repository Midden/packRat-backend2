var File = require('../models/file.js');

//=============================
// List
//=============================
exports.index = function (req, res) {
    File.find(function (err, people) {
        if (err) throw err;

        res.send(people);
    });
};

//=============================
// Show
//=============================
exports.show = function (req, res) {
    var id = req.params.id;

    File.findOne({_id: id}, function (err, file) {
        if (err) throw err;

        res.send(file);
    });
};

//=============================
// Create
//=============================
exports.create = function (req, res) {

    var file = new File();

    console.log(req.files);

    file.title = req.body.title;
    file.description = req.body.description;
    file.attach('file', req.files.file, function (error) {
        if (error) {
            return res.send(error);
        } else {
            return res.send(file);
        }
    });

};

//=============================
// Update
//=============================
exports.update = function (req, res) {
    var id = req.params.id;

    File.findOneAndUpdate({_id: id}, req.body, function (err, file) {
        if (err) throw err;

        res.send(file);
    });
};

//=============================
// Delete
//=============================
exports.delete = function (req, res) {
    var id = req.params.id;

    File.remove({_id: id}, function (err) {
        if (err) throw err;

        res.send(200);
    });
};

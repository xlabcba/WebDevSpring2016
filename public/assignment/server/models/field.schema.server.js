module.exports = function(mongoose) {

    // use mongoose to declare a field schema
    var FieldSchema = mongoose.Schema({
        label: String,
        type: {type: String, enum: ['TEXT', 'EMAIL', 'PASSWORD', 'TEXTAREA', 'OPTIONS', 'DATE', 'RADIOS', 'CHECKBOXES']},
        placeholder: String,
        options: [{label: String, value: String}]
    }, {collection: 'project.field'});

    return FieldSchema;

};
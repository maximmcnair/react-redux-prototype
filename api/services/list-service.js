module.exports = function (connection) {
  var service = {}
    , Model = connection.model('List')

  /**
   * Create
   */
  service.create = function(data, callback){
    var newDocument = new Model({
      title: data.title
    })
    newDocument.save(function(error, document) {
      if (error) {
        console.log('Error creating new list document', error)
        callback(true, {})
      } else {
        callback(false, document)
      }
    })
  }

  /**
   * Read
   */

  /**
   * Update
   */
  service.update = function(data, callback){
    // find the right list
    Model.findById(data._id, function (error, document) {
      if (error) {
        console.log('Error creating new list document', error)
        callback(true)
      }else{
        // update title
        document.title = data.title
        // save it
        document.save(function (error, updatedDocument) {
          callback(false, updatedDocument)
        })
      }
    })
  }

  /**
   * Delete
   */


  return service
}

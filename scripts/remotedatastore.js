(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error('No remote URL supplied.');
    }
    this.serverUrl = url;
  }

  RemoteDataStore.prototype.add = function(key, val) {
    $.post(this.serverUrl, val, function(serverResponse) {
      console.log(serverResponse);
    });
  };

  RemoteDataStore.prototype.getAll = function(cb) {
    $.get(this.serverUrl, function(serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.get = function(key, cb) {
    $.get(this.serverUrl + '/' + key, function(serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.remove = function(key) {
    var  deleteItem = this.serverUrl;
    $.ajax({
      type: 'GET',
      url: this.serverUrl + '?emailAddress=' + key,
      success: function(serverResponse) {
        console.log(serverResponse);
        $.ajax({
          type: 'DELETE',
          url: deleteItem + '/' + $(serverResponse).attr('id')
        });
      },
      error: function(serverResponse) {
        console.log(serverResponse);
      }
    });
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;

})(window);

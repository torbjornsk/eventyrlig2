var WebSqlStore = function(successCallback, errorCallback) {

  this.initializeDatabase = function(successCallback, errorCallback) {
    var self = this;
    this.db = window.openDatabase("BildeDB", "1.0", "Bilder! DB", 200000);
    this.db.transaction(
        function(tx) {
          self.createTable(tx);
        },
        function(error) {
          console.log('Transaction error: ' + error);
          if (errorCallback) errorCallback();
        },
        function() {
          console.log('Transaction success');
          if (successCallback) successCallback();
        }
    )
  }

  this.createTable = function(tx) {
    var sql = "CREATE TABLE IF NOT EXISTS bilde ( " +
        "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
        "bilde IMAGE);";
    tx.executeSql(sql, null,
        function() {
          console.log('Create table success');
        },
        function(tx, error) {
          alert('Create table error: ' + error.message);
        });
  }

  this.findById = function(id, callback) {
    this.db.transaction(
        function(tx) {

          var sql = "SELECT * FROM bilde where id = :id";

          tx.executeSql(sql, [id], function(tx, results) {
            callback(results.rows.length === 1 ? results.rows.item(0) : null);
          });
        },
        function(error) {
          alert("Transaction Error: " + error.message);
        }
    );
  };

  this.lagreBilde = function(bilde, callback) {
    this.db.transaction(function(tx) {
      var sql = "INSERT INTO bilde (bilde) values (:bilde)";

      tx.executeSql(sql, [bilde], function(tx, results) {
        callback("Bilde ble lagret :)");
      });
    }, function(error) {
      alert("Noe gikk i dass: " + error.message);
    })
  };

  this.hentAlleBilder = function(callback) {
    this.db.transaction(
        function(tx) {
          var sql = "SELECT * FROM bilde";

          tx.executeSql(sql, [], function(tx, results) {
            callback(results);
          })
        },
        function(error) {
          alert("Det gikk heller dårlig du.." + error.message);
        }
    )
  };

  this.initializeDatabase(successCallback, errorCallback);

}

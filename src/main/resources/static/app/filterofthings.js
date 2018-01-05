define(function () {
  return {
      errors: null,
      config: {},
      filter: "",
      filteredThings: [],
      things: {},
      init: function() {
          const self = this;
          let loadPromise = this.loadConfig();
          loadPromise.then(function() {
              self.loadThings().then(function(){}, function(error) {
                  console.log(error);
                  if (self.errors) {
                      self.showErrors();
                  }
              });
          }, function(error) {
              console.log(error);
              if (self.errors) {
                  self.showErrors();
              }
          });
      },
      loadConfig: function() {
          // TODO load this from a service
          this.config = {
              type: "GET",
              url: "http://localhost:8080/things",
              filterField: "identifier",
              sortField: "identifier",
              headers: [
                  {
                      field: "identifier",
                      display: "Identifier",
                      width: 10
                  },
                  {
                      field: "description",
                      display: "Description",
                      width: 80
                  },
                  {
                      field: "value",
                      display: "Value",
                      width: 10
                  }
              ]
          };
          return new Promise(function(resolve) { resolve(); });
      },
      loadThings: function() {
          const self = this;
          return $.ajax({
              type: self.config.method,
              url: self.config.url,
              success : function(response) {
                  self.things = response;
                  self.filterThings();
                  self.updateDisplay();
              },
              error: function (xhr, ajaxOptions, thrownError) {
                  console.log(xhr.status + ':' + thrownError);
                  self.errors = "Failed to load things from " + self.config.url;
              }
          });
      },
      showErrors : function() {
          $("#errors").text(this.errors);
          $("#errors").show();
      },
      setFilter : function(filter) {
          this.filter = filter;
      },
      filterThings : function() {
          const self = this;
          const regExp = this.filter.replace(/[*]/g, ".*");
          const re = new RegExp(regExp);

          this.filteredThings = [];
          for (let i = 0; i < this.things.length; i++) {
              if (this.filter.trim() === "" || re.test(this.things[i][this.config.filterField])) {
                  this.filteredThings.push(this.things[i]);
              }
          }

          this.filteredThings.sort(function(a, b){
              const x = a[self.config.sortField].toLowerCase();
              const y = b[self.config.sortField].toLowerCase();
              return x < y ? -1 : x > y ? 1 : 0
          });
      },
      updateDisplay : function() {
          // TODO Use templates
          let contents = `<div class="table">
            <div class="headerRow">`;

          for (let i = 0; i < this.config.headers.length; i++) {
              contents += '<div class="col-' + i + '" style="width:' + this.config.headers[i].width + '%">' + this.config.headers[i].display + '</div>'
          }

          contents += '</div>';

          for (let i = 0; i < this.filteredThings.length; i++) {
              const currentThing = this.filteredThings[i];
              let row = '<div class="row">';
              for (let i = 0; i < this.config.headers.length; i++) {
                  row += '<div class="col-' + i + '">' + currentThing[this.config.headers[i].field] + '</div>'
              }
              row += '</div>';
              contents += row;
          }
          contents += '</div>';
          $('#contents').html(contents);
      }
  };
});

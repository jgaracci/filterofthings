define(['jquery', 'handlebars', 'text!../../templates/listofthings.html'],
    function ($, Handlebars, listofthings) {
        Handlebars.registerHelper('headers', function(headers) {
            let result = "";
            for (let i = 0; i < headers.length; i++) {
                result += '<div class="col-' + i + '" style="width:' + headers[i].width + '%">' + headers[i].display + '</div>';
            }
            return result;
        });

        Handlebars.registerHelper('things', function(data) {
            let result = "";

            for (let i = 0; i < data.filteredThings.length; i++) {
                const currentThing = data.filteredThings[i];
                let row = '<div class="row">';
                for (let i = 0; i < data.headers.length; i++) {
                    row += '<div class="col-' + i + '">' + currentThing[data.headers[i].field] + '</div>'
                }
                result += row + '</div>';
            }

            return new Handlebars.SafeString(result);
        });

        return {
            errors: null,
            configs: null,
            filter: "",
            filteredThings: [],
            listofthingstemplate: Handlebars.compile(listofthings),
            things: {},
            init: function () {
                const self = this;
                let loadPromise = this.loadConfig();
                loadPromise.then(function () {
                    self.loadThings().then(function () {
                    }, function (error) {
                        console.log(error);
                        if (self.errors) {
                            self.showErrors();
                        }
                    });
                }, function (error) {
                    console.log(error);
                    if (self.errors) {
                        self.showErrors();
                    }
                });
            },
            loadConfig: function () {
                const self = this;
                if (this.configs)
                {
                    return new Promise(function(resolve){
                        resolve();
                    });
                }

                return $.ajax({
                    type: "GET",
                    url: "http://localhost:8080/configurations",
                    success: function (response) {
                        self.configs = response;
                        for (let key in self.configs) {
                            if (self.configs.hasOwnProperty(key)) {
                                $("#configurations").append($("<option />").val(key).text(key));
                            }
                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        console.log(xhr.status + ':' + thrownError);
                        self.errors = "Failed to load configuration for things";
                    }
                });
            },
            getCurrentConfig: function() {
                const selectedConfig = $('#configurations option:selected').text();
                return this.configs[selectedConfig];
            },
            loadThings: function () {
                const self = this;
                const config = this.getCurrentConfig();
                return $.ajax({
                    type: config.method,
                    url: config.url,
                    success: function (response) {
                        const responseData = self.getDataFromResponse(response, config.responseDataPath);
                        self.things = self.convertThings(responseData);
                        self.filterThings();
                        self.updateDisplay();
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        console.log(xhr.status + ':' + thrownError);
                        self.errors = "Failed to load things from " + config.url;
                    }
                });
            },
            getDataFromResponse : function(response, responseDataPath) {
                if (responseDataPath) {
                    if (responseDataPath.length > 0) {
                        const key = responseDataPath.split(".")[0];
                        const nextPathIndex = responseDataPath.indexOf(".");
                        if (nextPathIndex > 0)
                        {
                            return this.getDataFromResponse(response[key], responseDataPath.substring(nextPathIndex + 1));
                        }
                        return response[key];
                    }
                }
                else {
                    return response;
                }
            },
            convertThings : function(responseData) {
                let convertedThings = responseData;
                const config = this.getCurrentConfig();

                if (config.dataType === "map") {
                    convertedThings = [];
                    for (let key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            convertedThings.push({
                                "identifier" : key,
                                "value" : responseData[key]
                            });
                        }
                    }
                }

                return convertedThings;
            },
            showErrors: function () {
                const errorsElement = $("#errors");
                errorsElement.text(this.errors);
                errorsElement.show();
            },
            setFilter: function (filter) {
                this.filter = filter;
            },
            filterThings: function () {
                const config = this.getCurrentConfig();

                const regExp = this.filter.replace(/[*]/g, ".*");
                const re = new RegExp(regExp);

                this.filteredThings = [];
                for (let i = 0; i < this.things.length; i++) {
                    if (this.filter.trim() === "" || re.test(this.things[i][config.filterField])) {
                        this.filteredThings.push(this.things[i]);
                    }
                }

                this.filteredThings.sort(function (a, b) {
                    const x = a[config.sortField].toLowerCase();
                    const y = b[config.sortField].toLowerCase();
                    return x < y ? -1 : x > y ? 1 : 0
                });
            },
            updateDisplay: function () {
                const config = this.getCurrentConfig();
                const contents = this.listofthingstemplate({
                    data : {
                        headers: config.headers,
                        filteredThings: this.filteredThings
                    }
                });
                $('#contents').html(contents);
            }
        };
    });

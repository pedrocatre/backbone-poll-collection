/**
 * View responsible for rendering the data monitor page
 */
define(['backbone', 'masterView', 'handlebars', 'text!../app/modules/dataMonitor/dataMonitorPage/dataMonitorPageBody.html', 'processListView', 'processCollection'],
    function (Backbone, MasterView, Handlebars, DataMonitorPageBodyTemplate, ProcessListView, ProcessCollection) {
        var DataMonitorPage = MasterView.extend({

            dom: {
                PROCESSCONTAINER: '.process-container-js'
            },

            initialize: function () {
                this.dataMonitorPageBodyTemplate = Handlebars.compile(DataMonitorPageBodyTemplate);

                // Setup some example options for the Backbone Poll Collection
                var pollOptions = {
                    havingProblemsFetchingFromTheServer: false,
                    refresh: 2000,
                    doneFetchCallback: function() {
                        console.log('Done with the fetch request');
                    },
                    failedFetchCallback: function() {
                        console.log('The request failed');
                        if(!this.havingProblemsFetchingFromTheServer) {
                            this.havingProblemsFetchingFromTheServer = true;
                            console.log('Had a problem requesting from the server. Going to keep trying.')
                        }
                    },
                    alwaysCallback: function() {
                        console.log('Finished another fetch request');
                    }
                }
                this.processCollection = new ProcessCollection([], pollOptions);
                MasterView.prototype.initialize.apply(this);
                return this;
            },

            render: function() {
                var self = this;
                this._removeSubViews();
                this.$el.html(this.dataMonitorPageBodyTemplate());
                this.processListView = new ProcessListView({el: this.$el.find(this.dom.PROCESSCONTAINER), collection: this.processCollection}).render();
                this.processCollection.startFetching();
                this.subViews.push(this.processListView);
                return this;
            },

            remove: function() {
                MasterView.prototype.remove.apply(this);
            }

        });
        return DataMonitorPage;
    });
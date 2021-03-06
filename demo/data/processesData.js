/**
 * Generate dummy process data
 */
(function() {
    var uuid = require('node-uuid'),
        processesData = [],
        MAX_NUMBER_OF_PROCESSES = 10,
        countToCreateNew = 0;

    var updateExistingProcesses = function() {
        for(var i=0; i< processesData.length; i++) {
            processesData[i].numberOfProcessedFiles++;
            processesData[i].percentageComplete += Math.floor((Math.random()*4)+1);
            processesData[i].percentageComplete =
                (processesData[i].percentageComplete > 100) ? 100: processesData[i].percentageComplete;
        }
    };

    var sampleTypesOfProcess = ['Tests', 'Performance', 'Nightly', 'Compressing', 'Hive', 'Backup'];
    var sampleTitlesByType = {
        Tests: 'Selenium UI Tests',
        Performance: 'FE performance CI Job',
        Nightly: 'Nightly Master CI Job',
        Compressing: 'Compressing Old Data',
        Hive: 'Sales Report Hive Job',
        Backup: 'DB Backup'
    };

    var createNewProcess = function() {
        var typeOfProcess = sampleTypesOfProcess[Math.floor((Math.random() * sampleTypesOfProcess.length))];
        return {
            'id': uuid.v4(),
            'typeOfProcess': 'Executing',
            'percentageComplete': Math.floor((Math.random() * 20) + 1),
            'state': 'executing',
            'numberOfProcessedFiles': Math.floor((Math.random() * 5) + 1),
            'title': sampleTitlesByType[typeOfProcess] + ' (' + Math.floor((Math.random() * 99) + 1) + ')',
            'type': typeOfProcess
        };
    };

    var REFRESH_RATE_MS = 500;

    var startGeneratingData = function(refreshRateMs) {
        var self = this;
        this.timeout = setTimeout(function() {

            // Update existing processes
            updateExistingProcesses();

            // Create new process
            if(countToCreateNew++ > 10) {
                processesData.push(createNewProcess());
                countToCreateNew = 0;
            }

            // Remove excess processes
            if(processesData.length > MAX_NUMBER_OF_PROCESSES) {
                processesData.splice(0, MAX_NUMBER_OF_PROCESSES/2);
            }

            startGeneratingData(REFRESH_RATE_MS);
        }, refreshRateMs );

    };

    startGeneratingData(0);

    module.exports = processesData;
}).call(this);

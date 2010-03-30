$.tablesorter.addWidget({ 
    // give the widget a id and default-config
    id: "csvexport",
    triggerEvent: 'click',
    triggerEl: '.csvexport-button',
    targetEl: '.csvexport-target',
    seperator: ';',
    // format is called when the on init and when a sorting has finished 
    format: function(table) {
        var widget = this;

        // overwrite defaults with custom-config
        if (table.config.widgetcsvexport) {
          if (table.config.widgetcsvexport.triggerEvent) {
            widget.triggerEvent = table.config.widgetcsvexport.triggerEvent;
          }
          if (table.config.widgetcsvexport.triggerEl) {
            widget.triggerEl = table.config.widgetcsvexport.triggerEl;
          }
          if (table.config.widgetcsvexport.target) {
            widget.targetEl = table.config.widgetcsvexport.targetEl;
          }
          if (table.config.widgetcsvexport.seperator) {
            widget.seperator = table.config.widgetcsvexport.seperator;
          }
        }

        // the trigger-button
        $(widget.triggerEl).bind(widget.triggerEvent, function(){
          $(table).trigger("csvexport");
        }); 
        
        // the export function
        $(table).bind('csvexport', function() {
          var csv = '';

          // collect all TH headers
          if (table.tHead) {
            var h = [];  
            for (var j=0; j < table.tHead.rows[0].cells.length; j++) {
                h.push( "" + $(table.tHead.rows[0].cells[j]).text() + "" ); 
            } 
            csv += h.join(widget.seperator) + "\n";
          }

          // loop all tr elements and collect all TD cells
          if (table.tBodies && table.tBodies[0]) {
            for(var i=0; i < table.tBodies[0].rows.length; i++) {
                var td = [];
                for (var j=0; j < table.tBodies[0].rows[i].cells.length; j++) {
                  td.push( "" + $(table.tBodies[0].rows[i].cells[j]).text() + "" );
                }
                csv += td.join(widget.seperator) + "\n";
            }
          }
          $(widget.targetEl).html(csv);
        });
    } 
});

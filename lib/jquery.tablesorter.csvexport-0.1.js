$.tablesorter.addWidget({
  // give the widget a id and default-config
  id: "export_csv",
  triggerEvent: 'click',
  triggerEl: '.export-csv-button',
  targetEl: '.export-csv-target',
  seperator: ';',
  // format is called when the on init and when a sorting has finished
  format: function(table) {
    var widget = this;

    // apply custom-config
    $.extend(widget, table.config.widgetcsvexport);

    // the trigger-button
    $(widget.triggerEl).bind(widget.triggerEvent, function(){
      $(table).trigger("export-csv");
    });

    // the export function
    $(table).bind('export-csv', function() {
      var csv = '';

      // collect all TH headers
      if (table.tHead) {
        var h = [];
        for (var j=0; j < table.tHead.rows[0].cells.length; j++) {
            h.push("\"" + $(table.tHead.rows[0].cells[j]).text() + "\"");
        }
        csv += h.join(widget.seperator) + "\n";
      }

      // loop all tr elements and collect all TD cells
      if (table.tBodies && table.tBodies[0]) {
        for(var i=0; i < table.tBodies[0].rows.length; i++) {
            var td = [];
            for (var j=0; j < table.tBodies[0].rows[i].cells.length; j++) {
              td.push("\"" + $(table.tBodies[0].rows[i].cells[j]).text() + "\"");
            }
            csv += td.join(widget.seperator) + "\n";
        }
      }
      $(widget.targetEl).html(csv);
    });
  }
});

(function($) {
  $.extend({
    tablesorterExportCsv: new function() {

      function generateCsv(table) {
        var csv = "";

        if (table.tHead) {
          var h = [];
          for (var j=0; j < table.tHead.rows[0].cells.length; j++) {
              h.push("\"" + $(table.tHead.rows[0].cells[j]).text() + "\"");
          }
          csv += h.join(table.config.seperator) + "\n";
        }

        // loop all tr elements and collect all TD cells
        if (table.tBodies && table.tBodies[0]) {
          for(var i=0; i < table.tBodies[0].rows.length; i++) {
            var td = [];
            for (var j=0; j < table.tBodies[0].rows[i].cells.length; j++) {
              td.push("\"" + $(table.tBodies[0].rows[i].cells[j]).text() + "\"");
            }
            csv += td.join(table.config.seperator) + "\n";
          }
        }

        return csv;
      }

      function installBindings(table) {
        table.config.container.find(table.config.trigger_element).bind('click', function() {
          download(generateCsv(table));
        });
      }

      /* TODO: provide real download solution */
      function download(csv) {
        var generator = window.open('', 'csv', 'height=400,width=600');
        generator.document.write('<html><head><title>CSV</title>');
        generator.document.write('</head><body >');
        generator.document.write('<textArea cols=70 rows=15 wrap="off" >');
        generator.document.write(csv);
        generator.document.write('</textArea>');
        generator.document.write('</body></html>');
        generator.document.close();

        return true;
      }

      this.defaults = {
        trigger_element: '.export-csv-button',
        seperator: ';'
      };

      this.construct = function(settings) {
        return this.each(function() {
          config = $.extend(this.config, $.tablesorterExportCsv.defaults, settings);
          installBindings(this);
        });
      }
    }
  });

  // extend plugin scope
  $.fn.extend({
      tablesorterExportCsv: $.tablesorterExportCsv.construct
  });
})(jQuery);

javascript:
// Creador -> *REYCACTUS*
    /*Update list:
    V1.0 - Creado el 12/06/2020
    */
    
$("#trades_groups").remove()

let groupTable = '<table id="trades_groups" class="vis overview_table">\
	<tbody>\
	   <tr><th>Destinatario</th><th>Pueblo</th><th>Madera</th><th>Barro</th><th>Hierro</th></tr>\
    </tbody>\
</table>'

$("#trades_table").before(groupTable)

let trades = []
let rows = $("#trades_table tr").length

$("#trades_table tr").each(function(i) {
    if (i != 0 && i<rows-1) {
        let player = $(this).find("td:eq(4)").html()
        let village = $(this).find("td:eq(5)").html()
        let wood = $(this).find('.wood').parent().contents().filter(function() {
            return this.nodeType == 3;
        }).text()
        if (wood.length == 0) { wood = 0 }
        let stone = $(this).find('.stone').parent().contents().filter(function() {
            return this.nodeType == 3;
        }).text()
        if (stone.length == 0) { stone = 0 }
        let iron = $(this).find('.iron').parent().contents().filter(function() {
            return this.nodeType == 3;
        }).text()
        if (iron.length == 0) { iron = 0 }

        if (trades.length > 0) {
            for (x=0; x<trades.length; x++) {
                if(trades[x].village == village) {
                    trades[x].wood += parseInt(wood)
                    trades[x].stone += parseInt(stone)
                    trades[x].iron += parseInt(iron)
                    return true
                }
            }
        }

        trades.push({'player':player,
                    'village':village,
                    'wood':parseInt(wood),
                    'stone':parseInt(stone),
                    'iron':parseInt(iron)})       
    }
})

for (i=0; i<trades.length; i++) {
    let t = trades[i]
    $("#trades_groups tbody").append("<tr><td>"+t.player+"</td><td>"+t.village+"</td>"+
    "<td><span class='nowrap'><span class='icon header wood' title='Madera'> </span>"+t.wood+"</span></td>"+
    "<td><span class='nowrap'><span class='icon header stone' title='Madera'> </span>"+t.stone+"</span></td>"+
    "<td><span class='nowrap'><span class='icon header iron' title='Madera'> </span>"+t.iron+"</span></td>"+
    "</tr>")
}

$("#trades_groups tbody").append("<tr class='row_b'><td colspan=5 align='center'><small>*REYCACTUS*</small></td></tr>")

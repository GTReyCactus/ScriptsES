javascript:
// Creador -> *REYCACTUS*
    /*Update list:
    V1.0 - Creado el 10/06/2020
    V1.0b - Actualizado el 11/06/2020 - Solucionado error cuando los edificios completos se ocultan
    */
    
$("#buildings th:last").after("<th>Tiempo total</th>")

function addTotalTime(id, target) {
    if ($(id).length) {
        let clock = $(id +" .time").parent().contents().filter(function() {
                                                return this.nodeType == 3;
                                            }).text().split(':')
        let duration = ((clock[0]*60)+parseInt(clock[1]))*60+parseInt(clock[2])

        let level =  $(id + " td:first span").html().split(' ')[1]
        let steps = target-level
        let total = 0

        if (level < 10){return false}

        for (x=0; x<steps; x++) {
            let current = level + x
            let up = current + 1
            let time = duration * Math.pow(1.2, x)
            console.log("Level " + current + " to " + up + " in " + time)
            total += time
        }

        hours = Math.round(total/3600) % 24
        days = Math.round((total/3600)/24)

        let text = ''

        if (hours == 0) {
            text = hours + ' h'
        } else {
            text = days + ' d y ' + hours + ' h'
        }

        $(id).append("<td><span class='icon header time'></span>"+text+"</td>")
    }
}

addTotalTime("#main_buildrow_barracks", 25)
addTotalTime("#main_buildrow_stable", 20)
addTotalTime("#main_buildrow_garage", 15)
addTotalTime("#main_buildrow_smith", 20)
addTotalTime("#main_buildrow_market", 25)
addTotalTime("#main_buildrow_wood", 30)
addTotalTime("#main_buildrow_stone", 30)
addTotalTime("#main_buildrow_iron", 30)
addTotalTime("#main_buildrow_farm", 30)
addTotalTime("#main_buildrow_storage", 30)
addTotalTime("#main_buildrow_hide", 10)
addTotalTime("#main_buildrow_wall", 20)

$("#buildings tr:last").after("<td colspan=7 align='center'></td><td><small>*REYCACTUS*</small></td>")

/*
 * Script Name: attackerNote
 * Version: v2.0
 * Last Updated: 2021-01-15
 * Author: *REYCACTUS*
 */

// Globals
let allowedScreens = ['report', 'info_command'];

// Translations
let translations = {
    en_DK: {
        'Set/Get Village Notes': 'Set/Get Village Notes',
        'Note added!': 'Note added!',
        'Note can not be added for this report!': 'Note can not be added for this report!',
        'This script can be run only on single Report view or while tagging an Incoming!':
            'This script can be run only on single Report view or while tagging an Incoming!',
        'No notes found for this village!': 'No notes found for this village!',
        'This script requires Premium Account to be active!': 'This script requires Premium Account to be active!',
    },
    en_US: {
        'Set/Get Village Notes': 'Set/Get Village Notes',
        'Note added!': 'Note added!',
        'Note can not be added for this report!': 'Note can not be added for this report!',
        'This script can be run only on single Report view or while tagging an Incoming!':
            'This script can be run only on single Report view or while tagging an Incoming!',
        'No notes found for this village!': 'No notes found for this village!',
        'This script requires Premium Account to be active!': 'This script requires Premium Account to be active!',
    },
    es_ES: {
        'Set/Get Village Notes': 'Añadir/Obtener Notas de Pueblo',
        'Note added!': '¡Nota añadida!',
        'Note can not be added for this report!': '¡No se puede añadir una nota con este informe!',
        'This script can be run only on single Report view or while tagging an Incoming!':
            '¡Este script solo se puede usar en la vista de informe individual o etiquetando un entrante!',
        'No notes found for this village!': '¡No se han encontrado notas para este pueblo!',
        'This script requires Premium Account to be active!': '¡Este script requiere la cuenta premium activada!',
    }
};

// Add note on village
function addNote(villageId, noteText) {
    TribalWars.post(
        'info_village',
        {
            ajaxaction: 'edit_notes',
            id: villageId,
        },
        {
            note: noteText,
        },
        function () {
            UI.SuccessMessage(tt('Note added!'), 2000);
        }
    );
}

// Init Set Village Notes
function initSetVillageNote() {
    let noteText = '';
    let villageId;

    const reportTime = $('table#attack_info_def')[0].parentNode.parentNode.parentNode.rows[1].cells[1].textContent;
    const attackerPlayerName = $('table#attack_info_att')[0].rows[0].cells[1].textContent;

    const reportId = getParameterByName('view');
    const reportLink = buildReportLink(reportId);

    if (attackerPlayerName !== '---') {
        // Prepare note data
        if (attackerPlayerName == game_data.player.name) {
            villageId = $('table#attack_info_def')[0]
                .rows[1].cells[1].getElementsByTagName('span')[0]
                .getAttribute('data-id');
        } else {
            villageId = $('table#attack_info_att')[0]
                .rows[1].cells[1].getElementsByTagName('span')[0]
                .getAttribute('data-id');
        }

        noteText = '[b][url="${reportLink}"]' + reportTime + '[/url][/b]';
        noteText += '\n' + $('#report_export_code')[0].innerHTML;

        // Add note on village
        addNote(villageId, noteText)

    } else {
        UI.ErrorMessage(tt('Note can not be added for this report!'), 2000);
    }
}


// Helper: Build Report Link
function buildReportLink(reportId) {
    const { origin } = window.location;
    return `${origin}/game.php?screen=report&mode=all&view=${reportId}`;
}

// Helper: Get parameter by name
function getParameterByName(name, url = window.location.href) {
    return new URL(url).searchParams.get(name);
}



// Helper: Text Translator
function tt(string) {
    let gameLocale = game_data.locale;

    if (translations[gameLocale] !== undefined) {
        return translations[gameLocale][string];
    } else {
        return translations['es_ES'][string];
    }
}


(function () {
    const gameScreen = getParameterByName('screen');
    const gameView = getParameterByName('view');
    const commandId = getParameterByName('id');

    if (game_data.features.Premium.active) {
        if (allowedScreens.includes(gameScreen)) {
            if (gameScreen === 'report' && gameView !== null) {
                initSetVillageNote();
            } else {
                UI.ErrorMessage(
                    tt('This script can be run only on single Report view or while tagging an Incoming!'),
                    2000
                );
            }
        } else {
            UI.ErrorMessage(
                tt('This script can be run only on single Report view or while tagging an Incoming!'),
                2000
            );
        }
    } else {
        UI.ErrorMessage(tt('This script requires Premium Account to be active!'));
    }
})();

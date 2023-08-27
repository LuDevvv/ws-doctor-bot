const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSintomas = addKeyword(['síntomas', 'malestares', 'me siento mal', 'dolor de cabeza', 'mareado', 'fiebre', 'tos persistente', 'dolor en el pecho', 'náuseas', 'problemas para respirar'])
    .addAnswer(
        [
            '🩺 Cuéntame más sobre tus síntomas o malestares para que pueda ayudarte mejor.',
            'Puedo proporcionarte información útil sobre diferentes síntomas y afecciones médicas.'
        ]
    );

const flowRecetas = addKeyword(['recetas', 'medicamentos', 'necesito una receta', 'dolor', 'antibiótico', 'gripe', 'alergia', 'dosificación', 'efectos secundarios', 'prescripción'])
    .addAnswer(
        [
            '📄 Si necesitas una receta o información sobre medicamentos, estaré encantado de ayudarte.',
            'Por favor, proporciona detalles sobre el medicamento que estás buscando o la condición para la que necesitas la receta.'
        ]
    );

const flowConsejos = addKeyword(['consejos de salud', 'prevención', 'cuidados', 'dieta', 'ejercicio', 'estrés', 'embarazo', 'higiene', 'corazón', 'sueño'])
    .addAnswer(
        [
            '🏥 Te proporcionaré consejos de salud, medidas de prevención y cuidados para diferentes situaciones.',
            'La salud es importante, y estoy aquí para brindarte información confiable.'
        ]
    );

const flowCitas = addKeyword(['citas', 'agendar cita', 'horario', 'agendar', 'cambiar cita', 'cancelar cita', 'disponibilidad', 'hora', 'emergencia', 'en qué días trabaja el doctor', 'cuánto tiempo dura la cita', 'a qué hora abre la clínica', 'quiero agendar una revisión', 'cambiar cita para la tarde', 'citas disponibles para mañana', 'cuánto cuesta una consulta', 'documentos necesarios para la cita', 'agendar cita para mi hijo'])
    .addAnswer(
        [
            '📅 Para agendar una cita, por favor proporciona tu disponibilidad y te ayudaré a encontrar un horario adecuado.',
            'Si ya tienes una cita programada, también puedo ayudarte con recordatorios y cambios en la cita.',
            'Si tienes una emergencia médica, por favor contáctanos de inmediato.'
        ]
    )
    .addAnswer('🤖 ¿En qué puedo ayudarte con respecto a las citas médicas?', null, null, [flowSintomas, flowRecetas, flowConsejos]);

const flowInicio = addKeyword(
    ['hola', 'saludos', 'buen día', 'hi', '¿cómo estás?', 'buenas', 'hello', 'hey']
)
    .addAnswer('👋 ¡Hola! Soy el asistente médico de tu doctor. ¿En qué puedo ayudarte hoy?')
    .addAnswer(
        [
            'Aquí tienes algunas cosas que puedo hacer:',
            '👉 *síntomas* para obtener información sobre síntomas y malestares',
            '👉 *citas* para agendar o modificar una cita médica',
            '👉 *recetas* para obtener recetas o información sobre medicamentos',
            '👉 *consejos de salud* para obtener recomendaciones sobre cuidados y prevención',
        ],
        null,
        null,
        [flowSintomas, flowCitas, flowRecetas, flowConsejos]
    );

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowInicio, flowSintomas, flowCitas, flowRecetas, flowConsejos])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
}

main()

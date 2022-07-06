// import { iTask, Task } from '../models/task.model.js';
import { iGame } from '../models/game.model.js';
import { iReview, Review } from '../models/review.model';
import { iUser, User } from '../models/user.model.js';
import { encrypt } from '../services/authorization.js';
import { mongooseConnect } from './mongoose.js';

const aUsers: Array<iUser> = [
    {
        name: 'Fernando',
        secondName: 'C.I.A',
        email: 'reserver@cia_secret.com',
        password: '123456',
        avatar: 'https://i.pravatar.cc/300',
        playList: [],
    },
    {
        name: 'Fran',
        secondName: 'Lobo',
        email: 'bluffingceo@gmail.com',
        password: '123456',
        avatar: 'https://i.pravatar.cc/300',
        playList: [],
    },
    {
        name: 'Jorge',
        secondName: 'Pilates',
        email: 'como_comounoso@gmail.com',
        password: '123456',
        avatar: 'https://i.pravatar.cc/300',
        playList: [],
    },
];
const aReview: Array<iReview> = [
    {
        idUser: '',
        idGame: '',
        text: "No te lo pienses, si quieres algún juego para sorprender en una noche de fiesta con amigos,'Dixit'es tu juego. Aparte es la forma de ver la forma de pensar de cada jugador ",
    },
    {
        idUser: '',
        idGame: '',
        text: 'De lejos el juego al que he jugado más en mi vida y eso es por algo, adictivo,competitivo y superjugable en grupo ',
    },
    {
        idUser: '',
        idGame: '',
        text: 'Solo he jugado una partida, tres jugadores. Nos ha gustado, al principio parecía que tenía lagunas, que terminarias pronto sin poder construir mucho, pero no, hemos acabado en una hora con puntos más o menos equitativos y nos ha gustado.',
    },
    {
        idUser: '',
        idGame: '',
        text: 'Es un juego basado en estrategia, que implica una competición sana, es perfecto para piques con amigos y alguna que otra tarde divertida. Sin duda recomendadísimo. Además las expansiones le dan mucha más vida al juego.',
    },
    {
        idUser: '',
        idGame: '',
        text: 'Es un juego que gusta desde el momento 0 es imprescindible tenerlo. para jugar con los amigos es genial, lo llevo casi siempre encima.',
    },
    {
        idUser: '',
        idGame: '',
        text: 'Un juego precioso, pero menos entretenido que los juegos más complejos como Teotihuacan o Great Western Trail. Aún así está muy chulo.',
    },
];

const aGame: Array<iGame> = [
    {
        name: 'Catán',
        description:
            '¡Para ganar al juego de mesa Los Colonos de Catán!que ha vendido más de 15 millones de ejemplares en todo el mundo tienes que negociar bien, ser estratega y que la suerte esté de tu parte para conseguir 10 puntos. La clave está en formar una gran ruta comercial entre tus campos. Piensa tu táctica y negocia.',
        url: '”https://youtu.be/N5SljJbSRgc',
        image: '',
    },
    {
        name: 'Virus',
        description:
            'Virus, es un juego de cartas contagioso. No podrás jugar solo una partida y querrás llevarlo a todas partes contigo. Consigue tener un cuerpo sano y vigoroso mientras contagias con virus los órganos de los demás. El pique y la diversión están garantizados.',
        url: 'https://youtube.com/watch?v=knf9MqQoif0',
        image: '',
    },
    {
        name: 'Pandemic',
        description:
            'Pandemic es posiblemente el juego de mesa cooperativo más conocido de todos. Los jugadores tendrán que enfrentarse como equipo a cuatro enfermedades que asolan el mundo y descubrir sus curas antes de que sea demasiado tarde para la humanidad.',
        url: 'https://youtube.com/watch?v=244nW1D2gzk',
        image: '',
    },
    {
        name: 'Aventureros al tren',
        description:
            '¡Aventureros al Tren! Europa es el nuevo juego de nuestra exitosa serie de aventuras en tren. Los jugadores acumulan cartas de ciertos tipos de vagones, y las usan para construir estaciones, pasar a través de túneles y sobre ferrys, y hacerse con rutas ferroviarias a lo largo y ancho de Europa',
        url: 'https://youtube.com/watch?v=Wgp6i6pZo5E',
        image: '',
    },
    {
        name: '7Wonders',
        description:
            'Eres el líder de una de las siete grandes ciudades de la antigüedad. Desarrolla tu ciudad promoviendo los descubrimientos científicos, las conquistas militares, los acuerdos comerciales y las construcciones más prestigiosas para guiar a tu civilización a la gloria. Mientras tanto, vigila el progreso de tus competidores, ya que comparten ambiciones similares. ¿Logrará tu maravilla sobrevivir a los avatares del tiempo? ',
        url: 'https://youtube.com/watch?v=r2ho73DRABQ',
        image: '',
    },
    {
        name: 'Carcassonne Plus',
        description:
            'Carcassonne es un de los juegos de mesa más conocidos y más jugados del mundo. Carcassonne Plus incluye en una sola caja el juego básico y 11 expansiones, conviertiéndose en un punto de partida ideal para disfrutar y adaptar el juego a tus gustos.',
        url: 'https://youtube.com/watch?v=f4q8pP3w06w',
        image: '',
    },
    {
        name: 'Dixit',
        description:
            'Dixit, es un juego de mesa para todos los públicos. Este juego premiado como Juego del Año en España en el 2009 consta de diferentes cartas con preciosas ilustraciones para dejar volar la imaginación tanto de adultos como de niños',
        url: 'https://youtube.com/watch?v=mqBJ1eGMeeU',
        image: '',
    },
    {
        name: 'Munchkin',
        description:
            'En Munchkin baja al Dungeon. Mata todo lo que encuentres. Apuñala a tus amigos y quédate con sus cosas. Toma el tesoro y corre. Admítelo. Te encanta',
        url: 'https://youtube.com/watch?v=pmmaiVaI44U',
        image: '',
    },
    {
        name: 'Mysterium',
        description:
            'En el juego de mesa Mysterium hay un fantasma que fue ejecutado por un crimen que no cometió y para pasar al otro lado, necesita que los videntes le ayuden a que la verdad salga a la luz. Para ello, los jugadores tendrán que jugar en parte en equipo para ir descartando personajes, objetos con los que se cometió el crimen y los lugares. Así, un jugador será el fantasma y el resto de jugadores los videntes.',
        url: 'https://youtube.com/watch?v=I2vE3fJDNa0',
        image: '',
    },
    {
        name: 'King of Tokyo',
        description:
            'El juego de mesa King of Tokyo (KoT) tiene un objetivo claro, las partidas son cortas y entretenidas. Es sencillo, pero tiene cartas para idear algo de estrategia. En King of Tokyolos jugadores serán unos monstruos enormes que lucharán entre ellos para poder ser el único monstruo vivo en la ciudad y así tener todos los edificios para él solo.',
        url: 'https://youtube.com/watch?v=VKcXITTE144',
        image: '',
    },
    {
        name: 'Las mansiones de la locura',
        description:
            'El mal habita entre estas viejas paredes. Horribles monstruos y espectros acechantes se ocultan en los edificios abandonados de Arkham, Massachusetts. Esperan a que pase algún desorientado para devorarlo o volverlo loco, otros, alimentados por el odio, traman oscuros planes mientras vigilan las calles. Sin embargo, un grupo de valientes investigadores está dispuesto a desentrañar la verdad que se oculta en los rincones de esta ciudad maldita.',
        url: 'https://youtube.com/watch?v=NlyBzojT6ME',
        image: '',
    },
    {
        name: 'Bang!: La Bala',
        description:
            'Desde siempre, los Forajidos cazan al Sheriff y el Sheriff caza a los Forajidos. El Renegado planea en secreto, dispuesto a ponerse de uno u otro lado. La Bala incluye todas las expansiones publicadas hasta la fecha y algunas nuevas sorpresas.',
        url: 'https://youtube.com/watch?v=vKOzgXmMvkw',
        image: '',
    },
    {
        name: 'Ciudadelas',
        description:
            'En Ciudadelas, los jugadores usan a los ciudadanos locales para adquirir oro y construir distritos con los que completar su ciudad medieval. Al final de la partida, ganará el jugador con la ciudad más impresionante.Publicado en 25 idiomas y nominado a numerosos galardones, Ciudadelas es ampliamente reconocido como uno de los grandes juegos de cartas de la era moderna.',
        url: 'https://www.youtube.com/watch?v=LK23FXqbX28',
        image: '',
    },
    {
        name: 'Azul',
        description:
            'Azul es un juego de mesa que evoca la maravillosa estética del arte morisco. Los jugadores compiten en el papel de artesanos que se encuentran decorando las paredes del Palacio Real de Évora. ¿Conseguirás que tu obra pase a la posteridad por su belleza?',
        url: 'https://www.youtube.com/watch?v=xW609WKcO7o',
        image: '',
    },
    {
        name: 'Everdell',
        description:
            'Everdell es un juego dinámico de colocación de trabajadores. Coloca tus trabajadores para reunir recursos, conseguir cartas y realizar acciones especiales; y juega cartas que permitirán desarrollar y poblar tu ciudad. Las combinaciones de cartas te permitirán desarrollar numerosas estrategias y tendrás una infinidad de posibilidades para trabajar en tu ciudad. El jugador que construya la ciudad con más puntos antes del siguiente invierno habrá ganado.',
        url: 'https://www.youtube.com/watch?v=NHtMmjM5M2E',
        image: '',
    },
];

const aTasks: Array<iTask> = [
    { title: 'Tarea 1', responsible: null, isCompleted: false },
    { title: 'Tarea 2', responsible: null, isCompleted: false },
];

export const initDB = async () => {
    const connect = await mongooseConnect();
    aUsers = await Promise.all(
        aUsers.map(async (item) => ({
            ...item,
            passwd: await encrypt(item.password),
        }))
    );
    const users = await User.insertMany(aUsers);
    aTasks[0].responsible = users[0].id;
    aTasks[1].responsible = users[1].id;
    const tasks = await Task.insertMany(aTasks);

    let finalUsers = [];
    for (let i = 0; i < users.length; i++) {
        const item = users[i];
        finalUsers[i] = await User.findByIdAndUpdate(
            item.id,
            {
                $set: { tasks: [tasks[i].id] },
            },
            // { ...item, tasks: [tasks[i].id] },
            { new: true }
        );
    }

    connect.disconnect();
    return {
        tasks,
        users: finalUsers,
    };
};

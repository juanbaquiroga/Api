import { express, json, path, join, urlencoded, dirname, fileURLToPath, engine, router, middlewares, passport, session, passportStrategies, mongoose, User, os, cluster, logger, config, DBClientFactory, IOServer, moment } from './imports.js'
import { messageService } from './services/index.js';


const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express()
const cpus =  os.cpus()
const db = DBClientFactory.getClient(config.database);

const PORT = process.env.PORT || config.port




if(cluster.isPrimary && config.mode.toUpperCase() === 'CLUSTER'){
    cpus.map(()=>{
        cluster.fork()
    })
    cluster.on('exit', (worker)=>{
        logger.info(`${worker.process.pid} died`)
        
        cluster.fork()
    })
}else{
    
    app.use(express.static(join(__dirname, "public")));
    app.use(json())
    app.use(urlencoded({extended:true}))
    app.use(
        session({
            secret: "coderhouse",
            rolling: true,
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 600000
            }
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());


    app.use((req, res, next) => {
        logger.info({
            method: req.method,
            url: req.url
        });
        next();
    });
    
    app.use(middlewares.isLoged)
    app.use(middlewares.isAdmin)
    app.use('/', router)
    app.use(middlewares.invalidUrl)

    


    
    app.engine(
        "hbs", 
        engine({
            extname: ".hbs",
            defaultLayout: join(__dirname, "../views/layouts/main.html"),
            layoputsDir: join(__dirname, "../views/layouts/"),
            partialsDir: join(__dirname, "../views/partials")
        })
    );
    app.set("views", join(__dirname, "../views"))
    app.set("view engine", "hbs");
    


    passport.use("login", passportStrategies.loginStrategy);
    passport.use("register", passportStrategies.registerStrategy);
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser(async (id, done) => {
        const data = await User.findById(id);
        done(null, data)
    });

    await db.connect();
    const expressServer = app.listen(PORT, ()=>{
        logger.info(`server listening port ${PORT}, mode: ${config.mode}`)
    })
    const io = new IOServer(expressServer)

    io.on('connection', async (socket)=>{
        logger.info(`new connection, socket ID: ${socket.id}`)
        
        socket.emit("server:message", await messageService.findAllMessages())
        
        socket.on("client:message", async (message)=>{
            try {
                const date = moment().format('DD/MM/YYYY HH:mm:ss');
                
                await messageService.createMessage({email:message.email, message:message.message, admin:message.admin, username:message.username, date: date})
                io.emit("server:message", await messageService.findAllMessages())
            } catch (error) {
                logger.error(error);
                socket.emit('error', 'Error al enviar el mensaje');
            }
        })
    })
    app.on('error', (err) => {
        logger.error(err);
    })
    
}
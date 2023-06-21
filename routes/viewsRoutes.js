export default async function viewsRoutes(app, options) {
    app.get('/', async (request, reply) => {
        return reply.view('views/index', {
            title: 'Home',
            message: 'Hello World',
        });
    });

    app.get('/about', async (request, reply) => {
        return reply.view('views/about', {
            title: 'About',
            message: 'About Page',
        });
    });

    app.get('/contact', async (request, reply) => {
        return reply.view('views/contact', {
            title: 'Contact',
            message: 'Contact Page',
        });
    });

    app.get('/login', async (request, reply) => {
        return reply.view('views/login', {
            title: 'Login',
            message: 'Login Page',
        });
    });

    app.get('/register', async (request, reply) => {
        return reply.view('views/register', {
            title: 'Register',
            message: 'Register Page',
        });
    });

}
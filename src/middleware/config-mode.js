const configMode = (req, res, next) => {
    res.locals.styles = res.locals.styles || [];
    res.locals.scripts = res.locals.scripts || [];

    if (process.env.NODE_ENV === 'development') {
        const port = process.env.PORT || 3000;
        res.locals.scripts.push(`
            <script>
                const ws = new WebSocket('ws://127.0.0.1:${parseInt(port) + 1}');
                ws.onclose = () => {
                    setTimeout(() => location.reload(), 2000);
                };
            </script>   
        `);
    }

    next();
};

// Use ESM `export default`
export default configMode;

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            MealNUS
            {' '}
            {new Date().getFullYear()}
            {' (UEN: 54231804G).'} All rights reserved.
            <p>Computing 1 (COM1), 13 Computing Drive. Singapore 117417</p>
        </Typography>
    );
}


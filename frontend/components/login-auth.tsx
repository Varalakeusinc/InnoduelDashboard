export async function authenticateUser(email: string, password: string): Promise<boolean> {

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            return true; // Autentication succeeded
        } else {
            return false; // Autentication failed
        }
    } catch (error) {
        console.error('Error with login authentication:', error);
        return false; // Failed
    }
}

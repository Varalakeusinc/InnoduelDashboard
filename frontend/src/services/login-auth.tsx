import axios from "axios";

export async function authenticateUser(email: string, password: string): Promise<boolean> {

    try {
        const response = await axios.post('/auth/login', { email, password });

        if (response.status === 200) {
            return true; // Autentication succeeded
        } else {
            return false; // Autentication failed
        }
    } catch (error) {
        console.error('Error with login authentication:', error);
        return false; // Failed
    }
}

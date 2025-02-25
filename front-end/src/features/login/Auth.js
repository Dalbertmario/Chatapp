import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";


async function Auth() {
    const api = import.meta.env.VITE_API_HOST;
    const token = JSON.parse(localStorage.getItem('token'));

    if (!token) return

    try {
        const response = await fetch(`${api}/authorization/${token.role}`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token.token}` },
        });

        if (!response.ok) {
            const res = await response.text();
            throw new Error(res || 'Error in fetching the auth token');
        }
        const data= await response.json()
        localStorage.removeItem('user')
        localStorage.setItem('user',JSON.stringify(data.userdetails))
        return data
    } catch (err) {
        console.log(err.message);
        throw err;
    }
}

function UseAuth() {
    const navigate = useNavigate()
    const { mutate, isLoading } = useMutation({
        mutationFn: Auth, 
        onSuccess:()=>{
            navigate('/')
        }
    });

    return { mutate, isLoading }; 
}

export default UseAuth;

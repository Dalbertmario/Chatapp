import {useForm} from 'react-hook-form'
import UseSignUp from '../features/login/SignUp'
export default function SignUp() {
const {register,formState:{errors},watch,handleSubmit} = useForm()
const {mutate,isLoding}=UseSignUp()

function handelForm(data){
 mutate({name:data.name,password:data.password,email:data.email})
}
  return (
    <form onSubmit={handleSubmit(handelForm)} className="bg-slate-100 font-stretch-50% flex gap-5 rounded-xl flex-col justify-between p-5 m-auto mt-[200px] h-auto max-w-[500px]">
    <h1 className="text-2xl font-semibold  font-mono text-green-400">Whats App</h1>
     <div className="flex justify-between">
        <label>Full Name</label>
        <input {...register('name',{required:"Full name is required"})} className="inputbtn" type="text" placeholder="Full Name"/>
     </div>
     {errors?.name && <p className='flex justify-center text-red-500'>{errors.name.message}</p>}
     <div className="flex justify-between">
        <label>E-mail</label>
        <input {...register('email',{required:"Email is required"})} className="inputbtn" type="text" placeholder="Email"/>
     </div>
     {errors?.email && <p className='flex justify-center text-red-500'>{errors.email.message}</p>}
     <div className="flex justify-between">
        <label>Password</label>
        <input {...register('password',{required:'Password is required'})} className="inputbtn" type="password" placeholder="Password"/>
     </div>
     {errors?.password && <p className='flex justify-center text-red-500'>{errors.password.message}</p>}
     <div className="flex justify-between">
        <label>Re-password</label>
        <input {...register('Repassword',{required:'Re-password is required',validate:(data)=>data === watch('password') || `Your password doesn't match`})} className="inputbtn" type="password" placeholder="Re-password"/>
     </div>
     {errors?.Repassword && <p className='flex justify-center text-red-500'>{errors.Repassword.message}</p>}
     <button disabled={isLoding} className="btn">Create Account</button>
    
    </form>
  )
}

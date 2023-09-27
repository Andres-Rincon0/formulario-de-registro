import { useForm } from 'react-hook-form'

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm()
  console.log(errors);

  const onSubmit = handleSubmit((data) => {
    console.log(data);

    //antes de enviar 
    //fetch
  })

  return (
    <form onSubmit={onSubmit}>

      {/* nombre */}
      <label htmlFor="nombre">Nombre</label>
      <input
        type="text"
        {...register("nombre", {
          required: {
            value: true,
            message: "nombre es requerido"
          },
          minLength: {
            value: 2,
            message: "Nombre debe tener 2 caracteres almenos"
          },
          maxLength: {
            value: 20,
            message: "Nombre debe tener maximo 20 caracteres"
          }
        })}
      />
      {
        errors.nombre && <span>{errors.nombre.message} </span>
      }

      {/* correo */}
      <label htmlFor="correo">Correo</label>
      <input
        type="email" {...register("correo", {
          required: {
            value: true,
            message: "Correo es requerido"
          },
          pattern: {
            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            message: "Corre no valido"
          }
        })}
      />
      {
        errors.correo && <span>{errors.correo.message}</span>
      }

      {/* contraseña */}
      <label htmlFor="password">Contraseña</label>
      <input
        type="password" {...register("password", {
          required: {
            value: true,
            message: "Contraseña requerida"
          },
          minLength: {
            value: 6,
            message: "La contraseña debe tener al menos 6 caracteres",
          }
        })}
      />
      {
        errors.password && <span>{errors.password.message}</span>
      }

      {/* confirmarContraseña */}
      <label htmlFor="confirmarContraseña">Confirmar contraseña</label>
      <input
        type="password"  {...register("confirmarContraseña", {
          required: {
            value: true,
            message: "cofirma tu contraseña"
          },
          validate: value => value === watch('password') || 'las contraseñas no coinciden'
        })}
      />
      {
        errors.confirmarContraseña && (
          <span>{errors.confirmarContraseña.message}</span>
        )
      }

      {/* fechaNacimiento */}
      <label htmlFor="fechaNacimiento">fecha Nacimiento</label>
      <input
        type="date" {...register("fechaNacimiento", {
          required: {
            value: true,
            message: "Fecha de nacimiento es requerida"
          },
          validate: (value) => {
            console.log(value);
            const fechaNacimiento = new Date(value)
            const fechaActual = new Date()
            const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear()
            /*   console.log(edad); */

            return edad >= 18 || "debe ser mayor de edad"
          }
        })}
      />

      {
        errors.fechaNacimiento && <span>{errors.fechaNacimiento.message}</span>
      }

      {/* pais */}
      <label htmlFor="pais">pais</label>
      <select {...register("pais", {
        required: true
      })}

      >
        <option value="co">Colombia</option>
        <option value="eu">Estados Unidos</option>
        <option value="br">Brazil</option>
        <option value="rs">Rusia</option>
        <option value="ar">Arabia</option>
        <option value="ja">Japon</option>
        <option value="ag">Aregentina</option>
      </select>

      {
        watch('pais') == 'co' && (
          <>
            <input type='text'
              placeholder='Provincia'
              {...register('Provincia', {
                required: {
                  value: true,
                  message: "provincia es requerida"
                },
              })}
            />
            {errors.Provincia && <span>{errors.Provincia.message}</span>}
          </>
        )}

      {/* file */}
      <label htmlFor="foto">Foto_perfil</label>
      <input type="file" onChange={(e)=>{
        console.log(e.target.files[0])
        setValue('fotoDelUsuario', e.target.files[0].name)
      }} />


      {/* terminos y condiciones */}
      <label htmlFor="terminos">Acepto terminos y condiciones</label>
      <input
        type="checkbox" {...register("terminos", {
          required: {
            value: true,
            message: "Debe aceptar termino y condiciones"
          }
        })} 
        />
        {
          errors.terminos && <span>{errors.terminos.message}</span>
        }

      <button type='submit'>
        Enviar
      </button>

      <pre>
        {JSON.stringify(watch(), null, 2)}
      </pre>
    </form>

  )
}
export default App 
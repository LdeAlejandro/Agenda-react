import React from 'react'
import { Link } from 'react-router-dom'

const EditarContatoApp = () =>{
return (

<div>
    EditarContato
   <Link to="/"><button>Cancel</button></Link>
</div>
)
}
export default function EditarContato() {
  return <EditarContatoApp />
}


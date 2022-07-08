import React from 'react';
import { useState } from 'react'
import { HiOutlineZoomIn } from 'react-icons/hi';
import styles from './BuscaCep.module.css';
import api from './Services/Axios';


export default function BuscaCep() {

  const[cep , setCep] = useState('')
  const[busca , setBusca] = useState({})


  async function handleClick(){
      if(cep === ''){
        alert(' Insira um cep')
        return;
      }

      try{
          const resposta = await api.get(`${cep}/json`);
          console.log(resposta.data)
         setBusca(resposta.data)
         setCep('')
      }
      catch{
        alert(' Algo deu errado')
        setCep('');
      }
  }

  return (
    <>
      <div className={styles.Container}>
        <h1> Buscador de CEP </h1>
        <div className={styles.options}>
          <input type="text" placeholder="Insira um CEP" value={cep} onChange={(e) => setCep(e.target.value)}/>
          <button onClick={handleClick}><HiOutlineZoomIn size={25} color="#f14" /></button>
        </div>
        {Object.keys(busca).length > 0 && (
                <div className={styles.cep}>
                <h2> CEP: {busca.cep}</h2>
                <p> IBGE: {busca.ibge}</p> 
                <p> DDD: ({busca.ddd})</p>
                <p> UF: {busca.uf} - Localidade: {busca.localidade}</p>
            </div>
        )}
    
      </div>
    </>
  )
}
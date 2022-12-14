import React, { useContext, useEffect, useState } from "react";
import './style.css'

import InputText from "../../components/InputText";
import InputCheckBox from "../../components/InputCheckBox";
import { useNavigate } from "react-router-dom";
import { ResultContext } from "../../contexts/results";
import { createIniciative } from '../../services/api'

const Initiative = () => {
    const [textAnswers, setTextAnswers] = useState(new Array(6).fill(''))
    const [selectAnswer, setSelectAnswer] = useState('')
    const [checkBoxAnswers, setCheckBoxAnswers] = useState(new Array(4).fill(0))
    const [points, setPoints] = useState(0)
    const [mainOds, setMainOds] = useState(0)
    const [error, setError] = useState(false)
    const [tryAgain, setTryAgain] = useState(false)
    const { storeResult } = useContext(ResultContext)
    const [processEnd, setProcessEnd] = useState(null)
    const navigate = useNavigate()

    const getTextAnswers = (value, index) => {
        var auxArray = [...textAnswers]
        auxArray.splice(index, 1, value)
        setTextAnswers(auxArray)
    }

    const getCheckBoxAnswers = (value, index) => {
        var auxArray = [...checkBoxAnswers]
        auxArray.splice(index, 1, value)
        setCheckBoxAnswers(auxArray)
    }

    const processData = () => {
        const auxResults = new Array(17).fill(0)
        const pointFactor = 100
        let pointsCounter = 0
        let odsMaxIndex = 0
        
        const obsSocial = [3, 3, 4, 4, 4, 4, 5, 5, 5, 10, 10, 10, 10, 16, 16, 16, 16, 16, 16]
        const obsAmbiental = [6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15, 15, 12, 12, 12]
        const obsEconomic = [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 8, 8, 8, 9, 9, 9, 9, 9, 9, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 17, 17, 17, 17]

        const socialData = checkBoxAnswers[1]
        const ambientalData = checkBoxAnswers[2]
        const economicData = checkBoxAnswers[3]

        if(socialData){
            for(let i = 0; i < socialData.length; i++){
                if(socialData[i] === true){
                    auxResults[obsSocial[i]-1] += pointFactor
                }
            }
        }

        if(ambientalData){
            for(let i = 0; i < ambientalData.length; i++){
                if(ambientalData[i] === true){
                    auxResults[obsAmbiental[i]-1] += pointFactor
                }
            }
        }

        if(economicData){
            for(let i = 0; i < economicData.length; i++){
                if(economicData[i] === true){
                    auxResults[obsEconomic[i]-1] += pointFactor
                }
            }
        }

        storeResult(auxResults)

        if(selectAnswer == '1'){
            setSelectAnswer('Sociedade Civil')
        }
        else if(selectAnswer == '2'){
            setSelectAnswer('Institui????o P??blica')
        }
        else if(selectAnswer == '3'){
           setSelectAnswer('Institui????o Privada')
        }

        auxResults.map((eachResult, key) =>{
            if(eachResult > auxResults[odsMaxIndex]){
                odsMaxIndex = key
            }
            pointsCounter += eachResult
        })

        setPoints(pointsCounter)
        setMainOds(odsMaxIndex+1)

        return 1
    }

    const sendDataHandler = async () =>{
        setProcessEnd(processData())
    }

    useEffect(() =>{
        createNewIniciative()
    }, [processEnd])

    const createNewIniciative = async () => {
        if(processEnd === null){
            return
        }
        if(textAnswers[0] && textAnswers[1] && textAnswers[2] && textAnswers[3] && textAnswers[4] && textAnswers[5] && selectAnswer){
            try {
                const locationIQBaseUrl = `https://us1.locationiq.com/v1/search?key=pk.cf85b52eb08904e43721a3a3bbaf234f&q=${textAnswers[2]}&format=json`
                fetch(locationIQBaseUrl)
                    .then((request) => request.json())
                    .then(async (data) =>{
                        const request = await createIniciative(textAnswers[0], textAnswers[1], textAnswers[2], textAnswers[3], textAnswers[4], textAnswers[5], selectAnswer, points, mainOds, parseFloat(data[0].lat), parseFloat(data[0].lat))
                        navigate('/resultado') 
                    })
            } catch (error) {
                console.log(error)
                setTryAgain(false)
                setError(true)
            }
        }
        else{
            setTryAgain(true)
        }
    }

    return(
        <div className="Initiative">
            <div className="InitiativeContainer">
                <InputText index={0} getTextAnswers={getTextAnswers} label="Nome da iniciativa:"/>
                <InputText index={1} getTextAnswers={getTextAnswers} label="Nome completo do respons??vel:"/>
                <InputText index={2} getTextAnswers={getTextAnswers} label="Endere??o completo:" description='ex.: Rua Teres??polis, 275, Vila Am??lia, Nova 
                Friburgo. (N??O inclua o CEP)'/>
                <InputText index={3} getTextAnswers={getTextAnswers} label="Email do respons??vel:"/>
                <InputText index={4} getTextAnswers={getTextAnswers} label="Local de atua????o da iniciativa:"/>
                <InputText index={5} getTextAnswers={getTextAnswers} label="Quantidade de pessoas atendidas:"/>

                <div className="InitiativeArea">
                    <p>Tipo da Institui????o organizadora:</p>
                
                    <select className="form-select" aria-label="Default select example" onClick={(e) => setSelectAnswer(e.target.value)}>
                        <option defaultValue>Selecione sua resposta</option>
                        <option value="1">Sociedade Civil</option>
                        <option value="2">Institui????o P??blica</option>
                        <option value="3">Institui????o Privada</option>
                    </select>
                </div>

                <InputCheckBox 
                    getCheckBoxAnswers={getCheckBoxAnswers}
                    checkBoxIndex={0}
                    title='A iniciativa tem atua????o em qual dos pilares:' 
                    options={['Social', 'Ambiental', 'Econ??mico']}
                />

                {checkBoxAnswers[0][0] === true ?
                    <InputCheckBox 
                        getCheckBoxAnswers={getCheckBoxAnswers}
                        checkBoxIndex={1}
                        title='No ??mbito social (relacionado ??s pessoas), assinale as alternativas que mais se relacionam com o objetivo da sua iniciativa:' 
                        options={[
                            'Sa??de', 'Bem-estar', 'Educa????o b??sica', 'Alfabetiza????o', 'Educa????o para cidadania', 'Educa????o para desenvolvimento sustent??vel', 'Igualdade de g??nero', 'Empoderamento de mulheres e meninas', 'Trabalho dom??stico', 'Redu????o das  desigualdades', 'Aumento de renda dos mais vulner??veis', 'Inclus??o social', 'Econ??mica e pol??tica', 'Pol??ticas migrat??rias e refugiados', 'Paz e justi??a', 'Institui????es eficazes', 'Acesso ?? justi??a', 'Redu????o da viol??ncia', 'Redu????o da corrup????o', 'Gest??o participativa'
                        ]}
                    />
                    :
                    null
                }

                {checkBoxAnswers[0][1] === true ?
                    <InputCheckBox 
                        getCheckBoxAnswers={getCheckBoxAnswers}
                        checkBoxIndex={2}
                        title='No ??mbito ambiental (relacionado ao planeta), assinale as alternativas que mais se relacionam com o objetivo da sua iniciativa:' 
                        options={[
                            'Qualidade da ??gua', '??gua pot??vel', 'Saneamento b??sico/esgoto sanit??rio', 'Economia de ??gua', 'Qualidade de rios e c??rregos', 'Prote????o de mananciais', 'Comit?? de bacias hidrogr??ficas', 'Recursos h??dricos', 'Acesso ?? energia el??trica', 'Energia limpa', 'Consumo e produ????o respons??veis', 'Uso eficiente de recursos naturais', 'Res??duos perigosos ou reuso', 'Turismo sustent??vel', 'Mudan??a do clima', 'Desastres naturais', 'Educa????o para mudan??a do clima', 'Gases do efeito estufa GEE', 'Vida na ??gua', 'Oceanos, mares e recursos marinhos', 'Eutrofiza????o', 'Lixo pl??stico nos mares', 'Pesca', '??reas de prote????o costeira ou marinha', 'Vida terrestre', 'Ecossistemas terrestres', 'Florestas', 'Desertifica????o', 'Degrada????o do solo', 'Biodiversidade', '??reas de prote????o terrestre', 'Desperd??cio de alimentos', 'Gera????o energia limpa', 'Reciclagem ou reuso'
                        ]}
                    />
                    :
                    null
                }

                {checkBoxAnswers[0][2] === true ?
                    <InputCheckBox 
                        getCheckBoxAnswers={getCheckBoxAnswers}
                        checkBoxIndex={3}
                        title='No ??mbito econ??mico (relacionado ?? prosperidade), assinale as alternativas que se relacionam com o objetivo da sua iniciativa:' 
                        options={[
                            'Erradica????o da pobreza', 'Direito ?? moradia', 'Resili??ncia dos pobres e daqueles em situa????o de vulnerabilidade', 'Programas e pol??ticas sociais', 'Fome zero', 'Agricultura sustent??vel', 'Acesso ?? alimentos nutritivos', 'Inseguran??a alimentar', 'Produtividade e renda agr??cola', 'Investimento e desenvolvimento agr??cola', 'Emprego decente', 'Crescimento econ??mico', 'Direitos trabalhistas', 'Ind??stria', 'Pesquisa, desenvolvimento e  inova????o', 'Infraestrutura', 'Microempresas', 'Captura de carbono por atividade industrial', 'Tecnologias de informa????o e comunica????o', 'Cidades e comunidades sustent??veis', 'Habita????o / moradia segura', 'Urbaniza????o de favelas',  'Transporte p??blico', 'Desenvolvimento urbano sustent??vel', 'Patrim??nios culturais e naturais', 'Desastres naturais (mortes e perdas financeiras )', 'Gest??o municipal de res??duos s??lidos urbanos', 'Polui????o do ar', 'Acesso ?? ??reas p??blicas verdes e abertas', 'Acessibilidade ??s ??reas p??blicas', 'Pol??ticas p??blica econ??mico e socioambientais', 'Parcerias e meios de implementa????o', 'Fortalecer a mobiliza????o de recursos internos',  'Aumentar a estabilidade macroecon??mica', 'Coopera????o entre pa??ses para o desenvolvimento'
                        ]}
                    />
                    :
                    null
                }       

                <button onClick={() => sendDataHandler()}>Enviar</button>

                {error || tryAgain ?
                    tryAgain ?
                        <div>
                            <p>Preencha todos os campos do formul??rio...</p>
                        </div>
                        :
                        <div>
                            <p>Ocorreu um erro tente novamente...</p>
                        </div>
                    :
                    null
                }

            </div>
            
        </div>
    )
}

export default Initiative
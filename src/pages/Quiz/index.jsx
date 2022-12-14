import React, { useContext, useState } from "react";
import './style.css'

import { useNavigate } from "react-router-dom";
import { ResultContext } from "../../contexts/results";
import SelectAnswer from "../../components/SelectAnswer";

import odsIcon1 from '../../assets/odsIcons/1.png'
import odsIcon2 from '../../assets/odsIcons/2.webp'
import odsIcon3 from '../../assets/odsIcons/3.png'
import odsIcon4 from '../../assets/odsIcons/4.webp'
import odsIcon5 from '../../assets/odsIcons/5.png'
import odsIcon6 from '../../assets/odsIcons/6.png'
import odsIcon7 from '../../assets/odsIcons/7.png'
import odsIcon8 from '../../assets/odsIcons/8.png'
import odsIcon9 from '../../assets/odsIcons/9.png'
import odsIcon10 from '../../assets/odsIcons/10.webp'
import odsIcon11 from '../../assets/odsIcons/11.png'
import odsIcon12 from '../../assets/odsIcons/12.png'
import odsIcon13 from '../../assets/odsIcons/13.png'
import odsIcon14 from '../../assets/odsIcons/14.png'
import odsIcon15 from '../../assets/odsIcons/15.webp'
import odsIcon16 from '../../assets/odsIcons/16.webp'
import odsIcon17 from '../../assets/odsIcons/17.png'
import { AuthContext } from "../../contexts/auth";
import { updateUserPoints } from "../../services/api";




const Quiz = () => {

    const [answers, setAnswers] = useState(new Array(22).fill(0))
    const { user } = useContext(AuthContext)
    const { storeResult } = useContext(ResultContext)
    const navigate = useNavigate()

    const getAnswers = (value, index) => {
        var auxArray = [...answers]
        console.log(auxArray)
        auxArray.splice(index, 1, value)
        setAnswers(auxArray)
    }

    const sendDataHandler = async () => {
        let auxResults = new Array(22).fill(0)
        var pointsCounter = 0
        const odsIndividual = [1, 3, 4, 12, 7, 12, 8, 5, 6, 6, 2, 14, 14, 13, 15, 13, 13, 11, 11, 10, 10, 16]

        for (let i = 0; i < auxResults.length; i++){
            if(answers[i] == '1'){
                auxResults[odsIndividual[i]-1] += 100
            }
            else if(answers[i] == '2'){
                auxResults[odsIndividual[i]-1] += 200
            }
            else if(answers[i] == '3'){
                auxResults[odsIndividual[i]-1] += 300
            }
            else if(answers[i] == '4'){
                auxResults[odsIndividual[i]-1] += 400
            }
            else{
                auxResults[odsIndividual[i]-1] += 0
            }
        }

        storeResult(auxResults)

        auxResults.map((eachResult) =>{
            pointsCounter += eachResult
        })

        const request = await updateUserPoints(user.id, pointsCounter)

        navigate('/resultado')

        console.log(auxResults)
    }

    return(
        <div className="Quiz">
            <div className="QuizContainer">
                <div className="QuizArea ods1">
                    <p>1) Quantos sal??rios m??nimos comp??em sua renda familiar bruta, contando com seus benef??cios(Exemplo: Aux??lios recebidos do governo)?</p>
                    <div className="tags">
                        <img src={odsIcon1} alt="" />
                    </div>
                    <SelectAnswer 
                                opA='a) At?? 1 sal??rio m??nimos.' 
                                opB='b) Entre 1 e 2 sal??rios m??nimos.'
                                opC='c) Entre 3 e 5 sal??rios m??nimos.'
                                opD='d) Superior a 5 sal??rios m??nimos.'
                                opE='e) N??o gostaria de responder.'
                                getAnswers={getAnswers} 
                                index={0}/>
                </div>

                <div className="QuizArea ods3">
                    <p>2) Atualmente, voc?? considera ter acesso ?? servi??os p??blicos de sa??de de qualidade?
                        </p>
                        <div className="tags">
                            <img src={odsIcon3} alt="" />
                        </div>
                    <SelectAnswer 
                                opA='a) N??o h?? servi??o p??blico de sa??de perto de minha resid??ncia.' 
                                opB='b) H?? servi??os p??blicos de sa??de b??sicos, mas em condi????es extremamente prec??rias de preserva????o e atendimento.'
                                opC='c) H?? servi??os p??blicos de sa??de b??sicos, mas ainda h?? a necessidade de me deslocar para outra regi??o para melhores condi????es deste servi??o.'
                                opD='d) Conto com todos os tipos de servi??o p??blico de sa??de, de Postos de Sa??de a Hospitais, em condi????es adequadas de funcionamento e preserva????o.'
                                opE='e) N??o sei responder.'
                                getAnswers={getAnswers} 
                                index={1}/>
                </div>

                <div className="QuizArea ods4">
                    <p>3) Defina a qualidade das institui????es educacionais na comunidade na qual voc?? mora:
                    </p>
                    <div className="tags">
                            <img src={odsIcon4} alt="" />
                        </div>
                    <SelectAnswer 
                                opA='a) P??ssimo' 
                                opB='b) Regular'
                                opC='c) Bom'
                                opD='d) Muito bom'
                                opE='e) N??o sei responder.'
                                getAnswers={getAnswers} 
                                index={2}/>
                </div>

                <div className="QuizArea ods12">
                    <p>4) Voc?? pratica a coleta seletiva dos res??duos gerados no seu domic??lio. Qual o grau de reciclagem que voc?? realiza?
                    </p>
                    <div className="tags">
                            <img src={odsIcon12} alt="" />
                        </div>
                    <SelectAnswer 
                                opA='a) N??o fa??o coleta seletiva, tenho lixo comum em casa.' 
                                opB='b) Separo apenas alguns itens de reciclagem, quando d?? tempo.'
                                opC='c) Separo e encaminho para a reciclagem e log??stica reversa, de forma rotineira os res??duos de casa.'
                                opD='d) Pratico diariamente a separa????o dos res??duos (recicl??veis, org??nicos, itens de log??stica reversa e rejeito) e encaminho adequadamente cada um deles.'
                                opE='e) N??o sei responder.'
                                getAnswers={getAnswers} 
                                index={3}/>
                </div>

                <div className="QuizArea ods7">
                    <p>5) Com que frequ??ncia voc?? v?? pain??is solares ou carros el??tricos na comunidade em que vive? 
                    </p>
                    <div className="tags">
                        <img src={odsIcon7} alt="" />
                    </div>
                    <SelectAnswer 
                                opA='a) Nunca os vejo.' 
                                opB='b) Pouqu??ssimos.'
                                opC='c) Frequentemente os vejo.'
                                opD='d) Toda a comunidade em que vivo ?? energizada por energia solar, e movida a carros el??tricos.'
                                opE='e) N??o sei responder.'
                                getAnswers={getAnswers} 
                                index={4}/>
                </div>

                <div className="QuizArea ods12">
                    <p>6) Voc?? se considera uma pessoa mais consumista ou consciente?
                    </p>
                    <div className="tags">
                            <img src={odsIcon12} alt="" />
                        </div>
                    <SelectAnswer 
                                opA='a) Totalmente consumista, costumo fazer compras todo m??s com frequ??ncia sem pensar no impacto desta a????o.' 
                                opB='b) Parcialmente consumista, fa??o compras quase sempre que almejo algo.'
                                opC='c) Parcialmente consciente, n??o deixando totalmente de comprar algo quando tenho vontade.'
                                opD='d) Totalmente consciente, compro somente quando h?? a necessidade e avalio o impacto ambiental da minha compra.'
                                opE='e) N??o sei responder.'
                                getAnswers={getAnswers} 
                                index={5}/>
                </div>

                <div className="QuizArea ods8">
                    <p>7) Na regi??o onde voc?? mora, como ?? caracterizado o com??rcio local?
                    </p>
                    <div className="tags">
                            <img src={odsIcon8} alt="" />
                        </div>
                    <SelectAnswer 
                                opA='a) Comumente devemos nos deslocar para outros locais/bairros para encontrar oportunidades.' 
                                opB='b) H?? um determinado com??rcio local, composto por trabalho informal e com??rcios de pequeno porte(exemplo: padarias, lojas, etc).'
                                opC='c) H?? a presen??a de startups, micro empresas, transnacionais e franquias famosas(Ex.: McDonald s, Burguer King, etc)'
                                opD='d) Com??rcio forte, marcado por empresas de relev??ncia nacional, internacional, e iniciativas empreendedoras. Presen??a marcante de empregos formais.'
                                getAnswers={getAnswers} 
                                index={6}/>
                </div>

                <div className="QuizArea ods5">
                    <p>8) Quantas iniciativas de incentivo ?? igualdade de g??nero e inser????o da mulher no mercado de trabalho voc?? conhece?
                    </p>
                    <div className="tags">
                            <img src={odsIcon5} alt="" />
                        </div>
                    <SelectAnswer 
                                opA='a) Conhe??o nenhuma iniciativa deste g??nero.' 
                                opB='b) Entre uma e tr??s.'
                                opC='c) Entre tr??s e dez.'
                                opD='d) De dez para mais.'
                                opE='e) N??o sei responder.'
                                getAnswers={getAnswers} 
                                index={7}/>
                </div>

                <div className="QuizArea ods6">
                    <p>9) A comunidade em que vive possui acesso ?? ??gua pot??vel?
                    </p>
                    <div className="tags">
                            <img src={odsIcon6} alt="" />
                        </div>
                    <SelectAnswer 
                                opA='a) N??o h?? acesso ?? ??gua pot??vel, seja por abastecimento municipal ou po??o.' 
                                opB='b) Poucos t??m este acesso.'
                                opC='c) Uma parte significativa os tem'
                                opD='d) Toda a minha comunidade tem acesso ?? ??gua pot??vel.'
                                opE='e) N??o sei responder.'
                                getAnswers={getAnswers} 
                                index={8}/>
                </div>

                <div className="QuizArea ods6">
                    <p>10)A comunidade em que vive possui acesso a saneamento b??sico?
                    </p>
                    <div className="tags">
                            <img src={odsIcon6} alt="" />
                        </div>
                    <SelectAnswer 
                                opA='a) N??o h?? rede de esgoto ou solu????es individuais adequadas (fossa e sumidouro).' 
                                opB='b) Poucos t??m este acesso ?? saneamento b??sico.'
                                opC='c) Uma parte significativa os tem acesso ao saneamento b??sico.'
                                opD='d) Toda a minha comunidade tem acesso ?? saneamento b??sico de qualidade.'
                                opE='e) N??o sei responder.'
                                getAnswers={getAnswers} 
                                index={9}/>
                </div>


                <div className="QuizArea ods2">
                    <p>11) Na comunidade em que voc?? vive, voc?? conhece pessoas que passam fome? ?? do seu conhecimento projetos locais voltados a ajud??-las?
                    </p>
                    <div className="tags">
                            <img src={odsIcon2} alt="" />
                        </div>
                    <SelectAnswer 
                                opA='a) Conhe??o pessoas em situa????o de fome, e n??o h?? projetos voltados a ajud??-las.' 
                                opB='b) Conhe??o pessoas em situa????o de fome, entretanto h?? um ou mais projetos voltados para a sua ajuda.'
                                opC='c) N??o conhe??o pessoas em situa????o de fome, e n??o h?? projetos voltados para elas no local onde moro.'
                                opD='d) N??o conhe??o pessoas em situa????o de fome, e conhe??o um ou mais projetos voltados para a ajuda destas pessoas, possivelmente em outras comunidades.'
                                opE='e) N??o sei responder.'
                                getAnswers={getAnswers} 
                                index={10}/>
                </div>

                <div className="QuizArea ods14">
                    <p>12) Como voc?? considera o n??vel de qualidade dos ambientes aqu??ticos (mares e lagoas) pr??ximos ?? sua comunidade? 
                    </p>
                    <div className="tags">
                            <img src={odsIcon14} alt="" />
                        </div>
                    <SelectAnswer 
                                opA='a) Est??o sempre sujos e polu??dos.' 
                                opB='b) Constantemente est??o sujos e com lixo.'
                                opC='c) ??s vezes est??o limpos.'
                                opD='d) Est??o sempre limpos e despolu??dos.'
                                opE='e) N??o tenho ambientes aqu??ticos pr??ximos.'
                                getAnswers={getAnswers} 
                                index={11}/>
                </div>

                <div className="QuizArea ods14">
                    <p>13) Voc?? conhece ??reas de preserva????o marinha na sua regi??o?
                    </p>
                    <div className="tags">
                            <img src={odsIcon14} alt="" />
                        </div>
                    <SelectAnswer 
                                opA='a) N??o conhe??o.' 
                                opB='b) Conhe??o ao menos 1.'
                                opC='c) Conhe??o ao menos 3.'
                                opD='d) Conhe??o mais de 5.'
                                opE='e) N??o sei responder.'
                                getAnswers={getAnswers} 
                                index={12}/>
                </div>

                <div className="QuizArea ods13">
                    <p>14) Voc?? conhece ??reas de preserva????o terrestre (parques florestais, reservas ambientais, RPPN???s, unidades de conserva????o) na sua regi??o?
                    </p>
                    <div className="tags">
                            <img src={odsIcon13} alt="" />
                        </div>
                    <SelectAnswer 
                                opA='a) N??o conhe??o.' 
                                opB='b) Conhe??o ao menos 1.'
                                opC='c) Conhe??o ao menos 3.'
                                opD='d) Conhe??o mais de 5.'
                                opE='e) N??o sei responder.'
                                getAnswers={getAnswers} 
                                index={13}/>
                </div>

                <div className="QuizArea ods15">
                    <p>15) As ??reas de reflorestamento s??o essenciais para a preserva????o da fauna e flora e recuperar ??reas degradadas. Voc?? conhece projetos de reflorestamento na sua comunidade?
                    </p>
                    <div className="tags">
                            <img src={odsIcon15} alt="" />
                        </div>
                    <SelectAnswer 
                                opA='a) Conhe??o nenhuma iniciativa deste g??nero.' 
                                opB='b) Entre uma e tr??s.'
                                opC='c) Entre tr??s e cinco.'
                                opD='d) De cinco para mais.'
                                opE='e) N??o sei responder.'
                                getAnswers={getAnswers} 
                                index={14}/>
                </div>

                <div className="QuizArea ods13">
                    <p>16) A mudan??a de clima no mundo j?? est?? sendo sentida por cada um de n??s. em rela????o ??s ???cat??strofes naturais??? (chuvas intensas, deslizamentos, alagamentos, etc) a sua comunidade j?? passou por algum desses problemas nos ??ltimos meses?
                    </p>
                    <div className="tags">
                            <img src={odsIcon13} alt="" />
                        </div>
                    <SelectAnswer 
                                opA='a) N??o temos nenhuma cat??strofe natural nos ??ltimos 3 anos.' 
                                opB='b) Tivemos alguns momentos de cat??strofe nos ??ltimos 2 anos.'
                                opC='c) Temos frequentemente sofrido com cat??strofes anualmente.'
                                opD='d) Temos sofrido com algum tipo de cat??strofe natural, mais de uma vez no ano.'
                                opE='e) N??o sei responder.'
                                getAnswers={getAnswers} 
                                index={15}/>
                </div>

                <div className="QuizArea ods13">
                    <p>17) Os dois principais causadores das mudan??as de clima s??o os gases de efeito estufa (GEE), por exemplo  o  CO2 (g??s carb??nico) e CH4 (g??s metano). Algumas atividades humanas contribuem para a emiss??o destes gases, como a queima de combust??veis f??sseis (energia), agropecu??ria, ind??strias, uso da terra e lixo urbano. O ESTADO DO RIO DE JANEIRO apresentou, em 2016, emiss??o de 92.318 Gg CO2 e, com destaque para os setores Energia (70%), ind??strias (17%) e Lixo (8%). As emiss??es do Rio de Janeiro representaram 6% das emiss??es nacionais e 24% da regi??o Sudeste, em 2016. assinale qual a op????o que voc?? melhor se identifica:
                    </p>
                    <div className="tags">
                            <img src={odsIcon13} alt="" />
                        </div>
                    <SelectAnswer 
                                opA='a) N??o mudo minhas atividades em fun????o da emiss??o de gases de efeito estufa.' 
                                opB='b) Raramente fa??o alguma mudan??a de h??bito em fun????o de GEE (exemplo: reciclagem de lixo, consumo consciente, transporte coletivo ou alternativo).'
                                opC='c) ??s vezes fa??o algumas altera????es de h??bito para reduzir as emiss??es de GEE.'
                                opD='d) Sempre busco op????es na minha rotina para reduzir as emiss??es de GEE.'
                                opE='e) N??o sei responder.'
                                getAnswers={getAnswers} 
                                index={16}/>
                </div>

                <div className="QuizArea ods11">
                    <p>18) Na sua comunidade existem pessoas vivendo em assentamentos ou habita????es prec??rios, inadequados ou informais? Considere habita????es inadequadas aqueles que possuem ao menos uma das condi????es: mais de 3 pessoas por quarto; sem abastecimento de ??gua; sem rede de esgoto ou fossa s??ptica; sem coleta de lixo. 
                    </p>
                    <div className="tags">
                            <img src={odsIcon11} alt="" />
                        </div>
                    <SelectAnswer 
                                opA='a) N??o conhe??o pessoas em situa????o de habita????o prec??ria.' 
                                opB='b) Conhe??o algumas pessoas em situa????o de habita????o prec??ria.'
                                opC='c) Conhe??o muitas pessoas em situa????o de habita????o prec??ria.'
                                opD='d) Todas as pessoas na minha comunidade vivem em situa????o de habita????o prec??ria.'
                                opE='e) N??o sei responder.'
                                getAnswers={getAnswers} 
                                index={17}/>
                </div>

                <div className="QuizArea ods11">
                    <p>19) Cidades sustent??veis possuem sistema de gest??o de res??duos s??lidos eficiente, recuperando a maior fra????o poss??vel de recicl??veis e compost??veis. Existem na sua comunidade iniciativas de reciclagem e/ou compostagem? (ODS 11- cidades e comunidades sustent??veis)
                    </p>
                    <div className="tags">
                            <img src={odsIcon11} alt="" />
                        </div>
                    <SelectAnswer 
                                opA='a) N??o existem iniciativas ou n??o conhe??o.' 
                                opB='b) Existem algumas poucas iniciativas, mas n??o participo.'
                                opC='c) Existem algumas iniciativas, e as vezes participo.'
                                opD='d) Existem v??rias iniciativas e participo com frequ??ncia.'
                                opE='e) N??o sei responder.'
                                getAnswers={getAnswers} 
                                index={18}/>
                </div>

                <div className="QuizArea ods10">
                    <p>20) Iniciativas que promovam aumento de renda para as pessoas vivendo abaixo de 50% da mediana da renda (menos de R$ 700) independente do g??nero, idade ou condi????o f??sica s??o fundamentais para o desenvolvimento econ??mico e social do pa??s. Voc?? conhece iniciativas com este objetivo na sua comunidade? 
                    </p>
                    <div className="tags">
                            <img src={odsIcon10} alt="" />
                        </div>
                    <SelectAnswer 
                                opA='a) N??o conhe??o.' 
                                opB='b) Conhe??o apenas uma.'
                                opC='c) Conhe??o entre uma e tr??s.'
                                opD='d) Conhe??o mais de tr??s.'
                                opE='e) N??o sei responder.'
                                getAnswers={getAnswers} 
                                index={19}/>
                </div>

                <div className="QuizArea ods10">
                    <p>21) Voc?? ou algu??m que voc?? conhece j?? foi discriminado em fun????o do seu g??nero, idade, condi????o f??sica, etnia ou cidade/pa??s de origem? 
                    </p>
                    <div className="tags">
                            <img src={odsIcon10} alt="" />
                        </div>
                    <SelectAnswer 
                                opA='a) Nunca sofri discrimina????o de qualquer tipo.' 
                                opB='b) Raramente sofro algum tipo de discrimina????o.'
                                opC='c) ??s vezes sofro algum tipo de discrimina????o.'
                                opD='d) Todos os dias sofro algum tipo de discrimina????o.'
                                opE='e) N??o sei responder.'
                                getAnswers={getAnswers} 
                                index={20}/>
                </div>

                <div className="QuizArea ods16">
                    <p>22) Voc?? ou algu??m que voc?? conhece j?? foi v??tima de viol??ncia f??sica, psicol??gica ou sexual?
                    </p>
                    <div className="tags">
                            <img src={odsIcon16} alt="" />
                        </div>
                    <SelectAnswer 
                                opA='a) Nunca.' 
                                opB='b) Raramente.'
                                opC='c) ??s vezes.'
                                opD='d) Todos os dias.'
                                opE='e) N??o sei responder.'
                                getAnswers={getAnswers} 
                                index={21}/>
                </div>

                <button onClick={() => sendDataHandler()}>Enviar</button>

            </div>
            
        </div>
    )
}

export default Quiz
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../../pages/Home";
import SignIn from "../../pages/SignIn";
import Ranking from "../../pages/Ranking";
import Result from "../../pages/Result";
import Quiz from "../../pages/Quiz";
import Initiative from "../../pages/Initiative";
import Login from "../../pages/Login";
import MainPanel from "../../pages/MainPanel";
import DataShow from "../../pages/DataShow";
import { AuthContext } from "../../contexts/auth";
import { ResultProvider } from "../../contexts/results";

const ContentRoutes = () => {
    const LoggedRedirection = ({children}) =>{
        const { authenticated } = useContext(AuthContext)
        
        if(authenticated){
            return <Navigate to='/painel' />
        }
        else{
            return(
                <>
                  {children}  
                </>
            )
        }
    }

    const NotLoggedRedirection = ({children}) =>{
        const { authenticated } = useContext(AuthContext)
        
        if(!authenticated){
            return <Navigate to='/participar/login' />
        }
        else{
            return(
                <>
                  {children}  
                </>
            )
        }
    }

    return(
        <div className="Routes">
            <ResultProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/participar/login" element={<LoggedRedirection><Login /></LoggedRedirection>} />
                    <Route path="/participar/cadastro" element={<LoggedRedirection><SignIn /></LoggedRedirection>} />
                    <Route path="/ranking" element={<Ranking />} />
                    <Route path="/resultado" element={<Result />} />
                    <Route path="/painel" element={<NotLoggedRedirection><MainPanel /></NotLoggedRedirection>} />
                    <Route path="/quiz/individual" element={<Quiz />} />
                    <Route path="/quiz/iniciativa" element={<Initiative />} /> 
                    <Route path="/dados" element={<DataShow />} /> 
                </Routes>
            </ResultProvider>
        </div>
    )
}

export default ContentRoutes
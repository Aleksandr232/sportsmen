import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';

import {sportsmenFetching, sportsmenFetched,sportsmenFetchingError, sportsmenDeleted} from '../../actions';
import HeroesListItem from "../ListItem/ListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';



const HeroesList = () => {
    const {filteredHeroes, heroesLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(sportsmenFetching());
        request("http://localhost:3001/sportsmen")
            .then(data => dispatch(sportsmenFetched(data)))
            .catch(() => dispatch(sportsmenFetchingError()))

        
    }, []);

    
    const onDelete = useCallback((id) => {
        
        request(`http://localhost:3001/sportsmen/${id}`, "DELETE")
            .then(data => console.log(data, 'Deleted'))
            .then(dispatch(sportsmenDeleted(id)))
            .catch(err => console.log(err));
         
    }, [request]);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames="hero">
                    <h5 className="text-center mt-5">Список пуст</h5>
                </CSSTransition>
            )
        }

        return arr.map(({id, ...props}) => {
            return (
                <CSSTransition 
                    key={id}
                    timeout={500}
                    classNames="hero">
                    <HeroesListItem  {...props} onDelete={() => onDelete(id)}/>
                </CSSTransition>
            )
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;